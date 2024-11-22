document.querySelector('[data-btn-delete-slider-img]').addEventListener("submit", function(e) {
    e.preventDefault();
    const result = confirm("Etes-vous sure de vouloir supprimer les images du slider ?");
    if(!result) {
        return
    }
    this.submit();
});

// DRAG AND DROP FILE - SLIDER ================================================= //
const inputFileSlider = document.querySelector("[input-slider-dropzone]");
const fileContainerSlider = document.querySelector("[drag-and-drop-slider-zone]");

fileContainerSlider?.addEventListener("dragover", (e) => {
	e.preventDefault();
});

fileContainerSlider?.addEventListener("drop", async(e) => {
	e.preventDefault();
    const files = e.dataTransfer.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    try {
        const response = await fetch('/upload_slider', {
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

inputFileSlider?.addEventListener("change", async(e) => {
	const files = e.target.files || e.dataTransfer.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    try {
        const response = await fetch('/upload_slider', {
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