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
    playGame('Rock');
})
document.querySelector('.js-paper-btn').addEventListener('click', () =>{
    playGame('Paper');
})
document.querySelector('.js-scissors-btn').addEventListener('click', () =>{
    playGame('Scissors');
})

function playGame(playerMove){
    let computerMove = pickComputerMove();
    let result = '';
    if(playerMove === 'Rock'){
        if(computerMove === 'Rock'){
            result = 'Tie.';
        }
        else if(computerMove === 'Paper'){
            result ='You lose!';
        }
        else if(computerMove === 'Scissors'){
            result = 'You win!';
        }
    }
    else if(playerMove === 'Paper'){
        if(computerMove === 'Rock'){
            result = 'You win!';
        }
        else if(computerMove === 'Paper'){
            result ='Tie.';
        }
        else if(computerMove === 'Scissors'){
            result = 'You lose!';
        }
    }
    else if(playerMove === 'Scissors'){
        if(computerMove === 'Rock'){
            result = 'You lose!';
        }
        else if(computerMove === 'Paper'){
            result ='You win!';
        }
        else if(computerMove === 'Scissors'){
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
        computerMove = 'Rock';
    }
    else if(randomNumber>=1/3 && randomNumber<2/3){
        computerMove = 'Paper';
    }
    else if(randomNumber>=2/3 && randomNumber<1){
        computerMove = 'Scissors';
    }
    return computerMove;
}