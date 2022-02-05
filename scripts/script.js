let cards = null
let call = null
let missingCards = null
let continueGame = null
let interval = null
let click = null
let rounds = 0
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
let cardsListChosen = []

askCards()

function askCards() {
    cards = null
    rounds = 0
    document.querySelector("header p").innerHTML = 0
    while (cards < 4 || cards > 14 || cards%2 === 1) {
        cards = parseInt(prompt("How many cards? [Even number between 4 and 14]"))
    }
    missingCards = cards
    displayCards()
    stopWatch()
}

function displayCards() {
    let main = document.querySelector("main")
    cardsListChosen = [] 
    for (let i = 0; i < cards; i++) {
        cardsListChosen.push(cardsList[i])
    }
    cardsListChosen.sort(sortArray)
    for (let i = 0; i < cards; i++) {
        main.innerHTML += `
        <div class="card" data-identifier="card" onclick="rotateCard(this)">
            <div class="face front-face" data-identifier="front-face"><img src="images/${cardsListChosen[i]}" alt="parrot Gif"></div>
            <div class="face back-face" data-identifier="back-face"><img src="images/front.png" alt="parrot"></div>
        </div>
        `
    }
    click = document.querySelector("main .card").onclick
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
            blockCards()
            for (let i = 0; i < 2; i++) {
                let wrong = document.querySelector("main .selected")
                wrong.classList.remove("selected")
                wrongCards.push(wrong)
            }
            call = "nop"
            setTimeout(rotateCard, 1000, wrongCards[0])
            setTimeout(rotateCard, 1000, wrongCards[1])
            setTimeout(enableCards, 1000)
            setTimeout(callNullifier, 1000)
            rounds += 1
        }
        
    } else if (turnedCard[0] !== undefined && turnedCard[1] === undefined) {
        turnedCard[0].onclick = null
    }
}

function callNullifier() {
    call = null
}

function endGame() {
    let counter = document.querySelector("header p").innerHTML
    if (missingCards === 0) {
        alert(`Congratulations, you won in ${counter} seconds and ${rounds} rounds!`)
        clearInterval(interval)
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

function stopWatch() {
    interval = setInterval(stopWatchCounter, 1000)
}

function stopWatchCounter() {
    let timer = document.querySelector("header p")
    timer.innerHTML = parseInt(timer.innerHTML) + 1
}

function blockCards() {
    let testCards = document.querySelectorAll("main .card")
    for (let i = 0; i < testCards.length; i++) {
        testCards[i].onclick = null
    }
}

function enableCards() {
    let allCards = document.querySelectorAll("main .card")
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].onclick = click
    }
}

function sortArray() {
    return Math.random() - 0.5
}
