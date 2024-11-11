for (const card of document.querySelectorAll(".card")) {
    card.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        window.location.href = `/projet/${id}`;
    });
};

for (const filtre of document.querySelectorAll('[data-filtre]')) {
    filtre.addEventListener('click', function() {
        document.querySelectorAll('[data-filtre]').forEach(el => {
            el.classList.remove("active");
        })
        this.classList.add('active');

        const type = this.getAttribute('data-type');

        if(type === "TOUS") {
            document.querySelectorAll('.card').forEach(projet => projet.classList.remove('none'))
        } else {
            document.querySelectorAll('.card').forEach(projet => projet.classList.add('none'))
            document.querySelectorAll(`.${type}`).forEach(projet => projet.classList.remove('none'));

        }
    });
};