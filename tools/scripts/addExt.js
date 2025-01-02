import { readFile, writeFile } from 'fs/promises';

// Chemin du fichier JSON
const filePath = '../../js/projets.json';
const newFilePath = '../../js/projets-ext.json';

try {
    // Lire le fichier JSON
    const data = await readFile(filePath, 'utf-8');
    // Parse le contenu JSON en un tableau d'objets
    let projets = JSON.parse(data);

    // Modifier chaque objet dans le tableau
    projets = projets.map(projet => {
        // Ajouter ".jpg" à chaque élément dans "photos"
        projet.photos = projet.photos.map(photo => photo + '.jpg');
        // Ajouter ".jpg" à l'image
        projet.image += '.jpg';
        return projet; // Retourner l'objet modifié
    });

    // Écrire le fichier JSON mis à jour
    await writeFile(newFilePath, JSON.stringify(projets, null, 4));
    console.log('Fichier JSON mis à jour avec succès.');
} catch (err) {
    console.error('Erreur:', err);
}