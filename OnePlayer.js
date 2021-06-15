
let table=document.getElementById("table");
let option=document.getElementById("one-player-option");

let yes=document.getElementById('yes-btn');
let no=document.getElementById('no-btn');
let huPlayerFirst;

let onePlayerPage=document.getElementById("One-player-game");
let scoreBoard=document.getElementById("score-board");
let cScore=document.getElementById("comp-score");
let pScore=document.getElementById("player-score");


mainMenuOnePlayer();

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
let huPlayer,aiPlayer;





function emptyCells()
{
   
    return origBoard.filter(e => typeof e == 'number');
}





function call_table()
{
    scoreBoard.style.display="flex";
    onePlayerPage.style.display="none";
     for(let i=0;i<cell.length;i++)
     {
     cell[i].innerHTML='';
     cell[i].style.removeProperty('background-color');
     }
 
     table.style.display="block";
     startGameOnePlayer();
}


function mainMenuOnePlayer()
{
    let tac=document.getElementsByClassName("btnxo1");

    tac[0].addEventListener("click",function(){
        huPlayer='X';
        aiPlayer='O';
        call_table();
    });

    tac[1].addEventListener('click',function(){
        huPlayer='O';
        aiPlayer='X';
        call_table();
    });
}

function resetOnePlayer()
{
   
    let resetOnePlayer=document.getElementById("reset");
    resetOnePlayer.style.display="block";
    //document.getElementById("result").innerText='';
    resetOnePlayer.addEventListener('click',function(){
        for(let i=0;i<cell.length;i++)
        {
            
        cell[i].innerHTML='';
        cell[i].style.removeProperty("background-color");
        startGameOnePlayer();
        }

    });

}


function startGameOnePlayer()
{
    document.getElementById("result-icon").style.display="none";
    document.getElementById("result").innerHTML='';
    origBoard = Array.from(Array(9).keys());
    for(let i=0;i<cell.length;i++)
    {
    cell[i].innerHTML='';
    cell[i].style.removeProperty('background-color');
    cell[i].addEventListener('click',turnClickOnePlayer,{once:true});
    }
    if(cnt==1)
    {
        resetOnePlayer();
        cnt+=1;
    }


}

function turnClickOnePlayer(sqaure)
{
    
    turnOnePlayer(sqaure.target.id,huPlayer);
    
    if(!checkWin(origBoard,huPlayer) && !isDrawOnePlayer(origBoard))
    {
        turnOnePlayer(bestSpot(sqaure.target.id),aiPlayer);

    }
}

function turnOnePlayer(sqaureId,player)
{
    origBoard[sqaureId]=player;
    cell[sqaureId].removeEventListener('click',turnClickOnePlayer,false);
    document.getElementById(sqaureId).innerText=player;
    let gameWon=checkWin(origBoard,player);
    if(gameWon) gameOverOnePlayer(gameWon,player);
    else isDrawOnePlayer(origBoard);

}

function bestSpot(id)
{
    cell[id].removeEventListener('click',turnClickOnePlayer,false);
    return miniMax(origBoard,aiPlayer).index;
}

function miniMax(newBoard,player)
{
    let availSpots = emptyCells();
    //console.log(availSpots);

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (let i = 0; i < availSpots.length; i++) {
		let move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			let result = miniMax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			let result = miniMax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	let bestMove;
	if(player === aiPlayer) {
		let bestScore = -10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		 let bestScore = 10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}

function gameOverOnePlayer(gameWon,player)
{
    if(player==aiPlayer)
    {
        let score=cScore.innerHTML;
        score=parseInt(score);
        score+=1;
        cScore.innerHTML=score;

    }
    else
    {
        let score=pScore.innerHTML;
        score=parseInt(score);
        score+=1;
        pScore.innerHTML=score;
    } 
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            "red";
            let winPlayer= player==aiPlayer?"Uh! You lost":"Hurray You Won ;)";
            document.getElementById("result").innerHTML=winPlayer;
            document.getElementById("result-icon").style.display="block";
            
        }
        for (var i = 0; i < cell.length; i++) {
        cell[i].removeEventListener('click', turnClickOnePlayer, false);
        resetOnePlayer();
        }

}



function isDrawOnePlayer(board)
{
    let emptyCells=board.filter(e => e==huPlayer || e==aiPlayer);
    //console.log(emptyCells);
    if(emptyCells.length==9)
    {
    document.getElementById("result").innerHTML="Draw :|";
    resetOnePlayer();
    return true;

    }

    return false;

}

function checkWin(board,player)
{
    let plays = board.reduce((a, e, i) => 
    (e === player) ? a.concat(i) : a, []);
    //console.log(plays);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
    gameWon = {index: index, player: player};
    break;
    }
    }
    return gameWon;


}
