/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, dice2,currentRoll,currentRoll2, activeGame;

var $ = function(theClass){
    return document.querySelector(theClass);
};

function init(){
    activeGame = true;
    scores=[0,0];
    roundScore = 0;
    activePlayer = 0;
    dice = 0;
    $('#current-0').innerHTML = 0;
    $('#current-1').innerHTML = 0;
    $('#score-0').innerHTML = 0;
    $('#score-1').innerHTML = 0;
    $('.player-'+1+'-panel').classList.remove('active');
    $('.player-'+activePlayer+'-panel').classList.add('active');
    console.log('>>>INSIDE INIT: END, activePlayer='+activePlayer+'<<<');
}

function winner(activePlayer, score){
    score >= 100?$('#score-'+activePlayer).innerHTML=''+'WINNER! WINNER! CHICKEN DINNER!':$('#score-'+activePlayer).innerHTML=''+score;   
    if(score >= 100){ 
        //$('#score-'+activePlayer).style.fontSize='250%'; 
        activeGame = false;
    }
}

function collectScore(){
    var collectedScore = $('#collect').value;
    console.log('CollectedScore: '+collectedScore);
    if(activeGame && !isNaN(collectedScore)){
        activePlayer === 1?scores[1]+=Number(collectedScore):scores[0]+=Number(collectedScore);
        activePlayer === 1?winner(activePlayer,scores[1]):winner(activePlayer,scores[0]);
        console.log('>>>INSIDE collectScore: activePlayer='+activePlayer+' '+'<<<');
        $('#collect').value='';
    }else{
        $('#collect').value='';
    }
}

init();

$('.btn-roll').addEventListener('click', () => {
                    if(activeGame){
                                dice = Math.ceil(Math.random()*6);
                                dice2 = Math.ceil(Math.random()*6);
                                console.log('Dice1: '+dice);
                                console.log('Dice2: '+dice2);
                                $('#dice-1').src = 'dice-'+dice+'.png';
                                $('#dice-2').src = 'dice-'+dice2+'.png';
                                if(dice === 1 || dice2 === 1){
                                    roundScore = 0;
                                    $('#current-'+activePlayer).innerHTML = roundScore;
                                    $('.player-'+activePlayer+'-panel').classList.remove('active');
                                    activePlayer === 1?activePlayer = 0:activePlayer = 1;
                                    $('.player-'+activePlayer+'-panel').classList.add('active');
                                }else if((currentRoll!== undefined && currentRoll === dice && dice === 6)||
                                         (currentRoll2!== undefined && currentRoll2 === dice2 && dice2 === 6)){
                                    roundScore = 0;
                                    $('#current-'+activePlayer).innerHTML = roundScore;
                                    $('.player-'+activePlayer+'-panel').classList.remove('active');
                                    activePlayer === 1? scores[1]=0:scores[0]=0;
                                    activePlayer === 1?activePlayer = 0:activePlayer = 1;
                                    $('.player-'+activePlayer+'-panel').classList.add('active');
                                }else{
                                    currentRoll = dice;
                                    roundScore+=(dice2+dice);
                                    $('#current-'+activePlayer).innerHTML = roundScore;     
                                }
                                currentRoll = dice;
                                currentRoll2 = dice2;
                    }
                });

$('.btn-hold').addEventListener('click', () => {
    if(activeGame){
            if(activePlayer === 1){      
                scores[1]+=roundScore;
                winner(activePlayer,scores[1]);
                roundScore = 0;
                $('#current-'+activePlayer).innerHTML = 0;
                $('.player-'+activePlayer+'-panel').classList.remove('active');
                //$('.player-'+activePlayer+'-panel').classList.toggle('active');
                activePlayer = 0;    
                 $('.player-'+activePlayer+'-panel').classList.add('active');
                ////$('.player-'+activePlayer+'-panel').classList.toggle('active');
            }else{
                scores[0]+=roundScore;
                winner(activePlayer,scores[0]);
                roundScore = 0;
                 $('.player-'+activePlayer+'-panel').classList.remove('active');
                //$('.player-'+activePlayer+'-panel').classList.toggle('active');
                $('#current-'+activePlayer).innerHTML = 0;
                activePlayer = 1;
                $('.player-'+activePlayer+'-panel').classList.add('active');
                //$('.player-'+activePlayer+'-panel').classList.toggle('active');
            } 
    }
});

$('.btn-new').addEventListener('click', () => {
    console.log('NEW GAMES has been pushed!');
   init();
});

/*
############################################

var $2 = function(id){
    return document.getElementById(id);
}


$('#current-'+activePlayer).textContent = dice;
document.querySelector('#score-0').textContent = dice;
$('.dice').style.display='none';
*/