
let resetall=document.getElementById("resetall");
let table=document.getElementById("table");
let twoPlayerPage=document.getElementById("Two-player-game");
let scoreBoard=document.getElementById("score-board");
let p1Score=document.getElementById("player1-score");
let p2Score=document.getElementById("player2-score");

let p1,p2;
let turn=2;
let origBoard;
let winCombos=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];
let cnt=1;
const cell=document.querySelectorAll(".cell");
mainMenuTwoPlayer();

function call_table()
{
    
    scoreBoard.style.display="flex";
    twoPlayerPage.style.display="none";
    for(let i=0;i<cell.length;i++)
    {
    cell[i].innerHTML='';
    cell[i].style.removeProperty('background-color');
    }

    table.style.display="block";
    startGameTwoPlayer();
}


function mainMenuTwoPlayer()
{
    let cnt=1;

    let tac=document.getElementsByClassName("btnxo2");

    tac[0].addEventListener("click",function(){
        call_table();
        p1='X';
        p2='O';
       
    });

    tac[1].addEventListener('click',function(){
        call_table();
        p1='O';
        p2='X';

    });
}


//Reset the game Board
function resetTwoPlayer()
{

    
    let reset=document.getElementById("reset");
    reset.addEventListener('click',function(){
        for(let i=0;i<cell.length;i++)
        {
        cell[i].innerHTML='';
        cell[i].style.removeProperty("background-color");
        startGameTwoPlayer();
        }

    });
    }


    //This Function will start the game
    function startGameTwoPlayer()
    {
    document.getElementById("result").innerHTML='';
    document.getElementById("result-icon").style.display="none";
    document.getElementById("turn").innerHTML="Player "+turn+"'s turn";
    origBoard=Array.from(Array(9).keys);
    for(let i=0;i<cell.length;i++)
    {
    cell[i].innerHTML='';
    cell[i].style.removeProperty('background-color');
    cell[i].addEventListener('click',turnClickTwoPlayer,{once:true});

    }
    if(cnt==1)
    {
        resetTwoPlayer();
        cnt+=1;
    }


}
// Called when we click on a cell
function turnClickTwoPlayer(sqaure)
{
    turn=turn==1?2:1;
    p=turn==2?p1:p2;
    document.getElementById("turn").innerHTML="Player "+turn+"'s turn";

    pturnTwoPlayer(sqaure.target.id,p);
    }

function pturnTwoPlayer(sqaureId,p)
{
    origBoard[sqaureId]=p;
    document.getElementById(sqaureId).innerText=origBoard[sqaureId];
    let gameWon=checkWin(origBoard,p);
    if(gameWon)
    gameOverTwoPlayer(gameWon,p);
    else
    isDrawTwoPlayer(origBoard);
}

//Check the winning state of the Board
function checkWin(board,player)
{
    let plays = board.reduce((a, e, i) => 
    (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
    gameWon = {index: index, player: player};
    break;
    }
    }
    return gameWon;


}
//Called If anyPlayer has won the game
function gameOverTwoPlayer(gameWon,p) {
    if(p=="O")
    {
        let score=p1Score.innerHTML;
        score=parseInt(score);
        score+=1;
        p1Score.innerHTML=score;

    }
    else
    {
        let score=p2Score.innerHTML;
        score=parseInt(score);
        score+=1;
        p2Score.innerHTML=score;
    } 
    for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
        "red";
        let winPlayer= p==p1?"1":"2";
        document.getElementById("result").innerHTML="Hurray!! Player "+winPlayer+" Won";
        document.getElementById("result-icon").style.display="block";
        document.getElementById("turn").innerHTML='';
              
        
    }
    for (var i = 0; i < cell.length; i++) {
    cell[i].removeEventListener('click', turnClickTwoPlayer, false);
    resetTwoPlayer();
    }
}

//Check for the Draw
function isDrawTwoPlayer(board)
{
    let emptyCells=board.filter(e => e==p1 || e==p2);
    if(emptyCells.length==9)
    {
    document.getElementById("result").innerHTML="Draw :|";
    document.getElementById("turn").innerHTML='';
    resetTwoPlayer();
    return true;

    }

    return false;

}
    
   



   
   

