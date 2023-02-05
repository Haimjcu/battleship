let playerStatus = {
    'DE':2,
    'CR':3,
    'SU':3,
    'BA':4,
    'CA':5,
    'total':5
}

let computerStatus = {
    'DE':2,
    'CR':3,
    'SU':3,
    'BA':4,
    'CA':5,
    'total':5
}

const resetStatus = {
    'DE':2,
    'CR':3,
    'SU':3,
    'BA':4,
    'CA':5,
    'total':5
}

const shipCodes = {
    'DE':2,
    'CR':3,
    'SU':3,
    'BA':4,
    'CA':5
}

const shipXlate = {
    'DE':'Destroyer',
    'CR':'Cruiser',
    'SU':'Submarine',
    'BA':'Battleship',
    'CA':'Carrier'
}

const startGameBtn=document.getElementById("startgamebtn");
const playAgainBtn=document.getElementById("playagainbtn");
const playerShips=document.getElementById("playerships");
const destroyer=document.getElementById("destroyer");
const submarine=document.getElementById("submarine");
const cruiser=document.getElementById("cruiser");
const battleship=document.getElementById("battleship");
const carrier=document.getElementById("carrier");
const playerGrids=document.querySelectorAll(".player > div");
const computerGrids=document.querySelectorAll(".computer > div");
const begins=document.querySelectorAll(".begin");
const computerMsg=document.getElementById("computerMsg");
const playerMsg=document.getElementById("playerMsg");
const gameOver=document.getElementById("gameover");

let boxId="";
let shipSize=0;
let placementClicks=0;
let i=9;
let ii=9;
let shipsPlaced=0;
let rowStart=0;
let colStart=0;
let rowdirection=0;
let coldirection=0;
let gridLocText="";
let gridLoc="";
let guessLoop=false;
let statusBoxPp="";
let statusBoxP="";
let statusBoxCc="";
let statusBoxC="";
let whoseTurn="computer";



startGameBtn.addEventListener("click", (event) => {
    startGameBtn.style.display="none";
    playerShips.style.display="block";
})

playAgainBtn.addEventListener("click", (event) => {
    playAgainBtn.style.display="none";
    destroyer.style.color="white";
    destroyer.style.backgroundColor="black";
    destroyer.style.borderColor="white";
    destroyer.style.display="block";
    submarine.style.color="white";
    submarine.style.backgroundColor="black";
    submarine.style.borderColor="white";
    submarine.style.display="block";
    cruiser.style.color="white";
    cruiser.style.backgroundColor="black";
    cruiser.style.borderColor="white";
    cruiser.style.display="block";
    battleship.style.color="white";
    battleship.style.backgroundColor="black";
    battleship.style.borderColor="white";
    battleship.style.display="block";
    carrier.style.color="white";
    carrier.style.backgroundColor="black";
    carrier.style.borderColor="white";
    carrier.style.display="block";
    playerShips.style.display="block";
    playerStatus=resetStatus;
    computerStatus=resetStatus;
    for(r=1; r<6; r++) {
        statusBoxPp="statusBoxP"+r;
        statusBoxP=document.getElementById(statusBoxPp);
        statusBoxP.style.backgroundColor="white";
        statusBoxCc="statusBoxC"+r;
        statusBoxC=document.getElementById(statusBoxCc);
        statusBoxC.style.backgroundColor="blue";
    }
    for (playerGrid of playerGrids) {
        if(!playerGrid.classList.contains("gridTitle") && !playerGrid.classList.contains("header")) {
            playerGrid.style.backgroundColor="lightgrey";
            playerGrid.innerHTML="";
            playerGrid.style.color="lightgrey";
            playerGrid.setAttribute('data-guessed','0');
            playerGrid.setAttribute('data-ship','');
        }
    }
    for (computerGrid of computerGrids) {
        if(!computerGrid.classList.contains("gridTitle") && !computerGrid.classList.contains("header")) {
            computerGrid.style.backgroundColor="lightgrey";
            computerGrid.innerHTML="";
            computerGrid.style.color="lightgrey";
            computerGrid.setAttribute('data-guessed','0');
            computerGrid.setAttribute('data-ship','');
        }
    }
    shipsPlaced=0;
    for (const shipCode in shipCodes) {
        computerPlaceShips(shipCode);    
    }
    gameOver.style.display="none";
})

