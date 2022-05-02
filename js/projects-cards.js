import { projets } from './data-projets.js';
const blocProject = document.querySelector('.bloc-projet');

if(window.innerWidth <= 1024) {
    const btnProject = document.getElementById('projects');
    btnProject.innerHTML = '<a href="./nos-projets.html">Projets</a>';
}

const choiceSourted = `.${localStorage.getItem('btso')}`;
const allProjetsBtn = document.querySelector(`${choiceSourted}`);

showProjectCards()
sourtOutProject()

allProjetsBtn.click();


function showProjectCards() {

    for (let i = projets.length - 1; i >= 0; i--) {

        let card = document.createElement('div');
        card.classList.add("projet");
        card.classList.add(`${projets[i].type}`);
        card.classList.add("none");
        card.innerHTML = `
            <img src="./assets/images/projects/${projets[i].image}.jpg" alt="photo d'un projet">
            <a href="projet.html?${projets[i].id}">${projets[i].title}</a>
        `;

        blocProject.appendChild(card);
    };
};

function sourtOutProject() {
    const btnSourter = document.querySelectorAll('.sourt_out');

    btnSourter.forEach(btn => {
        btn.addEventListener('click', function() {

            btnSourter.forEach(btn => {
                btn.classList.remove('active');
            })
            this.classList.add('active');

            const btnSourted = (Array.from(this.classList)).slice(1)[0];
            console.log(btnSourted);

            localStorage.setItem('btso', btnSourted);

            displayCardProject(btnSourted)
        });
    });
};

function displayCardProject(sourtedOut) {
    const allProjets = document.querySelectorAll('.projet');

    switch(sourtedOut) {
        case 'so1':
            allProjets.forEach(projets => {
                projets.classList.remove('none');
            });
            break;
        case 'so2':
            const medico = document.querySelectorAll('.MEDICO');
            hideProject();
            medico.forEach(projets => {
                projets.classList.remove('none');
            })
            break;
        case 'so3':
            const educat = document.querySelectorAll('.EDUCATION');
            hideProject();
            educat.forEach(projets => {
                projets.classList.remove('none');
            })
            break;
        case 'so4':
            const equipe = document.querySelectorAll('.EQUIPEMENTS');
            hideProject();
            equipe.forEach(projets => {
                projets.classList.remove('none');
            })
            break;
        case 'so5':
            const logements = document.querySelectorAll('.LOGEMENTS');
            hideProject();
            logements.forEach(projets => {
                projets.classList.remove('none');
            })
            break;
        case 'so6':
            const maison = document.querySelectorAll('.MAISON');
            hideProject();
            maison.forEach(projets => {
                projets.classList.remove('none');
            })
            break;
        case 'so7':
            const commerce = document.querySelectorAll('.COMMERCE');
            hideProject();
            commerce.forEach(projets => {
                projets.classList.remove('none');
            })
            break;
        case 'so8':
            const indus = document.querySelectorAll('.INDUSTRIEL');
            hideProject();
            indus.forEach(projets => {
                projets.classList.remove('none');
            })
            break;
    };

    function hideProject() {
        allProjets.forEach(projets => {
            projets.classList.add('none');
        })
    };
}