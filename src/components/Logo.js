


function logoParams() {
    const top = (window.innerHeight - 50) / 2
    const left = (window.innerWidth - 85) / 2
    return {
        position: "fixed",
        left: `${left}px`,
        top: `${top}px`,
    }
}



export function Logo() {
    return (
        <img id = "img" width = {100} height = {100} style = {logoParams()} src = "images/logo.svg" alt = ""/>
    )
}