destroyer.addEventListener("click", (event) => {
    destroyer.style.color="black";
    destroyer.style.backgroundColor="white";
    destroyer.style.borderColor="black";
    boxId="DE";
    shipSize=2;
    placementClicks=0;
})

submarine.addEventListener("click", (event) => {
    submarine.style.color="black";
    submarine.style.backgroundColor="white";
    submarine.style.borderColor="black";
    boxId="SU";
    shipSize=3;
    placementClicks=0;
})

cruiser.addEventListener("click", (event) => {
    cruiser.style.color="black";
    cruiser.style.backgroundColor="white";
    cruiser.style.borderColor="black";
    boxId="CR";
    shipSize=3;
    placementClicks=0;
})

battleship.addEventListener("click", (event) => {
    battleship.style.color="black";
    battleship.style.backgroundColor="white";
    battleship.style.borderColor="black";
    boxId="BA";
    shipSize=4;
    placementClicks=0;
})

carrier.addEventListener("click", (event) => {
    carrier.style.color="black";
    carrier.style.backgroundColor="white";
    carrier.style.borderColor="black";
    boxId="CA";
    shipSize=5;
    placementClicks=0;
})

// player place ships on board
for (playerGrid of playerGrids) {
    if(!playerGrid.classList.contains("gridTitle") && !playerGrid.classList.contains("header")) {
        i++;
        playerGrid.setAttribute("id","player"+i);
        playerGrid.setAttribute('data-guessed','0');
        playerGrid.setAttribute('data-ship','');
    }
    playerGrid.addEventListener("click", (event) => {
       if(!event.target.classList.contains("gridTitle") && !event.target.classList.contains("header") && boxId!="") {
        event.target.style.backgroundColor="blue";
        event.target.innerHTML=boxId;
        event.target.setAttribute('data-ship',boxId); 
        placementClicks++;
        if(placementClicks==shipSize) { shipPlaced() }
       }
    });
}

function shipPlaced() {
    switch (boxId) {
        case "DE": 
            destroyer.style.display="none";
            break;
        case "SU": 
            submarine.style.display="none";
            break;
        case "CR": 
            cruiser.style.display="none";
            break;
        case "BA": 
            battleship.style.display="none";
            break;
        case "CA": 
            carrier.style.display="none";
            break;
    }
    shipsPlaced++;
    /* alert("Ship Placed"); */
    statusBoxPp="statusBoxP"+shipsPlaced;
    statusBoxP=document.getElementById(statusBoxPp);
    statusBoxP.style.backgroundColor="blue";
    boxId="";
    if(shipsPlaced==5) {
        whoseTurn="player";
        playerShips.style.display="none";
        for (begin of begins) {
            begin.style.display="block";
        }
    }
}

// player guess
for (computerGrid of computerGrids) {
    if(!computerGrid.classList.contains("gridTitle") && !computerGrid.classList.contains("header")) {
        ii++;
        computerGrid.setAttribute("id","computer"+ii);
        computerGrid.setAttribute('data-ship','');
        computerGrid.setAttribute('data-guessed','1');
    }
    computerGrid.addEventListener("click", (event) => {
       if(!event.target.classList.contains("gridTitle") && whoseTurn=="player") {
        event.target.setAttribute('data-guessed','1');
        playerMsg.innerHTML=(`Guess: ${translateGuess(event.target.id)}`);
        
            if(event.target.getAttribute("data-ship")!="") {
                event.target.style.backgroundColor="red";
                event.target.style.color="red";
                computerMsg.innerHTML=('HIT');
                computerStatus[event.target.getAttribute("data-ship")]=computerStatus[event.target.getAttribute("data-ship")]-1;
                if(computerStatus[event.target.getAttribute("data-ship")]==0) {
                    statusBoxCc="statusBoxC"+computerStatus["total"];
                    statusBoxC=document.getElementById(statusBoxCc);
                    statusBoxC.style.backgroundColor="red";
                    computerStatus["total"]=computerStatus["total"]-1;
                    computerMsg.innerHTML=(`You sunk my: ${shipXlate[event.target.getAttribute("data-ship")]}`);
                }
            }
            else {
                event.target.style.backgroundColor="white";
                computerMsg.innerHTML=('MISS');  
            }

            if(computerStatus["total"]==0) {
                for (begin of begins) {
                    begin.style.display="none";
                }
                playAgainBtn.style.display="block";
                gameOver.innerHTML="Game Over. You Won!!!!";
                gameOver.style.color="blue";
                gameOver.style.display="block";
            }
            else {
                setTimeout(computerGuess,1000);
            }
            whoseTurn="computerr";
        }

    });
}

