// Scrolling
function smoothScrollTo(elementSelector) {
    let elementToScroll = document.querySelector(elementSelector);

    window.scroll({
        top: elementToScroll.getBoundingClientRect().top,
        behavior: 'smooth'
    });
}
