import { readFile, writeFile } from "fs/promises";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../../../js/projets.json');

const mapsType = {
    MEDICO: "Medico-Social",
    EDUCATION: "Education",
    EQUIPEMENTS: "Equipements Publics",
    LOGEMENTS: "Logements",
    MAISON: "Maisons Indiciduelles",
    INDUSTRIEL: "Tertiaire",
    COMMERCE: "Commerce"
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

        projet.typeList = Object.keys(mapsType).filter(el => el != projet.type).sort();

        res.render("projet", projet);
    } catch (err) {
        console.error('Error fetching project:', err);
        res.render('404');
    }
};

export const new_projet = async (req, res) => {
    try {
        const data = {};

        data.typeList = Object.keys(mapsType).sort();

        res.render('new_projet', data);
    } catch (err) {
        console.error('Error creating new project:', err);
        res.render('404');
    }
};