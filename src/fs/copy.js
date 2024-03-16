import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { dirname, join } from 'path';

const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const sourceDir = join(__dirname, 'files');
    const destinationDir = join(__dirname, 'files_copy');

    // Проверяем существование папки files и files_copy
    if (!existsSync(sourceDir) || existsSync(destinationDir)) {
        throw new Error('FS operation failed');
    }

    // Создаем папку files_copy
    mkdirSync(destinationDir);

    // Читаем содержимое папки files
    const files = readdirSync(sourceDir);

    // Копируем файлы из папки files в папку files_copy
    files.forEach(file => {
        const sourceFile = `${sourceDir}/${file}`;
        const destFile = `${destinationDir}/${file}`;
        copyFileSync(sourceFile, destFile);
    });

    console.log('Files copied successfully!');
};

await copy();
