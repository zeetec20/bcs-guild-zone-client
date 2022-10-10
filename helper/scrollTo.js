const scrollTo = (top, left) => {
    window.scrollTo({
        top,
        left,
        behavior: "smooth"
    })
}

export default scrollTo