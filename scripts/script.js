let cartas = null

function perguntarCartas() {
    while (cartas < 4 || cartas > 14 || cartas%2 === 1) {
        cartas = parseInt(prompt("How many cards? [Even number between 4 and 14]"))
    }
}
