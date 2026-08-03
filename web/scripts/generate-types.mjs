// Генерирует TS-типы для web из JSON Schema (api/schemas/*.json) — единого
// источника истины моделей (shared/ApiModels.kt → JsonSchemaGenerator).
// Запуск: npm run generate:types (из каталога web/).
// Результат: web/src/shared/types/generated/<Model>.d.ts + index.d.ts (коммитятся).
import { compile } from 'json-schema-to-typescript';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const webDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const schemasDir = path.resolve(webDir, '..', 'api', 'schemas');
const outDir = path.join(webDir, 'src', 'shared', 'types', 'generated');

await mkdir(outDir, { recursive: true });

const files = (await readdir(schemasDir)).filter((f) => f.endsWith('.json')).sort();
if (files.length === 0) {
  console.error('Нет JSON Schema в ' + schemasDir + ' — сначала выполни ./gradlew :shared:generateJsonSchemas');
  process.exit(1);
}

for (const file of files) {
  const name = file.replace(/\.json$/, '');
  const schema = JSON.parse(await readFile(path.join(schemasDir, file), 'utf8'));
  const ts = await compile(schema, name, {
    additionalProperties: false,
    cwd: schemasDir,
  });
  await writeFile(path.join(outDir, name + '.d.ts'), ts);
}

const indexContent =
  files
    .map((file) => 'export type { ' + file.replace(/\.json$/, '') + " } from './" + file.replace(/\.json$/, '') + "';")
    .join('\n') + '\n';
await writeFile(path.join(outDir, 'index.d.ts'), indexContent);

console.log('Сгенерировано ' + files.length + ' файлов типов в src/shared/types/generated/');
