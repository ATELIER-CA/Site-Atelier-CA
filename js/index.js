localStorage.removeItem('btso');
localStorage.setItem('btso', 'so1');

localStorage.removeItem('ordi');
if(window.innerWidth > '1024') {
    localStorage.setItem('ordi', '0');
} else {
    localStorage.setItem('ordi', '1');
};

localStorage.removeItem('tablet');
if(window.innerWidth <= '1024' && window.innerWidth > '768') {
    localStorage.setItem('tablet', '0');
} else {
    localStorage.setItem('tablet', '1');
};

localStorage.removeItem('mobile');
if(window.innerWidth <= '768') {
    localStorage.setItem('mobile', '0');
} else {
    localStorage.setItem('mobile', '1');
};