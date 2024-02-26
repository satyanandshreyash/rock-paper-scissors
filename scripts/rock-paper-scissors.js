let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
updateScoreElement();

let isAutoPlaying = false;
let intervalId;


function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    }
    else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }

    
}

document.querySelector('.js-rock-btn').addEventListener('click', () =>{
    playGame('rock');
})
document.querySelector('.js-paper-btn').addEventListener('click', () =>{
    playGame('paper');
})
document.querySelector('.js-scissors-btn').addEventListener('click', () =>{
    playGame('scissors');
})

function playGame(playerMove){
    let computerMove = pickComputerMove();
    let result = '';
    if(playerMove === 'rock'){
        if(computerMove === 'rock'){
            result = 'Tie.';
        }
        else if(computerMove === 'paper'){
            result ='You lose!';
        }
        else if(computerMove === 'scissors'){
            result = 'You win!';
        }
    }
    else if(playerMove === 'paper'){
        if(computerMove === 'rock'){
            result = 'You win!';
        }
        else if(computerMove === 'paper'){
            result ='Tie.';
        }
        else if(computerMove === 'scissors'){
            result = 'You lose!';
        }
    }
    else if(playerMove === 'scissors'){
        if(computerMove === 'rock'){
            result = 'You lose!';
        }
        else if(computerMove === 'paper'){
            result ='You win!';
        }
        else if(computerMove === 'scissors'){
            result = 'Tie.';
        }
    }
    if(result === 'You win!'){
        score.wins += 1;
    }
    else if(result === 'You lose!'){
        score.losses += 1;
    }
    else if(result === 'Tie.'){
        score.ties += 1;
    }
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-move').innerHTML = `You
    <img src="icons/${playerMove}-emoji.png" class="move-icon">
    Computer
    <img src="icons/${computerMove}-emoji.png" class="move-icon">`;
}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins = ${score.wins}, Losses = ${score.losses} and Ties = ${score.ties}`
}

function pickComputerMove(){
    let computerMove = '';
    const randomNumber = Math.random();
    if(randomNumber>=0 && randomNumber<1/3){
        computerMove = 'rock';
    }
    else if(randomNumber>=1/3 && randomNumber<2/3){
        computerMove = 'paper';
    }
    else if(randomNumber>=2/3 && randomNumber<1){
        computerMove = 'scissors';
    }
    return computerMove;
}