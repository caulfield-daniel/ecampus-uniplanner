"""
Парсер для получения списка институтов (факультетов) с главной страницы расписания.
"""

import re
import json
import logging
from typing import List
from bs4 import BeautifulSoup
from app.schemas.institute import InstituteCreate
from .base_parser import BaseParser

logger = logging.getLogger(__name__)


class InstituteParser(BaseParser):
    """
    Парсер институтов, извлекает данные из встроенной JavaScript-переменной viewModel.
    """

    async def fetch_institutes(self) -> List[InstituteCreate]:
        """
        Загружает главную страницу расписания и парсит список институтов.

        Returns:
            Список объектов InstituteCreate.

        Raises:
            ValueError: Если не удаётся найти или распарсить viewModel.
            httpx.HTTPStatusError: При ошибках HTTP.
        """
        # Загружаем главную страницу
        response = await self.http.get("/schedule")
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        # Ищем тег <script> с JavaScript, содержащим "viewModel"
        script = soup.find(
            "script", type="text/javascript", string=lambda t: t and "viewModel" in t  # type: ignore
        )
        if not script:
            raise ValueError("Скрипт с viewModel не найден на странице")

        script_text = script.string  # type: ignore
        if not script_text:
            raise ValueError("Скрипт с viewModel пуст")

        # Извлекаем присваивание переменной viewModel
        match = re.search(r"var\s+viewModel\s*=\s*(\{.*\});", script_text, re.DOTALL)
        if not match:
            raise ValueError("Не удалось найти присваивание viewModel в скрипте")

        json_text = match.group(1).strip()

        # Функция для замены JSON.parse("...") на содержимое кавычек
        def replace_json_parse(m: re.Match) -> str:
            # m.group(1) содержит строку в кавычках, например "\"{\\\"key\\\":...}\""
            # Превращаем её в обычную строку JSON
            return json.loads(m.group(1))

        json_text = re.sub(r'JSON\.parse\((\"[^"]*\")\)', replace_json_parse, json_text)

        # Парсим итоговый JSON
        data = json.loads(json_text)
        institutes_data = data.get("Institutes", [])

        institutes: List[InstituteCreate] = []
        for item in institutes_data:
            inst_id = item.get("Id")
            name = item.get("Name", "").strip()
            short_name = item.get("ShortName", name)

            if not inst_id or not name:
                logger.warning("Пропущен институт с неполными данными: %s", item)
                continue

            institutes.append(
                InstituteCreate(
                    id=inst_id,
                    name=name,
                    shortName=short_name,
                    branchId=item.get("BranchId"),
                )
            )

        logger.info("Успешно загружено %d институтов", len(institutes))
        return institutes
