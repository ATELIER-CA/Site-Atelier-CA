import { exec } from 'node:child_process';
import { unlink, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../../../js/projets.json');
const projetImagesPath = path.join(__dirname, '../../../assets/images/projects');
const sliderImgPath = path.join(__dirname, '../../../assets/images/slider');

import { synchronizeImgProject } from '../helpers/sync.js';
const gitDir = path.join(__dirname, '../../../');


export const synchro = async (req, res) => {
    try {
        const check = await synchronizeImgProject();

        if(!check) {
            throw 'Erreur lors de la synchronisation.';
        }

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

export const update_projet = async(req, res) => {
    try {
        const { id } = req.params;
        const call = await readFile(filePath, 'utf-8');
        const projets = JSON.parse(call);
        const myProject = projets.find(el => el.id == id);
        const projetsWithoutThis = projets.filter(el => el.id != id);
        const newObjProject = {
            ...myProject,
            ...req.body
        }
        projetsWithoutThis.push(newObjProject)
        projetsWithoutThis.sort((a, b) => a.id - b.id);
        await writeFile(filePath, JSON.stringify(projetsWithoutThis, null, 4), 'utf-8');
        console.log('Fichier mis à jour avec succès');
        res.status(200).json({
            message: "OK"
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({});
    }
};

export const upload = async (req, res) => {
    try {
        const check = await synchronizeImgProject();

        if(!check) {
            throw 'Erreur lors de la synchronisation.';
        }

        res.status(200).json({
            message: "OK"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({});
    }
};

export const upload_slider = async (req, res) => {
    try {
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

export const delete_img_slider = async (req, res) => {
    try {
        const sliderImages = await readdir(sliderImgPath);

        for (const img of sliderImages) {
            const filePath = path.join(sliderImgPath, img);
            if (existsSync(filePath)) {
                await unlink(filePath);
            }
        }

        res.redirect('/slider');
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

export const save_on_github = async (req, res) => {
    try {
        let action = 'SAVE with CMS';

        // const { deploy } = req.query;
        // if(deploy) {
        //     action = 'PUBLISH with CMS - [deploy]';
        // }

        const scriptPath = path.join(gitDir, 'saveScript.sh');

        process.chdir(gitDir);

        // Vérifier s'il y a des modifications avant d'exécuter le script
        exec('git status --porcelain', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error checking git status: ${error.message}`);
                return res.status(500).json({ error: error.message });
            }

            if (stderr) {
                console.error(`Git status stderr: ${stderr}`);
                return res.status(500).json({ error: stderr });
            }

            if (stdout.trim() === '') {
                return res.status(200).json({ message: 'Nothing to commit, working directory clean' });
            }

            // Exécuter le script
            const command = process.platform === 'win32' ? `bash ${scriptPath} "${action}"` : `sh ${scriptPath} "${action}"`;
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing script: ${error.message}`);
                    return res.status(500).json({ error: error.message });
                }
                if (stderr && !/To https:\/\/github\.com\/ATELIER-CA\/Site-Atelier-CA\.git/.test(stderr)) {
                    console.error(`Script stderr: ${stderr}`);
                    return res.status(500).json({ error: stderr });
                }
                console.log(`saveScript : ${stdout}`);
                res.status(200).json({ output: stdout });
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({});
    }
};