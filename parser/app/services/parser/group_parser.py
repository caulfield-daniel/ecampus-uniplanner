"""
Парсер для получения учебных групп через API.
"""

import logging
from typing import List, Dict, Any
from .base_parser import BaseParser
from app.schemas.academic_group import AcademicGroupCreate
from app.schemas.specialty import SpecialtyInfo

logger = logging.getLogger(__name__)


class AcademicGroupParser(BaseParser):
    """
    Парсер групп, обращается к эндпоинту /schedule/GetAcademicGroups.
    """

    async def fetch_groups(self, specialty: SpecialtyInfo) -> List[AcademicGroupCreate]:
        """
        Получает список групп для указанной специальности.

        Args:
            specialty: Объект SpecialtyCreate

        Returns:
            Список групп, сгруппированных по уровням образования.
            Каждый элемент — словарь с ключами "Key" (уровень) и "Value" (список групп).

        Raises:
            httpx.HTTPStatusError: При ошибках HTTP.
        """
        payload = {
            "instituteId": (
                None if len(str(specialty.instituteId)) == 10 else specialty.instituteId
            ),
            "branchId": specialty.branchId,
            "specialty": specialty.name,
        }
        logger.debug("Запрос групп для speciality='%s'", specialty.name)
        response = await self.http.post("/schedule/GetAcademicGroups", data=payload)
        data = response.json()
        # Подсчёт общего количества групп
        total = sum(len(block.get("Value", [])) for block in data)

        groups = []
        for edu_block in data:
            edu_level = edu_block.get("Key")
            for group_item in edu_block.get("Value", []):
                groups.append(
                    AcademicGroupCreate(
                        id=group_item.get("Id"),
                        name=group_item.get("Name") or "Неизвестно",
                        eduLevel=group_item.get("EduLevel", edu_level),
                    )
                )
        logger.info("Получено %d групп для специальности '%s'", total, specialty.name)
        return groups
