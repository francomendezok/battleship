import { Ship, Gameboard, Player } from "./factories";
import { writeName, renderInitalBoards, renderMyBoard, renderEnemyBoard,  clean, renderWin, renderLose, selectShips, addBoxesListener } from "./render";


function game (name) {
    let myBoard = new Gameboard();
    let enemyBoard = new Gameboard();
    
    myBoard.createBoard();
    enemyBoard.createBoard();

    renderInitalBoards(name);
    selectShips(myBoard);
    
    
    
    let player = new Player(myBoard);
    let enemy = new Player(enemyBoard);

    renderMyBoard(player.gameboard);
    renderEnemyBoard(enemy.gameboard);

    const enemyBoxes = document.querySelectorAll('.enemy-div-box');
    let eBoxes = [...enemyBoxes];

    eBoxes.forEach(eBox => {
        eBox.addEventListener('click', (e) => {
            let eCoordinates = e.target.id;
            let eSplit = eCoordinates.split(' ');
            let eNum = eSplit[1]; 

            let enemyMove = enemy.makeRandomMove();
            let enemyAttack = myBoard.receiveAttack(enemyMove);
            let attack = enemyBoard.receiveAttack(eNum);

            if (attack) {
                renderEnemyBoard(enemy.gameboard);
                setTimeout(function() {
                    while (!enemyAttack) {
                        enemyMove = enemy.makeRandomMove();
                        enemyAttack = myBoard.receiveAttack(enemyMove);
                    }
                    renderMyBoard(player.gameboard);
                  }, 1000); 
                  
    
                let mySunk = myBoard.allSunk();
                let enemySunk = enemyBoard.allSunk();
    
                if (mySunk) {
                    clean();
                    renderLose();
                };
                if (enemySunk) {
                    clean();
                    renderWin();
                };
            }

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