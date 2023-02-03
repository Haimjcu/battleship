const playerStatus = {
    'DE':2,
    'CR':3,
    'SU':3,
    'BA':4,
    'CA':5,
    'total':5
}

const computerStatus = {
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
const forceGuessBtn=document.getElementById("forceGuess");
const playerShips=document.getElementById("playerships");
const destroyer=document.getElementById("destroyer");
const submarine=document.getElementById("submarine");
const cruiser=document.getElementById("cruiser");
const battleship=document.getElementById("battleship");
const carrier=document.getElementById("carrier");
const playerGrids=document.querySelectorAll(".player > div");
const computerGrids=document.querySelectorAll(".computer > div");
const begin=document.getElementById("begin");
const computerMsg=document.getElementById("computerMsg");
const playerMsg=document.getElementById("playerMsg");

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



startGameBtn.addEventListener("click", (event) => {
    startGameBtn.style.display="none";
    playerShips.style.display="block";
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
    if(!playerGrid.classList.contains("gridTitle")) {
        i++;
        playerGrid.setAttribute("id","player"+i);
        playerGrid.setAttribute('data-guessed','0');
        playerGrid.setAttribute('data-ship','');
    }
    playerGrid.addEventListener("click", (event) => {
       if(!event.target.classList.contains("gridTitle")) {
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
    alert("Ship Placed");
    if(shipsPlaced==5) {
        begin.style.display="block";
        forceGuessBtn.style.display="block";
    }
}

// player guess
for (computerGrid of computerGrids) {
    if(!computerGrid.classList.contains("gridTitle")) {
        ii++;
        computerGrid.setAttribute("id","computer"+ii);
        computerGrid.setAttribute('data-ship','');
        computerGrid.setAttribute('data-guessed','1');
    }
    computerGrid.addEventListener("click", (event) => {
       if(!event.target.classList.contains("gridTitle")) {
        event.target.setAttribute('data-guessed','1');
        playerMsg.innerHTML=(`Guess: ${translateGuess(event.target.id)}`);
            if(event.target.innerHTML=="") {
                event.target.style.backgroundColor="white";  
            }
            else {
                event.target.style.backgroundColor="red";
                event.target.style.color="red";
                computerStatus[event.target.innerHTML]=computerStatus[event.target.innerHTML]-1;
                if(computerStatus[event.target.innerHTML]==0) {
                    computerStatus["total"]=computerStatus["total"]-1;
                }
            }
        }
        if(computerStatus["total"]==0) {alert('Game Over. You Won!!!!')}
    });
}

// place the computers ships on the grid
for (const shipCode in shipCodes) {
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
forceGuessBtn.addEventListener("click", (event) => {
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
            playerStatus[gridLoc.innerHTML]=playerStatus[gridLoc.innerHTML]-1;
            if(playerStatus[gridLoc.innerHTML]==0) {
                playerStatus["total"]=playerStatus["total"]-1;
            }
        }
        else {
            gridLoc.style.backgroundColor="white"; 
            gridLoc.style.color="blue"; 
        }
    
        if(playerStatus["total"]==0) {alert('Game Over. You Lost (:')}
        guessLoop=true;
        break;
   }

})

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