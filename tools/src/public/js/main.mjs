// BOUTON SYNCHRO =============================================================== //
document.querySelector("[data-btn-synchro]")?.addEventListener("click", async() => {
    try {
        const call = await fetch("/synchro", {
            method: "PUT"
        });
        Toastify({
			text: "Synchronisation avec succès.",
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
			text: "Une erreur est survenue lors de la synchronisation.",
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


// DRAG AND DROP FILE ==================================== //
const inputFile = document.querySelector("[input-dropzone]");
const fileContainer = document.querySelector("[drag-and-drop-zone]");

fileContainer?.addEventListener("dragover", (e) => {
	e.preventDefault();
});

fileContainer?.addEventListener("drop", async(e) => {
	e.preventDefault();
    const files = e.dataTransfer.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();


        if(window.location.pathname === "/depot") {
            Toastify({
                text: "Images uploadées avec succés !",
                className: "success",
                duration: 5000,
                newWindow: true,
                close: false,
                gravity: "bottom",
                position: "left",
                stopOnFocus: true,
                onClick: () => {},
            }).showToast();
        } else {
            window.location.reload();
        }
    } catch (err) {
        console.error(err);
        Toastify({
			text: "Une erreur est survenue lors de la sauvegarde.",
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

inputFile?.addEventListener("change", async(e) => {
	const files = e.target.files || e.dataTransfer.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if(window.location.pathname === "/depot") {
            Toastify({
                text: "Images uploadées avec succés !",
                className: "success",
                duration: 5000,
                newWindow: true,
                close: false,
                gravity: "bottom",
                position: "left",
                stopOnFocus: true,
                onClick: () => {},
            }).showToast();
        } else {
            window.location.reload();
        }
    } catch (err) {
        console.error(err);
        Toastify({
			text: "Une erreur est survenue lors de la sauvegarde.",
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

// BOUTON RETOUR =========================== //
document.querySelectorAll("[data-come-back]").forEach(el => {
    el.addEventListener("click", () => {
        history.back();
    });
});

// BOUTON TO SAVE ON GITHUB AND DELOY ==================== //
const saveGithubBtn = document.querySelector("[data-save-gh]");
const publishGithubBtn = document.querySelector("[data-publish-gh]");

const githubIcon = saveGithubBtn.querySelector(".fa-github");
const githubIconAlt = publishGithubBtn.querySelector(".fa-github-alt");
const syncIcon = saveGithubBtn.querySelectorAll(".fa-sync");
const syncIconAlt = publishGithubBtn.querySelectorAll(".fa-sync");

saveGithubBtn?.addEventListener("click", async function() {
    try {
        this.classList.add('disabled');
        publishGithubBtn.classList.add('disabled');
        githubIcon.classList.add('none');
        syncIcon.forEach(el => el.classList.remove('none'));

        const call = await fetch("/save");
        const resp = await call.json();

        this.classList.remove('disabled');
        publishGithubBtn.classList.remove('disabled');
        githubIcon.classList.remove('none');
        syncIcon.forEach(el => el.classList.add('none'));

        Toastify({
			text: "Sauvegarde sur github réussi !",
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
        this.classList.remove('disabled');
        publishGithubBtn.classList.remove('disabled');
        githubIcon.classList.remove('none');
        syncIcon.forEach(el => el.classList.add('none'));

        console.error(err);

        Toastify({
			text: "Une erreur est survenue lors de la sauvegarde.",
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

publishGithubBtn?.addEventListener("click", async function() {
    try {
        this.classList.add('disabled');
        saveGithubBtn.classList.add('disabled');
        githubIconAlt.classList.add('none');
        syncIconAlt.forEach(el => el.classList.remove('none'));

        const call = await fetch("/save?deploy=true");
        const resp = await call.json();

        this.classList.remove('disabled');
        saveGithubBtn.classList.remove('disabled');
        githubIconAlt.classList.remove('none');
        syncIconAlt.forEach(el => el.classList.add('none'));

        Toastify({
			text: "Sauvegarde sur github réussi ! Déploiement en cours...",
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
        this.classList.remove('disabled');
        saveGithubBtn.classList.remove('disabled');
        githubIconAlt.classList.remove('none');
        syncIconAlt.forEach(el => el.classList.add('none'));

        console.error(err);

        Toastify({
			text: "Une erreur est survenue lors de la sauvegarde.",
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