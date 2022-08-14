const colors = [
    "#b3ecff",
    "#99e6ff",
    "#80dfff",
    "#66d9ff",
    "#4dd2ff",
    "#33ccff",
    "#1ac6ff",
    "#00bfff",
    "#00ace6",
    "#0099cc",
    "#0086b3",
    "#007399",
    "#006080",
    "#004d66"
]

export const getColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
}


