import { Gameboard, Player } from "./factories";
import { renderMyBoard, renderEnemyBoard, clean, renderWin, renderLose } from "./render";


function game (board) {
    let enemyBoard = new Gameboard();
    let myBoard = board;
    let player = new Player(myBoard);

    enemyBoard.createBoard();
    let enemy = new Player(enemyBoard);

    enemyBoard.placeEnemyShips(enemyBoard);

    renderMyBoard(board);
    renderEnemyBoard(enemyBoard);

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

export {game};