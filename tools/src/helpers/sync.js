import { readFile, readdir, writeFile, unlink } from "node:fs/promises";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../../../js/projets.json');
const projetImagesPath = path.join(__dirname, '../../../assets/images/projects');


export const synchronizeImgProject = async() => {
    try {
        const newProjectArray = [];

        const call = await readFile(filePath, 'utf-8');
        const projets = JSON.parse(call);
        projets.sort((a, b) => a.id - b.id);

        const imageFiles = await readdir(projetImagesPath);

        for (const projet of projets) {
            const new_projet = {
                ...projet
            };

            const filteredFiles = imageFiles.filter(file =>
                file.startsWith(projet.tag) && !file.endsWith('00.jpg')
            );

            new_projet.photos = filteredFiles.map(el => el.split('.')[0]);
            new_projet.image = `${projet.tag}00`;
            newProjectArray.push(new_projet);
        }

        await writeFile(filePath, JSON.stringify(newProjectArray, null, 4), 'utf-8');
        await cleanUnreferencedImages(newProjectArray, imageFiles);

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

const cleanUnreferencedImages = async (projects, imageFiles) => {
    try {
        const referencedFiles = new Set();

        for (const projet of projects) {
            referencedFiles.add(`${projet.image}.jpg`);
            projet.photos.forEach(photo => referencedFiles.add(`${photo}.jpg`));
        }

        const filesToDelete = imageFiles.filter(file => !referencedFiles.has(file));

        for (const file of filesToDelete) {
            const filePathToDelete = path.join(projetImagesPath, file);
            await unlink(filePathToDelete);
        }
    } catch (err) {
        console.error('Error cleaning images:', err);
    }
};