// place the computers ships on the grid
for (const shipCode in shipCodes) {
    computerPlaceShips(shipCode);    
}

function computerPlaceShips(shipCode) {
    let shipLength=parseInt(shipCodes[shipCode]);

    switch (shipCode) {
        case "DE":
            rowStart=Math.floor(Math.random() * 2)+1;
            colStart=Math.floor(Math.random() * 2); 
        break;
    case "SU": 
            rowStart=Math.floor(Math.random() * 2)+2;
            colStart=Math.floor(Math.random() * 3)+7;
        break;
    case "CR": 
            rowStart=Math.floor(Math.random() * 2)+3;
            colStart=Math.floor(Math.random() * 3)+1;
        break;
    case "BA": 
            rowStart=Math.floor(Math.random() * 2)+5;
            colStart=Math.floor(Math.random() * 2);
        break;
    case "CA": 
            rowStart=Math.floor(Math.random() * 2)+9;
            colStart=Math.floor(Math.random() * 2)+4;
        break;
    }

    for (x=0; x<shipLength; x++) {
        gridLocText='computer'+rowStart+colStart;
        gridLoc=document.getElementById(gridLocText);
        gridLoc.style.color="lightgrey";
        gridLoc.innerHTML=shipCode;
        gridLoc.setAttribute('data-ship',shipCode);

        switch (shipCode) {
            case "DE":
                colStart++; 
            break;
        case "SU": 
                rowStart++; 
            break;
        case "CR": 
                colStart++;
            break;
        case "BA": 
                rowStart++;
            break;
        case "CA": 
                colStart++;
            break;
        }
    }
}

// Computer guess
function computerGuess() {
    guessLoop=false;
    while(guessLoop===false) {
        rowStart=Math.floor(Math.random() * 10)+1;
        colStart=Math.floor(Math.random() * 10);
        gridLocText='player'+rowStart+colStart;
        gridLoc=document.getElementById(gridLocText);

        if(gridLoc.getAttribute("data-guessed")=="1" ) {continue;}
        gridLoc.setAttribute('data-guessed','1');       
        computerMsg.innerHTML=(`Guess: ${translateGuess(gridLocText)}`);

       /* if(gridLoc.innerHTML=="") { */
        if(gridLoc.getAttribute("data-ship")!="") {
            gridLoc.style.backgroundColor="red";
            playerMsg.innerHTML=('HIT'); 
            playerStatus[gridLoc.getAttribute("data-ship")]=playerStatus[gridLoc.getAttribute("data-ship")]-1;
            if(playerStatus[gridLoc.getAttribute("data-ship")]==0) {
                statusBoxPp="statusBoxP"+playerStatus["total"];
                statusBoxP=document.getElementById(statusBoxPp);
                statusBoxP.style.backgroundColor="red";
                playerStatus["total"]=playerStatus["total"]-1;
                playerMsg.innerHTML=(`You sunk my: ${shipXlate[gridLoc.getAttribute("data-ship")]}`);
            }
        }
        else {
            gridLoc.style.backgroundColor="white"; 
            gridLoc.style.color="blue";
            playerMsg.innerHTML=('MISS');  
        }
    
        if(playerStatus["total"]==0) {
            for (begin of begins) {
                begin.style.display="none";
            }
            gameOver.innerHTML="Game Over. You Lost (:";
            gameOver.style.color="red";
            gameOver.style.display="block";
            playAgainBtn.style.display="block";
        }
        guessLoop=true;
        break;
   }
   whoseTurn="player";

}

function translateGuess(guess) {
    let guessColumn=guess.slice(-1);
    switch (guessColumn) {
        case '0':
            guessColumn='A';
            break;
        case '1':
            guessColumn='B';
            break; 
        case '2':
            guessColumn='C';
            break; 
        case '3':
            guessColumn='D';
            break; 
        case '4':
            guessColumn='E';
            break;
        case '5':
            guessColumn='F';
            break;
        case '6':
            guessColumn='G';
            break; 
        case '7':
            guessColumn='H';
            break; 
        case '8':
            guessColumn='I';
            break; 
        case '9':
            guessColumn='J';
            break;  
    }
    let guessRow=guess.charAt(guess.length-2);
    if(guessRow=='0') {guessRow='10';}
    let guessTranslated=guessColumn+guessRow;

    return guessTranslated;
}