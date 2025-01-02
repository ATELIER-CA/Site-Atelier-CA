document.addEventListener('DOMContentLoaded', async () => {
    // Vérifier si des projets ont été chargés et si l'ID est valide
    const idProject = parseInt(window.location.search.slice(1)) - 1;
    // Charger les données JSON
    const projets = await loadProjets();
    projets.sort((a, b) => a.id - b.id);

    if (projets.length > 0 && idProject >= 0 && idProject < projets.length) {
        const project = projets[idProject];

        // Mise à jour du titre de la page
        const titlePage = document.querySelector('title');
        titlePage.textContent = `Projet - ${project.title}`;

        createInfo(project);
        createGalerie(project);
        addBtnBack();
        saveChoice();

        // Gestion de l'état des boutons
        const choiceSouted = `.${localStorage.getItem('btso')}`;
        const allProjetsBtn = document.querySelector(choiceSouted);
        if (allProjetsBtn) {
            allProjetsBtn.click();
        }
    } else {
        console.error("Projet non trouvé ou données non disponibles");
        document.querySelector('#main-projet').innerHTML = '<p>Projet non trouvé</p>';
    }
});

async function loadProjets() {
    try {
        const response = await fetch('./js/projets.json');
        if (!response.ok) throw new Error('Erreur lors du chargement des projets');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

function createInfo(project) {
    let projetInfo = document.createElement('section');
    projetInfo.classList.add("le-projet");

    const descriptionHTML = project.desc ? `
        <p class="desc">${project.desc}</p>` : '';

    projetInfo.innerHTML = `
        <h1>${project.title}</h1>
        <div class="bloc-projet-description">
            <div class="projet-info">
                <p><span>Lieu : </span>${project.lieu}</p>
                <p><span>Calendrier : </span>${project.calendar}</p>
                <p><span>Maître d'ouvrage : </span>${project.moa}</p>
                <p><span>Budget : </span>${project.budget}</p>
                <p><span>Surface : </span>${project.surface}</p>
                ${descriptionHTML}
            </div>
        </div>
        <a id="back" href="./nos-projets.html">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/></svg>
            RETOUR AUX PROJETS
        </a>
    `;

    document.querySelector('#main-projet').appendChild(projetInfo);
}

function createGalerie(project) {
    let projetGalerie = document.createElement('div');
    projetGalerie.classList.add("bloc-img");

    let textImg = project.video ? `
        <video controls autoplay loop muted controlsList="nodownload" title="Vidéo du projet ${project.title}">
            <source src="./assets/videos/${project.video}.mp4" type="video/mp4">
        </video>` : '';

    project.photos.forEach((photo, index) => {
        textImg += `<img src="./assets/images/projects/${photo}" alt="photo n° ${index} du projet">`;
    });

    projetGalerie.innerHTML = textImg;
    document.querySelector('#main-projet').appendChild(projetGalerie);
}

function addBtnBack() {
    const afterList = document.querySelector('.bloc-img');
    const btnBack = document.createElement('a');
    btnBack.id = "backBottom";
    btnBack.setAttribute("href", "./nos-projets.html");
    btnBack.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/></svg>
        RETOUR AUX PROJETS
    `;
    afterList.appendChild(btnBack);
}

function saveChoice() {
    const btnSourter = document.querySelectorAll('.sourt_out');
    let nbOfClick = 0;

    btnSourter.forEach(btn => {
        btn.addEventListener('click', function() {
            nbOfClick++;

            btnSourter.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');

            const btnSourted = Array.from(this.classList).slice(1)[0];
            localStorage.setItem('btso', btnSourted);

            if (nbOfClick >= 2) {
                location.href = "./nos-projets.html";
            }
        });
    });
}