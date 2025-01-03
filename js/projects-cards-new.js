let v = 1;

document.addEventListener('DOMContentLoaded', async () => {
    // const blocProject = document.querySelector('.bloc-projet');
    // Charger les données JSON
    const projets = await loadProjets();

    const call = await fetch('../version.json');
    const config = await call.json();
    v = config.version;

    // Affichage initial des cartes
    showProjectCards(projets);
    initializeFilter(projets);

    // Déclenche un clic sur le bouton de filtrage enregistré
    const choiceSourted = `.${localStorage.getItem('btso')}`;
    document.querySelector(choiceSourted)?.click();
});

// Fonction pour charger le fichier JSON
async function loadProjets() {
    try {
        const response = await fetch('./js/projets.json');
        // const response = await fetch('./js/projets-copy.json');
        if (!response.ok) throw new Error('Erreur lors du chargement des projets');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Fonction pour afficher les cartes de projet
async function showProjectCards(projets) {
    const blocProject = document.querySelector('.bloc-projet');
    blocProject.innerHTML = '';
    const reverseData = projets.reverse();

    for (const projet of reverseData) {
        const card = document.createElement('div');
        card.classList.add('projet', projet.type, 'none');
        card.innerHTML = `
            <a href="projet.html?${projet.id}">
                <img src="./assets/images/projects/${projet.image}?v=${v}" alt="photo du projet ${projet.title}">
                <h3>${projet.title}</h3>
                <p>${projet.lieu}</p>
            </a>
        `;
        blocProject.appendChild(card);
    }
}

// Fonction pour initialiser les filtres de projets
function initializeFilter(projets) {
    const btnSourter = document.querySelectorAll('.sourt_out');

    for (const btn of btnSourter) {
        btn.addEventListener('click', function() {
            for (const b of btnSourter) {
                b.classList.remove('active');
            }
            this.classList.add('active');
            const btnSourted = Array.from(this.classList).slice(1)[0];
            localStorage.setItem('btso', btnSourted);
            displayCardProject(projets, btnSourted);
        });
    }
}

// Fonction pour afficher les cartes selon le filtre sélectionné
function displayCardProject(projets, filterType) {
    const mapFilter = {
        "so2": ".MEDICO",
        "so3": ".EDUCATION",
        "so4": ".EQUIPEMENTS",
        "so5": ".LOGEMENTS",
        "so6": ".MAISON",
        "so7": ".COMMERCE",
        "so8": ".INDUSTRIEL"
    }

    const allCards = document.querySelectorAll('.projet');
    allCards.forEach(card => card.classList.add('none'));

    if (filterType === 'so1') {
        for (const card of allCards) {
            card.classList.remove('none')
        }
    } else {
        const selectedCard = document.querySelectorAll(mapFilter[filterType]);
        for (const card of selectedCard) {
            card.classList.remove('none')
        }
    }
}