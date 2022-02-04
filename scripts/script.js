let cards = null
let call = null
let rounds = 0
let missingCards = null
let continueGame = null
const cardsList = ["bobrossparrot.gif", 
    "bobrossparrot.gif", 
    "explodyparrot.gif", 
    "explodyparrot.gif", 
    "fiestaparrot.gif", 
    "fiestaparrot.gif", 
    "metalparrot.gif", 
    "metalparrot.gif", 
    "revertitparrot.gif", 
    "revertitparrot.gif", 
    "tripletsparrot.gif", 
    "tripletsparrot.gif", 
    "unicornparrot.gif", 
    "unicornparrot.gif", 
]

askCards()

function askCards() {
    cards = null
    rounds = 0
    while (cards < 4 || cards > 14 || cards%2 === 1) {
        cards = parseInt(prompt("How many cards? [Even number between 4 and 14]"))
    }
    missingCards = cards
    displayCards()
}

function displayCards() {
    let main = document.querySelector("main")
    let cardsListChosen = [] 
    for (let i = 0; i < cards; i++) {
        cardsListChosen.push(cardsList[i])
        main.innerHTML += `
        <div class="card" onclick="rotateCard(this)">
            <div class="face front-face"><img src="images/${cardsList[i]}" alt="parrot Gif"></div>
            <div class="face back-face"><img src="images/front.png" alt="parrot"></div>
        </div>
        `
    }
}

function rotateCard(element) {
    let face = element.childNodes
    face[1].classList.toggle("front-face-rotate")
    face[3].classList.toggle("back-face-rotate")
    if (call === null) {
        element.classList.toggle("selected")
        compareCards()
    }
}

function compareCards() {
    let wrongCards = []
    let turnedCard = document.querySelectorAll("main .selected")
    if (turnedCard[1] !== undefined) {

        if (turnedCard[1].childNodes[1].innerHTML === turnedCard[0].childNodes[1].innerHTML) {
            for (let i = 0; i < 2; i++) {
                document.querySelector("main .selected").onclick = null
                document.querySelector("main .selected").classList.remove("selected")
            }
            rounds += 1
            missingCards -= 2
            if (missingCards === 0) {
                setTimeout(endGame, 1000)
            }
        } else {
            for (let i = 0; i < 2; i++) {
                let wrong = document.querySelector("main .selected")
                wrong.classList.remove("selected")
                wrongCards.push(wrong)
            }
            call = "nop"
            setTimeout(rotateCard, 1000, wrongCards[0])
            setTimeout(rotateCard, 1000, wrongCards[1])
            setTimeout(callNullifier, 1000)
            rounds += 1
        }
        
    }
}

function callNullifier() {
    call = null
}

function endGame() {
    if (missingCards === 0) {
        alert(`Congratulations, you won in ${rounds} rounds!`)
        while (continueGame !== "y" && continueGame !== "n") {
            continueGame = prompt("Do you want to keep playing? [y/n]")
        }
        if (continueGame === "y") {
            clearHTML()
            askCards()
        } else if (continueGame === "n") {
        }
    }
    continueGame = null
}

function clearHTML() {
    document.querySelector("main").innerHTML = ""
}
