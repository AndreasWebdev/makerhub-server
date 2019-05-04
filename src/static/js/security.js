// Page Loading
let domBody = document.querySelector("body");
window.onload = function() {
    domBody.classList.remove("loading");
};

// Scrolling
function smoothScrollTo(elementSelector) {
    let elementToScroll = document.querySelector(elementSelector);

    window.scroll({
        top: elementToScroll.getBoundingClientRect().top,
        behavior: 'smooth'
    });
}
