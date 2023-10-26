import { Ship, Gameboard, Player } from "./factories";
import { writeName, renderInitalBoards, renderMyBoard, renderEnemyBoard,  clean, renderWin, renderLose } from "./render";


function game () {
    let myBoard = new Gameboard();
    let enemyBoard = new Gameboard();
    
    myBoard.createBoard();
    myBoard.placeShip(5, ['1,1','1,2','1,3', '1,4', '1,5']);
    myBoard.placeShip(4, ['4,4','4,5','4,6', '4,7']);
    myBoard.placeShip(3, ['7,1','7,2','7,3']);
    myBoard.placeShip(3, ['0,1','0,2','0,3']);
    myBoard.placeShip(2, ['5,1','5,2']);
    
    enemyBoard.createBoard();
    enemyBoard.placeShip(5, ['1,1','1,2','1,3', '1,4', '1,5']);
    enemyBoard.placeShip(4, ['4,4','4,5','4,6', '4,7']);
    enemyBoard.placeShip(3, ['7,1','7,2','7,3']);
    enemyBoard.placeShip(3, ['0,1','0,2','0,3']);
    enemyBoard.placeShip(2, ['5,1','5,2']);
    
    let player = new Player(myBoard);
    let enemy = new Player(enemyBoard);

    myBoard.receiveAttack('0,1');
    myBoard.receiveAttack('0,0');
    enemyBoard.receiveAttack('4,4');
    renderMyBoard(player.gameboard);
    renderEnemyBoard(enemy.gameboard);

    const myBoxes = document.querySelectorAll('.my-div-box');
    let pBoxes = [...myBoxes];

    pBoxes.forEach(pBox => {
        pBox.addEventListener('click', (e) => {
            let pCoordinates = e.target.id;
            let pSplit = pCoordinates.split(' ');
            let pNum = pSplit[1]; 

            myBoard.receiveAttack(pNum);
            renderMyBoard(player.gameboard);
            
            // Fix bug click enemy board spread the click to my board // 
        });
    });

    const enemyBoxes = document.querySelectorAll('.enemy-div-box');
    let eBoxes = [...enemyBoxes];

    eBoxes.forEach(eBox => {
        eBox.addEventListener('click', (e) => {
            let eCoordinates = e.target.id;
            let eSplit = eCoordinates.split(' ');
            let eNum = eSplit[1]; 

            enemyBoard.receiveAttack(eNum);
            renderMyBoard(enemy.gameboard);
        });
    });
}





// 1. Create the main game loop and a module for DOM interaction.
//      a. At this point it is appropriate to begin crafting your User Interface.
//      b. The game loop should set up a new game by creating Players and Gameboards. For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.
//      c. We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class/factory.
//          a. You need methods to render the gameboards and to take user input for attacking. For attacks, let the user click on a coordinate in the enemy Gameboard.
//      d. The game loop should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.
//      e. Create conditions so that the game ends once one player’s ships have all been sunk. This function is appropriate for the Game module.


// 2. Finish it up
//      a. There are several options available for letting users place their ships. You can let them type coordinates for each ship, or investigate implementing drag and drop.
//      b. You can polish the intelligence of the computer player by having it try adjacent slots after getting a ‘hit’.
//      c. Optionally, create a 2 player option that lets users take turns by passing the device back and forth. If you’re going to go this route, make sure the game is playable on a mobile screen and implement a ‘pass device’ screen so that players don’t see each others boards!
 

//  The 5 ships are: Carrier (occupies 5 spaces), Battleship (4), Cruiser (3), Submarine (3), and Destroyer (2). //



export {game};