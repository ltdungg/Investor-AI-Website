function ScrollTo(where) {
    const content = document.querySelector(where);
    if (content) {
        window.scrollTo({
            top: content.offsetTop,
            behavior: "smooth",
        });
    }
}

export default ScrollTo;