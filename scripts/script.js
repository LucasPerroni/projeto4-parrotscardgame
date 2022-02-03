let cards = null
const cardsList = ["bobrossparrot.gif", 
    "front.png", 
    "bobrossparrot.gif", 
    "front.png",
    "explodyparrot.gif", 
    "front.png", 
    "explodyparrot.gif", 
    "front.png", 
    "fiestaparrot.gif", 
    "front.png", 
    "fiestaparrot.gif", 
    "front.png", 
    "metalparrot.gif", 
    "front.png", 
    "metalparrot.gif", 
    "front.png", 
    "revertitparrot.gif", 
    "front.png", 
    "revertitparrot.gif", 
    "front.png", 
    "tripletsparrot.gif", 
    "front.png", 
    "tripletsparrot.gif", 
    "front.png", 
    "unicornparrot.gif", 
    "front.png", 
    "unicornparrot.gif", 
    "front.png"
]

askCards()

function askCards() {
    while (cards < 4 || cards > 14 || cards%2 === 1) {
        cards = parseInt(prompt("How many cards? [Even number between 4 and 14]"))
    }
    displayCards()
}

function displayCards() {
    let main = document.querySelector("main")
    for (let i = 0; i < cards*2; i += 2) {
        main.innerHTML += `
        <div class="card" onclick="rotateCard(this)">
            <div class="face front-face"><img src="images/${cardsList[i]}" alt="parrot Gif"></div>
            <div class="face back-face"><img src="images/${cardsList[i + 1]}" alt="parrot"></div>
        </div>
        `
    }
}

function rotateCard(element) {
    let face = element.childNodes
    face[1].classList.toggle("front-face-rotate")
    face[3].classList.toggle("back-face-rotate")
}
