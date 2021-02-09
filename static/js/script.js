// Challenge 1: Your Age in Days

function ageInDays() {
    var birthYear = prompt('What year were you born?');
    var age = (2021 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + age + ' days old.');
    h1.setAttribute('id', 'age');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('age').remove();

}

// Challenge 2: Cat Generator

function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('flexCatGen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

// Challenge 3: Rock, Paper, Scissors

function rpsGame(yourChoice) {
    // if(yourChoice.id == "rock") {
    //     console.log("ROCK");
    // }
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = randToRps();
    results = decideWinner(humanChoice, botChoice); // [1, 0] or [0.5, 0.5] or [0, 1]
    message = finalMessage(results); // {'message': 'You won!', 'color': 'green'}
    console.log(message);
    rpsFrontEnd(humanChoice, botChoice, message);
}

function randToRps() {
    return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
}

function decideWinner(hChoice, bChoice) {
    // My if else solution
    // if(hChoice == bChoice) {
    //     return [.5, .5];
    // } else if (hChoice == "rock") {
    //     if (bChoice == "paper") {
    //         return [0, 1];
    //     } else {
    //         return [1, 0];
    //     }
    // } else if (hChoice == "paper") {
    //     if (bChoice == "scissors") {
    //         return [0, 1];
    //     } else {
    //         return [1, 0];
    //     }
    // } else if (hChoice == "scissors") {
    //     if (bChoice == "rock") {
    //         return [0, 1];
    //     } else {
    //         return [1, 0];
    //     }
    // } else {
    //     return [.5, .5];
    // }

    var rpsDataStructure = {
        'rock': {'scissors': 1, 'rock': .5, 'paper': 0},
        'paper': {'scissors': 0, 'rock': 1, 'paper': .5},
        'scissors': {'scissors': .5, 'rock': 0, 'paper': 1}
    };

    var hScore = rpsDataStructure[hChoice][bChoice];
    var bScore = rpsDataStructure[bChoice][hChoice];
    return [hScore, bScore];
    
}

function finalMessage ([hScore, bScore]) {
    if (hScore === 0) {
        return {'message': 'You lost!', 'color': 'red'};
    } else if (hScore === .5) {
        return {'message': 'You tied!', 'color': 'yellow'};
    } else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd (humanImageChoice, botImageChoice, finalMessage) {
    var imagesDB = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    };

    document.getElementById('rock').remove();
    document.getElementById('scissors').remove();
    document.getElementById('paper').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDB[humanImageChoice] + "' height= '150px' width= '150px' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>";
    botDiv.innerHTML = "<img src='" + imagesDB[botImageChoice] + "' height= '150px' width= '150px' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>";
    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(messageDiv);
    document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

// Challenge 4: Change the Color of All Buttons
var all_buttons = document.getElementsByTagName('button');
// console.log(all_buttons);
var copyAllButtons = [];
for(button of all_buttons) {
    copyAllButtons.push(button.classList[1]);
}
//console.log(copyAllButtons);
function buttonColorChange (buttonColor) {
    
    //console.log(buttonColor.value);
    if (buttonColor.value == "red") {
        buttonsRed();
    } else if (buttonColor.value == "green") {
        buttonsGreen();
    } else if (buttonColor.value == "reset") {
        buttonColorReset();
    } else if (buttonColor.value == "random") {
        randomColors();
    } else if (buttonColor.value == "blue") {
        buttonsBlue();
    } else if (buttonColor.value == "yellow") {
        buttonsYellow();
    }
}

function buttonsRed () {
    for(button of all_buttons) {
        button.classList.remove(button.classList[1]);
        button.classList.add('btn-danger');
    }
}

function buttonsGreen () {
    for(button of all_buttons) {
        button.classList.remove(button.classList[1]);
        button.classList.add('btn-success');
    }
}
function buttonsBlue () {
    for(button of all_buttons) {
        button.classList.remove(button.classList[1]);
        button.classList.add('btn-primary');
    }
}
function buttonsYellow () {
    for(button of all_buttons) {
        button.classList.remove(button.classList[1]);
        button.classList.add('btn-warning');
    }
}
function buttonColorReset () {
    //console.log(all_buttons.length);
    for(let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}
function randomColors () {
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    for(button of all_buttons) {
        button.classList.remove(button.classList[1]);
        button.classList.add(choices[Math.floor(Math.random() * 4)]);
    }
}

// Challenge 5: Blackjack
document.querySelector('#blackjack-hit-btn').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-btn').addEventListener('click', blackjackStand);
document.querySelector('#blackjack-deal-btn').addEventListener('click', blackjackDeal);

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-score', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-score', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

function showCard(card, activePlayer) {
    if(activePlayer['score'] <= 21)
    {    let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play(); }  
}

function randomCard () {
    let randomNum = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomNum];
}

function blackjackHit () {
    if (blackjackGame['isStand'] === false) {
        if (YOU['score'] < 21) {
            let card = randomCard();
            showCard(card, YOU);
            updateScore(card, YOU);
            showScore(YOU);
        }
    }
    
}

function blackjackStand () {
    if(YOU['score'] != 0 && blackjackGame['isStand'] === false) {
        dealerLogic();
    }   
    
}

function blackjackDeal () {
    //showResult(computeWinner());
    if(blackjackGame['turnsOver'] === true) {
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(YOU['scoreSpan']).style.color = 'white';
        document.querySelector(DEALER['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's play!";
        document.querySelector('#blackjack-result').style.color = "#101820";

        blackjackGame['turnsOver'] = false;
        blackjackGame['isStand'] = false;
    }
}

function updateScore (card, activePlayer) {
    if (card == 'A') {
        if(activePlayer['score'] >= 11) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
    
    console.log(activePlayer['score']);
}

function showScore (activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;
    while(blackjackGame['turnsOver'] === false) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        if (DEALER['score'] > 15) {
            blackjackGame['turnsOver'] = true;
            showResult(computeWinner());
        }
        await sleep(800);
    }
}

function computeWinner () {
    let winner;

    if (YOU['score'] <= 21) { // NO BUST
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21) { // YOU HIGHER SCORE OR DEALER BUST
            blackjackGame['wins']++;
            winner = YOU; // WIN
        } else if (YOU['score'] < DEALER['score']){ // DEALER SCORE HIGHER
            blackjackGame['losses']++;
            winner = DEALER; // LOSS
        } else { //EVEN SCORE
            blackjackGame['draws']++;
            winner = 'draw'; // TIE DRAW
        }
    } else if (DEALER['score'] > 21){ // BUST
        blackjackGame['draws']++;
        winner = 'draw'; // BOTH BUST DRAW
    } else {
        blackjackGame['losses']++;
        winner = DEALER; // YOU BUST DEALER DIDNT 
    }

    
    
    

    return winner;
}

function showResult(winner) {
    if(blackjackGame['turnsOver'] === true) {
        let message, messageColor;
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = '#101820'
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}