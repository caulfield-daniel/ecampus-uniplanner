import asyncio
import logging


import sys
from pathlib import Path

# Добавляем корень проекта в sys.path, чтобы можно было импортировать модули
project_root = Path(__file__).parent.parent.parent # app/
sys.path.insert(0, str(project_root))

from app.core import HttpClient, settings
from app.services import auth as auth_service, parser as parser_service


logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

# async def test_group_parser():
#     client = HttpClient(base_url=)


async def test_institute_parser():

    # 1. Создаём клиент без кук (параметр cookies не передаём)
    client = HttpClient(base_url=settings.university_base_url)

    # 2. Создаём аутентификатор, который будет загружать куки из файла
    auth = auth_service.CookieFileAuthenticator(
        cookies_file="../cookies.json"
    )

    # 3. Пытаемся восстановить сессию
    if not await auth.ensure_session(client):
        print("❌ Не удалось восстановить сессию из cookies.json. Проверьте файл.")
        await client.close()
        return

    print("✅ Сессия активна")

    # 4. Пробуем получить институты
    parser = parser_service.InstituteParser(client)
    try:
        institutes = await parser.fetch_institutes()
        print(f"✅ Получено институтов: {len(institutes)}")
        for inst in institutes:
            print(f"   - {inst.id}: {inst.name} ({inst.shortName})")
    except Exception as e:
        print(f"❌ Ошибка при парсинге институтов: {e}")
    finally:
        await client.close()


if __name__ == "__main__":
    asyncio.run(test_institute_parser())
