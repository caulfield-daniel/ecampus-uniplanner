# run_parser.py

import asyncio
import logging
from app.services.institute_parser import InstituteParserService

# Настройка логирования — чтобы видеть сообщения
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler()  # Вывод в консоль
    ]
)

async def main():
    # Создаём экземпляр парсера
    parser = InstituteParserService()

    try:
        print("🔄 Запуск парсинга институтов...\n")
        institutes = await parser.fetch_institutes()

        print(f"\n✅ Успешно загружено {len(institutes)} институтов:\n")
        for inst in institutes:
            print(f"🔹 ID: {inst.id}")
            print(f"   Название: {inst.name}")
            print(f"   Короткое: {inst.shortName}")
            print("-" * 40)

    except Exception as e:
        print(f"\n❌ Ошибка при выполнении парсера: {e}")

# Запуск асинхронной функции
if __name__ == "__main__":
    asyncio.run(main())