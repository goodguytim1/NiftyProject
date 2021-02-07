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
console.log(copyAllButtons);
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
    console.log(all_buttons.length);
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