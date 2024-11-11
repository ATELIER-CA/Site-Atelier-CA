document.querySelector("[data-new-id]").addEventListener("click", function() {
    const id = this.getAttribute('data-new-id');
    if(!id) {
        return
    }
    window.location.href = `/projet/${id}`;
})

document.querySelector('[data-save-new-projet]').addEventListener('click', async function() {
    try {
        const title = document.getElementById("title").value;
        const type = document.getElementById("type").value;
        const lieu = document.getElementById("lieu").value;
        const calendar = document.getElementById("calendar").value;
        const moa = document.getElementById("moa").value;
        const desc = document.getElementById("desc").value;
        const budget = document.getElementById("budget").value;
        const surface = document.getElementById("surface").value;
        const tag = document.getElementById("tag").value;

        const newObj = {
            title,
            type,
            lieu,
            calendar,
            moa,
            desc,
            budget,
            surface,
            tag,
            image: "",
            photos: []
        };

        const call = await fetch("/add_projet", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObj)
        });
        const resp = await call.json();

        Toastify({
			text: `Nouveau projet créé avec succès.`,
			className: "success",
			duration: 5000,
			newWindow: true,
			close: false,
			gravity: "bottom",
			position: "left",
			stopOnFocus: true,
			onClick: () => {},
		}).showToast();

        const element = document.querySelector("[data-new-id]");
        if(element) {
            element.setAttribute('data-new-id', resp.id);
            element?.classList.remove("none");
        }
    } catch (err) {
        console.error(err);
        Toastify({
			text: "Une erreur est survenue lors de la création du projet.",
			className: "error",
			duration: 5000,
			newWindow: true,
			close: false,
			gravity: "bottom",
			position: "left",
			stopOnFocus: true,
			onClick: () => {},
		}).showToast();
    }
})