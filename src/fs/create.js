import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

const create = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const folderPath = join(__dirname, 'files');
    const filePath = join(folderPath, 'fresh.txt');
    const fileContent = 'I am fresh and young';

    // Проверяем существование папки
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
    }

    // Проверяем существование файла
    if (existsSync(filePath)) {
        throw new Error('FS operation failed: File already exists');
    }

    // Создаем новый файл и записываем в него содержимое
    writeFileSync(filePath, fileContent);

    console.log('fresh.txt успешно создан с содержимым "I am fresh and young"');
};

await create();
