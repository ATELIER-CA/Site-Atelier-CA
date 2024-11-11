document.querySelector('[data-btn-save]')?.addEventListener("click", async function() {
    try {
        const id = this.getAttribute("data-btn-save");

        const title = document.getElementById("title").value;
        const type = document.getElementById("type").value;
        const lieu = document.getElementById("lieu").value;
        const calendar = document.getElementById("calendar").value;
        const moa = document.getElementById("moa").value;
        const desc = document.getElementById("desc").value;
        const budget = document.getElementById("budget").value;
        const surface = document.getElementById("surface").value;

        const newObj = {
            title,
            type,
            lieu,
            calendar,
            moa,
            desc,
            budget,
            surface
        };

        await fetch(`/update/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObj)
        });

        Toastify({
			text: `Mise à jour du projet ${title} avec succès.`,
			className: "success",
			duration: 5000,
			newWindow: true,
			close: false,
			gravity: "bottom",
			position: "left",
			stopOnFocus: true,
			onClick: () => {},
		}).showToast();
    } catch (err) {
        console.error(err);
        Toastify({
			text: "Une erreur est survenue lors de la mise à jour.",
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
});

document.querySelector('[data-btn-delete-img]').addEventListener("submit", function(e) {
    e.preventDefault();
    const result = confirm("Etes-vous sure de vouloir supprimer les images du projet ?");
    if(!result) {
        return
    }
    this.submit();
});