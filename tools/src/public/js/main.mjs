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

		window.location.reload();
    } catch (err) {
        console.error(err);
		window.location.reload();
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

		window.location.reload();
    } catch (err) {
        console.error(err);
		window.location.reload();
    }
});