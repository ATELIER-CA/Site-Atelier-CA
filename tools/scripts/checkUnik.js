import { readFile } from 'fs/promises';

// Chemin du fichier JSON
const filePath = '../../js/projets-tag.json';

try {
    // Lire le fichier JSON
    const data = await readFile(filePath, 'utf-8');
    const projets = JSON.parse(data);

    // Vérifier l'unicité des tags
    const tags = projets.map(projet => projet.tag);
    const uniqueTags = new Set(tags);

    if (tags.length === uniqueTags.size) {
        console.log('Tous les tags sont uniques.');
    } else {
        console.log('Des tags en double ont été trouvés.');
        const duplicateTags = tags.filter((tag, index) => tags.indexOf(tag) !== index);
        console.log('Tags en double:', [...new Set(duplicateTags)]);
    }
} catch (err) {
    console.error('Erreur:', err);
}
