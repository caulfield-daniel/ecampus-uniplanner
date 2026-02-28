"""
Парсер для получения специальностей через API.
"""

import logging
from typing import List, Dict, Any
from .base_parser import BaseParser
from app.schemas import SpecialtyCreate

logger = logging.getLogger(__name__)


class SpecialtyParser(BaseParser):
    """
    Парсер специальностей, обращается к эндпоинту /schedule/GetSpecialities.
    """

    async def fetch_specialties(
        self, institute_id: int, branch_id: int
    ) -> List[SpecialtyCreate]:
        """
        Получает список специальностей для указанного института.

        Args:
            institute_id: ID института.

        Returns:
            Список объектов SpecialtyCreate.

        Raises:
            httpx.HTTPStatusError: При ошибках HTTP.
        """
        # Эвристика: если ID института длиной 10 цифр (рандомный), то передаём None
        payload = {
            "instituteId": None if len(str(institute_id)) == 10 else institute_id,
            "branchId": branch_id,
        }
        logger.debug(
            "Запрос специальностей для institute_id=%s, branchId=%s",
            institute_id,
        )
        response = await self.http.post("/schedule/GetSpecialities", data=payload)

        data = response.json()
        specialties: List[SpecialtyCreate] = []
        for item in data:
            specialties.append(
                SpecialtyCreate(
                    name=item.get("Name"),
                    instituteId=institute_id,
                )
            )
        logger.info("Получено %d специальностей", len(data))

        return specialties
