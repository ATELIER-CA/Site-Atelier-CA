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

// BOUTON TO SAVE ON GITHUB AND DELOY ==================== //
const saveGithubBtn = document.querySelector("[data-save-gh]");

saveGithubBtn?.addEventListener("click", async() => {
    const githubIcon = saveGithubBtn.querySelector(".fa-github");
    const syncIcon = saveGithubBtn.querySelector(".fa-sync-alt");

    try {
        githubIcon.classList.add('none');
        syncIcon.classList.remove('none');

        const call = await fetch("/save");
        const resp = await call.json();

        githubIcon.classList.remove('none');
        syncIcon.classList.add('none');

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
        githubIcon.classList.remove('none');
        syncIcon.classList.add('none');
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

// BOUTON RETOUR =========================== //
document.querySelector("[data-come-back]").addEventListener("click", () => {
    history.back();
});