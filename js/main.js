if(!localStorage.getItem('btso')) {
    localStorage.setItem('btso', 'so1');
};
if(!localStorage.getItem('ordi')) {
    if(window.innerWidth > '1024') {
        localStorage.setItem('ordi', '0');
    } else {
        localStorage.setItem('ordi', '1');
    };
};
if(!localStorage.getItem('tablet')) {
    if(window.innerWidth <= '1024' && window.innerWidth > '768') {
        localStorage.setItem('tablet', '0');
    } else {
        localStorage.setItem('tablet', '1');
    };
};
if(!localStorage.getItem('mobile')) {
    if(window.innerWidth <= '768') {
        localStorage.setItem('mobile', '0');
    } else {
        localStorage.setItem('mobile', '1');
    };
};

const btnMenu = document.querySelector('.btnMenu');
const svgBarre = document.querySelector('.barre');
const svgCroix = document.querySelector('.croix');
const MenuText = document.querySelector('.textmenu');
const FermerText = document.querySelector('.textfermer');
const header = document.querySelector('header');
const divLogo = document.queryCommandValue('.logo');
const main = document.querySelector('main');

window.addEventListener('resize', () => {
    if(window.innerWidth > '1024' && JSON.parse(localStorage.getItem('ordi')) === 1) {
        localStorage.setItem('ordi', '0');
        localStorage.setItem('tablet', '1');
        localStorage.setItem('mobile', '1');

        location.reload();
    };
    if(window.innerWidth <= '1024' && window.innerWidth > '768' && JSON.parse(localStorage.getItem('tablet')) === 1) {
        localStorage.setItem('ordi', '1');
        localStorage.setItem('tablet', '0');
        localStorage.setItem('mobile', '1');

        location.reload();
    };
    if(window.innerWidth <= '768' && JSON.parse(localStorage.getItem('mobile')) === 1) {
        localStorage.setItem('ordi', '1');
        localStorage.setItem('tablet', '1');
        localStorage.setItem('mobile', '0');

        location.reload();
    };
})

if(window.innerWidth >= '769') {
    const cruxBtn = document.createElement('div');
    cruxBtn.classList.add('crux');
    cruxBtn.classList.add('none');
    main.appendChild(cruxBtn)

    btnMenu.addEventListener('click', function() {
        btnMenu.classList.toggle('active');

        if(btnMenu.classList[1]) {
            header.style.left = '-84px';
            header.style.overflowY = 'scroll';
            svgBarre.style.display = "none";
            svgCroix.style.display = "flex";
            MenuText.style.display = "none";
            FermerText.style.display = "flex";
        } else {
            header.style.left = '-168px';
            header.style.overflowY = 'hidden';
            svgBarre.style.display = "flex";
            svgCroix.style.display = "none";
            MenuText.style.display = "flex";
            FermerText.style.display = "none";
        }

        if((Array.from(this.classList)).slice(1)[0]) {
            cruxBtn.classList.remove('none');
            cruxBtn.style.opacity = '1';
        } else {
            cruxBtn.style.opacity = '0';
            cruxBtn.classList.add('none');
        };
    });

    cruxBtn.addEventListener('click', function() {
        btnMenu.classList.toggle('active');

        if(btnMenu.classList[1]) {
            header.style.left = '-84px';
            header.style.overflowY = 'scroll';
            svgBarre.style.display = "none";
            svgCroix.style.display = "flex";
            MenuText.style.display = "none";
            FermerText.style.display = "flex";
        } else {
            header.style.left = '-168px';
            header.style.overflowY = 'hidden';
            svgBarre.style.display = "flex";
            svgCroix.style.display = "none";
            MenuText.style.display = "flex";
            FermerText.style.display = "none";
        }

        if((Array.from(this.classList)).slice(1)[0]) {
            cruxBtn.classList.remove('none');
            cruxBtn.style.opacity = '1';
        } else {
            cruxBtn.style.opacity = '0';
            cruxBtn.classList.add('none');
        };
    });
}

if(window.innerWidth <= '768') {
    btnMenu.addEventListener('click', function() {
        btnMenu.classList.toggle('active');

        if(btnMenu.classList[1]) {
            header.style.height = '100%';
            header.style.overflowY = 'scroll';
            svgBarre.style.display = "none";
            svgCroix.style.display = "flex";
            MenuText.style.display = "none";
            FermerText.style.display = "flex";
            nonScroll()
        } else {
            header.style.height = '70px';
            header.style.overflowY = 'hidden';
            svgBarre.style.display = "flex";
            svgCroix.style.display = "none";
            MenuText.style.display = "flex";
            FermerText.style.display = "none";
            ouiScroll()
        }
    });
}