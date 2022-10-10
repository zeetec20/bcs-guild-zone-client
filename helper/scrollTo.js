const scrollTo = (top, left) => {
    console.log(top, left)
    window.scrollTo({
        top,
        left,
        behavior: "smooth"
    })
}

export default scrollTo