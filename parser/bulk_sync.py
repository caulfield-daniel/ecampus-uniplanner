"""
Утилита для ручной массовой синхронизации backend-кэша расписания со всеми
группами, известными парсеру — до появления админ-панели (см.
docs/08-deployment/admin-guide.md).

Использование:
    BACKEND_JWT=<токен> python bulk_sync.py [--from 2026-03-02] [--to 2026-04-27]

Токен — JWT обычного пользователя приложения (получить через POST /auth/login).
Список групп берётся из parser/all_groups.json (см. GET /parser/groups);
если файла нет, скрипт сам его скачает с локально запущенного парсера.
"""

import argparse
import json
import os
from pathlib import Path

import httpx

PARSER = "http://localhost:8000/api/v1"
BACKEND = "http://localhost:8080/api/v1"
GROUPS_FILE = Path(__file__).parent / "all_groups.json"


def load_groups() -> list[str]:
    if not GROUPS_FILE.exists():
        resp = httpx.get(f"{PARSER}/parser/groups", timeout=15.0)
        resp.raise_for_status()
        GROUPS_FILE.write_text(resp.text, encoding="utf-8")
    return json.loads(GROUPS_FILE.read_text(encoding="utf-8"))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--from", dest="date_from", required=True)
    parser.add_argument("--to", dest="date_to", required=True)
    args = parser.parse_args()

    token = os.environ.get("BACKEND_JWT")
    if not token:
        raise SystemExit("Задайте переменную окружения BACKEND_JWT (JWT из POST /auth/login)")

    groups = load_groups()
    print(f"всего групп: {len(groups)}")

    ok = 0
    failed: list[tuple[str, object, str]] = []
    total_synced = 0

    with httpx.Client(timeout=15.0) as client:
        for i, group in enumerate(groups, 1):
            try:
                resp = client.post(
                    f"{BACKEND}/parser/sync",
                    params={"group": group, "from": args.date_from, "to": args.date_to},
                    headers={"Authorization": f"Bearer {token}"},
                )
                if resp.status_code == 200:
                    synced = resp.json().get("syncedLessons", 0)
                    total_synced += synced
                    ok += 1
                    if synced > 0:
                        print(f"[{i}/{len(groups)}] {group}: {synced} занятий")
                else:
                    failed.append((group, resp.status_code, resp.text[:200]))
            except Exception as e:  # noqa: BLE001 — нужно собрать все ошибки и продолжить цикл
                failed.append((group, "EXC", str(e)))

    print(f"\nготово: {ok} ok, {len(failed)} failed, всего синхронизировано занятий: {total_synced}")
    if failed:
        print("\nпервые ошибки:")
        for g, code, msg in failed[:10]:
            print(f"  {g}: {code} {msg}")


if __name__ == "__main__":
    main()
