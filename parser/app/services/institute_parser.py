import httpx
import logging
import re
import json
from bs4 import BeautifulSoup
from typing import List
from ..schemas.institute import Institute
from .parser_service import ParserService


class InstituteParserService(ParserService):
    BASE_URL = "https://ecampus.ncfu.ru/schedule"

    async def fetch_institutes(self) -> List[Institute]:
        """Получение списка институтов с сайта ecampus.ncfu.ru из viewModel"""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(self.BASE_URL)
                response.raise_for_status()
                soup = BeautifulSoup(response.text, "html.parser")

                # Ищем скрипт, содержащий "viewModel" (передаём функцию, не строку!)
                script = soup.find(
                    "script",
                    type="text/javascript",
                    string=lambda text: text and "viewModel" in text,  # type: ignore
                )
                if not script:
                    raise ValueError("Скрипт с viewModel не найден")

                script_text = script.string  # type: ignore
                if not script_text:
                    raise ValueError("Скрипт пуст")

                match = re.search(
                    r"var\s+viewModel\s*=\s*(\{.*\});", script_text, re.DOTALL
                )
                if not match:
                    raise ValueError(
                        "Не удалось найти присваивание viewModel в скрипте"
                    )

                json_text = match.group(1).strip()

                # Заменяем все вызовы JSON.parse("...") на распаршенное содержимое
                def replace_json_parse(m):
                    # m.group(1) — это строка в кавычках, например: "\"{\\\"key\\\":...}\""
                    escaped_json_str = json.loads(
                        m.group(1)
                    )  # превращаем в обычную строку JSON
                    return escaped_json_str

                json_text = re.sub(
                    r'JSON\.parse\((\"[^"]*\")\)', replace_json_parse, json_text
                )

                data = json.loads(json_text)
                institutes_data = data.get("Institutes", [])

                institutes = []
                for item in institutes_data:
                    inst_id = item.get("Id")
                    name = item.get("Name", "").strip()
                    short_name = item.get("ShortName", name)

                    if not inst_id or not name:
                        logging.warning(
                            f"Пропущен институт с неполными данными: {item}"
                        )
                        continue

                    institutes.append(
                        Institute(id=inst_id, name=name, shortName=short_name)
                    )

                logging.info(f"Успешно загружено {len(institutes)} институтов")
                return institutes

            except httpx.HTTPStatusError as e:
                logging.error(f"HTTP ошибка при запросе: {e}")
                raise
            except json.JSONDecodeError as e:
                logging.error(f"Ошибка парсинга JSON: {e}\nФрагмент: {json_text[:500]}")
                raise
            except Exception as e:
                logging.error(f"Неожиданная ошибка при парсинге институтов: {e}")
                raise
