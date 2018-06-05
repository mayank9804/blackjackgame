//Game Screen
let gameSection = document.getElementById('game-section');
//Alert Banners should only be visible at the end of game
let alertBanners = document.getElementsByClassName('alert');
for (let index = 0; index < alertBanners.length; index++) {
    alertBanners[index].style.display='none';       
}
//Game Screen Position
let gameSectionYPosition = gameSection.offsetTop;
//Initially Game Screen should not be visible
gameSection.style.display = 'none';

//Play Button Fetched from DOM
let playInitButton = document.getElementById('playInitButton');
//Event Listener added to Play Button
playInitButton.addEventListener('click',function(e){
    e.preventDefault();
    playBlackJack();
});

//Hit button fetched from DOM
let hitButton = document.getElementById('hit');
hitButton.addEventListener('click',function(){
    playerDeck.push(getNextCard());
    checkGameStatus();
});
//Stand button fetched from DOM
let standButton = document.getElementById('stand');
standButton.addEventListener('click',function(){
    gameOver = true;
    if(dealerScore>playerScore){
        playerWon = false;
        dealerWon = true;
        checkGameStatus();
    }
    while(dealerScore<=playerScore && dealerScore<=21 && playerScore<=21){
        dealerDeck.push(getNextCard());
        console.log(gameOver,playerWon,dealerWon);
        checkGameStatus();
        console.log("While loops");
    }
    console.log(gameOver,playerWon,dealerWon);
    if(gameOver && playerWon == false && dealerWon == false){
        if(playerScore > dealerScore){
            playerWon = true;
            dealerWon = false;
        }
        else{
            playerWon = false;
            dealerWon = true;
        }
        checkGameStatus();  
    }
    
});
//Surrender button fetched from DOM
let surrenderButton = document.getElementById('surrender');
surrenderButton.addEventListener('click',function(){
    gameOver = true;
    playerWon = false;
    checkGameStatus();
});
//Text area for player
let textAreaPlayer = document.getElementById('text-area-for-player');
//Text area for dealer
let textAreaDealer = document.getElementById('text-area-for-dealer');


//Responsible for Initialising Game Section
function playBlackJack(){
    for (let index = 0; index < alertBanners.length; index++) {
        alertBanners[index].style.display='none';       
    }
    gameSection.style.display = 'block';
    window.scrollTo(0,gameSectionYPosition);
    playInitButton.style.display = 'none';
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    initDeck(deck);
    shuffleCards(deck);
    playerDeck = [ getNextCard() , getNextCard() ];
    dealerDeck = [ getNextCard() , getNextCard() ];
    checkGameStatus();
}

//Important variable we will be using it through out our code
let playerDeck = [],
    dealerDeck = [],
    gameOver = false,
    playerScore = 0,
    dealerScore = 0,
    deck = [],
    playerWon = false,
    dealerWon = false,
    gameStarted = false;

let suits = ['Heart','Spade','Diamond','Club'];
let cards = ['King','Queen','Jack','Ace','10','9','8','7','6','5','4','3','2'];



//This function initializes the deck with 52 cards.
//Should be the very first step of GamePlay
//The Global Variable deck gets populated with 52 card 
//object with suit and value as attribute when initDeck is called
function initDeck(deck){
    for(let i=0;i<suits.length;i++){
        for(let j=0;j<cards.length;j++){
            let card = {
                suit : suits[i],
                value : cards[j]
            };
            deck.push(card);
        }
    }
    
}

//Use displayCardFromDeck whenever you want to display
//any card from any deck
function displayCardFromDeck(card){
    return card.value + " of " + card.suit;
}

//Displays card and score in DOM
function checkGameStatus(){
    //TODO the remaining tasks here!
    scoreCalculator(playerDeck,dealerDeck);

    if(playerScore>21){
        playerWon = false;
        dealerWon = true;
        gameOver = true;
    }
    else if(dealerScore>21){
        playerWon = true;
        dealerWon = false;
        gameOver = true;
    }

    displayInDOMTheScoreAndCards();
    //Check to see if game is over and who is the winner
    //Based on it change the page's layout
    if (gameOver){
        if(playerWon){
            alertBanners[0].style.display = 'block';
            gameSection.style.display = 'none';
            playInitButton.style.display = 'inline';
            let wonAnalysis = document.getElementById('won-analysis');
            wonAnalysis.innerHTML = "Your Score: "+ playerScore + " Dealer Score: "+ dealerScore;
        }
        else{
            alertBanners[1].style.display = 'block';
            gameSection.style.display = 'none';
            playInitButton.style.display = 'inline';
            let lostAnalysis = document.getElementById('lost-analysis');
            lostAnalysis.innerHTML = "Your Score: "+ playerScore + " Dealer Score: "+ dealerScore;
        }
    }
}

//Shuffles the deck
function shuffleCards(deck){
    for(let i=0;i<deck.length;i++){
        let swapIndex = Math.trunc(Math.random()*deck.length);
        let temp = deck[i];
        deck[i] = deck[swapIndex];
        deck[swapIndex] = temp;
    }
}

//Updates the score everytime
//Should later be optimised
function scoreCalculator(playerDeck,dealerDeck){
    playerScore=0;
    dealerScore=0;
    let hasAce = false;
   
    for(let i=0;i<playerDeck.length;i++){
        if(playerDeck[i] == 'Ace'){
            hasAce = true;
        }
        playerScore += scoreSwitch(playerDeck[i].value);
    }
    if(hasAce && playerScore+10<=21){
        playerScore+=10;
    }
    hasAce = false;
    for(let i=0;i<dealerDeck.length;i++){
        if(dealerDeck[i] == 'Ace'){
            hasAce = true;
        }
        dealerScore += scoreSwitch(dealerDeck[i].value);
    }
    if(hasAce && dealerScore+10<=21){
        dealerScore+=10;
    }
    
}

//Returns equivalent integer value from a stringified value
function scoreSwitch(value){
    
    let answer = null;
    switch(value){
        case '9' :
            return 9;
        case '8' :
            return 8;
        case '7' :
            return 7;
        case '6' :
            return 6;
        case '5' :
            return 5;
        case '4' :
            return 4;
        case '3' :
            return 3;
        case '2' :
            return 2;
        default : 
            return 10;
    }
}

//Assigns the card to dealer or player
function getNextCard(){
    return deck.shift();
}

function displayInDOMTheScoreAndCards(){
    let playerString = '';
    let dealerString = '';
    for(let i=0;i<playerDeck.length;i++){
        playerString += displayCardFromDeck(playerDeck[i]) + "\n";
    }
    for(let i=0;i<dealerDeck.length;i++){
        dealerString += displayCardFromDeck(dealerDeck[i]) + "\n";
    }

    textAreaDealer.innerText = dealerString + "Score: "+ dealerScore;
    textAreaPlayer.innerText = playerString + "Score: "+ playerScore;
}

