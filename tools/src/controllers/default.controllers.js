import { readdir, readFile, writeFile } from "fs/promises";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../../../js/projets.json');
const sliderImgPath = path.join(__dirname, '../../../assets/images/slider');


const mapsType = {
    COMMERCE: "Commerce",
    EDUCATION: "Education",
    EQUIPEMENTS: "Equipements Publics",
    INDUSTRIEL: "Tertiaire",
    LOGEMENTS: "Logements",
    MAISON: "Maisons Individuelles",
    MEDICO: "Medico-Social",
}

export const start = (req, res) => {
    res.redirect("/projets");
};

export const depot = (req, res) => {
    res.render('depot');
};

export const index = async (req, res) => {
    try {
        const call = await readFile(filePath, 'utf-8');
        const projets = JSON.parse(call);
        projets.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });

        const filtres = [];
        for (const projet of projets) {
            filtres.push({
                name: mapsType[projet.type],
                type: projet.type
            });
        };

        const uniqueFiltre = filtres.filter((value, index, self) =>
            index === self.findIndex((t) => (
                JSON.stringify(t) === JSON.stringify(value)
            ))
        );

        const data = {
            projets,
            uniqueFiltre
        };

        res.render('index', data);
    } catch (err) {
        console.error('Error reading projects file:', err);
        res.render('404');
    }
};

export const projet = async (req, res) => {
    try {
        const { id } = req.params;
        const call = await readFile(filePath, 'utf-8');
        const projets = JSON.parse(call);

        const projet = projets.find(el => el.id == id);

        if (!projet) {
            throw new Error('Project not found');
        }

        // projet.typeList = Object.keys(mapsType).filter(el => el != projet.type).sort();
        projet.type = {
            value: projet.type,
            show_value: mapsType[projet.type]
        }

        const copieMapsType = {...mapsType};
        delete copieMapsType[projet.type.value];

        projet.typeList = Object.entries(copieMapsType).map(el => {
            return {
                value: el[0],
                show_value: el[1]
            }
        });

        res.render("projet", projet);
    } catch (err) {
        console.error('Error fetching project:', err);
        res.render('404');
    }
};

export const new_projet = async (req, res) => {
    try {
        const data = {};

        data.typeList = Object.entries(mapsType).map(el => {
            return {
                value: el[0],
                show_value: el[1]
            }
        });

        res.render('new_projet', data);
    } catch (err) {
        console.error('Error creating new project:', err);
        res.render('404');
    }
};

export const slider = async(req, res) => {
    try {
        const sliderImages = await readdir(sliderImgPath);

        res.render("slider", {
            sliderImages
        });
    } catch (err) {
        console.error(err);
        res.render("slider");
    }
}