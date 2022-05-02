import { projets } from './data-projets.js';

// Création de la page produit
const main = document.querySelector('#main-projet');
let idProject = parseInt(window.location.search.slice(1)) - 1;

const titlePage = document.querySelector('title');
titlePage.innerHTML = `Projet - ${projets[idProject].title}`;

createInfo()
crateGalerie()
addBtnBack()
saveChoice()

const choiceSouted = `.${localStorage.getItem('btso')}`;
const allProjetsBtn = document.querySelector(`${choiceSouted}`);
allProjetsBtn.click();


function createInfo() {
    let projetInfo = document.createElement('section');
    projetInfo.classList.add("le-projet");
    projetInfo.innerHTML = `
        <h1>${projets[idProject].title}</h1>
        <div class="bloc-projet-description">
            <div class="projet-info">
                <p><span>Lieu : </span>${projets[idProject].lieu}</p> 
                <p><span>Calendrier : </span>${projets[idProject].calendar}</p>
                <p><span>Maître d'ouvrage : </span>${projets[idProject].moa}</p>
                <p><span>Budget : </span>${projets[idProject].budget}</p>
                <p><span>Surface : </span>${projets[idProject].surface}</p>
            </div>

            <div class="la-description">
                <p>${projets[idProject].description}</p>
            </div>
        </div>
        <a id="back" href="./nos-projets.html">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/>
        </svg>
            RETOUR AUX PROJETS
        </a>
    `;
    main.appendChild(projetInfo)


    const description = document.querySelector(".la-description");

    if(!projets[idProject].description === undefined) {
        let desc = document.createElement('p');
        desc.innerHTML = `${projets[idProject].description}`;

        description.appendChild(desc);
    } else {
        description.classList.add('none');
    }
};

function crateGalerie() {
    let projetGalerie = document.createElement('div');
    projetGalerie.classList.add("bloc-img");

    const gallery = projets[idProject].photos;
    let textImg = "";

    for(let i = 0; i < gallery.length; i++) {

        let img = `<img src="./assets/images/projects/${gallery[i]}.jpg" alt="photo n° ${i} du projet">`;
        textImg = textImg + img;

    }

    projetGalerie.innerHTML = `${textImg}`;

    main.appendChild(projetGalerie);
}

function addBtnBack() {
    const afterList = document.querySelector('.bloc-img')
    const btnBack = document.createElement('a');
    btnBack.id = "backBottom";
    btnBack.setAttribute("href", "./nos-projets.html")
    btnBack.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/>
    </svg>
    RETOUR AUX PROJETS
    `;

    afterList.appendChild(btnBack);
}

function saveChoice() {
    const btnSourter = document.querySelectorAll('.sourt_out');
    let nbOfClick = 0;

    btnSourter.forEach(btn => {
        btn.addEventListener('click', function() {

            nbOfClick++
            console.log(window.location);

            btnSourter.forEach(btn => {
                btn.classList.remove('active');
            })
            this.classList.add('active');

            const btnSourted = (Array.from(this.classList)).slice(1)[0];

            localStorage.setItem('btso', btnSourted);

            if(nbOfClick >=2) {
                location.href = "./nos-projets.html";
            }
        });
    });
};