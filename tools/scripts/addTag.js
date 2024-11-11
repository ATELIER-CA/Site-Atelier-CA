import { readFile, writeFile } from 'fs/promises';

// Chemin du fichier JSON
const filePath = '../../js/projets.json';
const newFilePath = '../../js/projets-tag.json';

try {
    // Lire le fichier JSON
    const data = await readFile(filePath, 'utf-8');

    // Parse le contenu JSON en un tableau d'objets
    let projets = JSON.parse(data);

    // Ajouter la clé "tag" à chaque objet
    for (const projet of projets) {
        if (projet.image) {
            projet.tag = projet.image.slice(0, -2);
        }
    }

    // Écrire le fichier JSON mis à jour
    await writeFile(newFilePath, JSON.stringify(projets, null, 4));
    console.log('Fichier JSON mis à jour avec succès.');

} catch (err) {
    console.error('Erreur:', err);
}
