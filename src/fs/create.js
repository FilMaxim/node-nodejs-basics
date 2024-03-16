import { fileURLToPath } from 'url';
import { access, mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';

const create = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const folderPath = join(__dirname, 'files');
    const filePath = join(folderPath, 'fresh.txt');
    const fileContent = 'I am fresh and young';

    // Проверяем существование папки
    try {
        await access(folderPath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await mkdir(folderPath, { recursive: true });
        } else {
            throw error;
        }
    }

    try {
        await access(filePath); // Проверяем существование файла
        throw new Error('FS operation failed: File already exists');
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Файл не существует, создаем его
            await writeFile(filePath, fileContent);
            console.log('Файл fresh.txt успешно создан с содержимым: "I am fresh and young"');
        } else {
            throw error;
        }
    }
};

await create();
