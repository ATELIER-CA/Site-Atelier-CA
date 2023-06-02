localStorage.removeItem('btso');
localStorage.setItem('btso', 'so1');

localStorage.removeItem('ordi');
if(window.innerWidth > '1024') {
    localStorage.setItem('ordi', '0');
} else {
    localStorage.setItem('ordi', '1');
};

localStorage.removeItem('tablet');
if(window.innerWidth <= '1024') {
    localStorage.setItem('mobile', '0');
} else {
    localStorage.setItem('mobile', '1');
};

localStorage.removeItem('mobile');
if(window.innerWidth <= '1024') {
    localStorage.setItem('mobile', '0');
} else {
    localStorage.setItem('mobile', '1');
};