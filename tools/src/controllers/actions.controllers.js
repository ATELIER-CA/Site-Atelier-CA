import { unlink, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir le chemin absolu du fichier actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construire le chemin absolu vers le fichier JSON
const filePath = path.join(__dirname, '../../../js/projets.json');
const projetImagesPath = path.join(__dirname, '../../../assets/images/projects');

export const synchro = async (req, res) => {
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
        console.log('Fichier mis à jour avec succès');

        res.status(200).json({
            message: 'Fichier mis à jour avec succès'
        });
    } catch (err) {
        console.error("synchro error : ", err);
        res.status(500).json({
            message: "Une erreur s'est produite"
        });
    }
};

export const upload = async (req, res) => {
    try {
        res.status(200).json({
            message: "OK"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({});
    }
};

export const update_projet = async (req, res) => {
    try {
        const { id } = req.params;

        const call = await readFile(filePath, 'utf-8');
        const projets = JSON.parse(call);

        const myProject = projets.find(el => el.id == id);
        if (!myProject) {
            throw new Error('Project not found');
        }

        const projetsWithoutThis = projets.filter(el => el.id != id);

        const newObjProject = {
            ...myProject,
            ...req.body
        };

        projetsWithoutThis.push(newObjProject);
        projetsWithoutThis.sort((a, b) => a.id - b.id);

        await writeFile(filePath, JSON.stringify(projetsWithoutThis, null, 4), 'utf-8');
        console.log('Fichier mis à jour avec succès');

        res.status(200).json({
            message: "OK"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({});
    }
};

export const delete_img_projet = async (req, res) => {
    try {
        const { id } = req.params;

        const call = await readFile(filePath, 'utf-8');
        const projets = JSON.parse(call);

        const thisProject = projets.find(el => el.id == id);
        if (!thisProject) {
            throw new Error('Project not found');
        }

        const imgToDel = [];

        imgToDel.push(`${thisProject.image}.jpg`);
        for (const img of thisProject.photos) {
            imgToDel.push(`${img}.jpg`);
        }

        const projetsWithoutThis = projets.filter(el => el.id != id);
        projetsWithoutThis.push({
            ...thisProject,
            photos: [],
            image: ""
        });
        projetsWithoutThis.sort((a, b) => a.id - b.id);

        for (const img of imgToDel) {
            const filePath = path.join(projetImagesPath, img);
            if (existsSync(filePath)) {
                await unlink(filePath);
            }
        }

        await writeFile(filePath, JSON.stringify(projetsWithoutThis, null, 4), 'utf-8');

        res.redirect(`/projet/${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).json({});
    }
};

export const add_projet = async (req, res) => {
    try {
        const call = await readFile(filePath, 'utf-8');
        const projets = JSON.parse(call);
        const sortedProjects = projets.sort((a, b) => a.id - b.id);

        const maxId = projets.reduce((max, projet) => {
            return projet.id > max ? projet.id : max;
        }, 0);

        const new_projet = {
            id: maxId + 1,
            ...req.body,
        };

        sortedProjects.push(new_projet);
        sortedProjects.sort((a, b) => a.id - b.id);

        console.log(new_projet);

        await writeFile(filePath, JSON.stringify(sortedProjects, null, 4), 'utf-8');
        console.log('Nouveau projet créé avec succès');

        res.status(200).json({
            id: new_projet.id,
            message: "OK"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({});
    }
};
