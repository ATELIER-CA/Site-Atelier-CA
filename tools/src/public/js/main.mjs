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


// DRAG AND DROP FILE ================================================= //
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
        console.log(data);

        Toastify({
			text: "Les images ont bien était charger. N'oubliez pas de Synchroniser.",
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
			text: "Une erreur est survenue lors de l'import des images.",
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
        console.log(data);

        Toastify({
			text: "Les images ont bien était charger. N'oubliez pas de Synchroniser.",
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
			text: "Une erreur est survenue lors de l'import des images.",
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