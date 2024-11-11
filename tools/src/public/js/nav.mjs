for (const nav of document.querySelectorAll('[data-nav]')) {
    nav.classList.remove("active");
    const firtPath = window.location.pathname.split("/")[1];
    document.querySelector(`[data-link="${firtPath}"]`)?.classList.add("active");
}