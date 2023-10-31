// DOM Manipulation, Render the Game // 

// Render Write Your Name // 
import { game } from "./game";
import { Gameboard, Player, Ship } from "./factories";

function writeName () {
    const main = document.getElementById('main');
    const box = document.createElement('div');
    const title = document.createElement('h3');
    const input = document.createElement('input');
    const play = document.createElement('button')

    box.classList.add('pop-up-box');
    title.classList.add('title-pop-up');
    input.classList.add('input-pop-up');
    play.classList.add('play-button');


    title.textContent = 'Write your Name';
    play.innerHTML = 'Battle';
    input.type = 'text';
    play.type = 'submit';

    box.appendChild(title);
    box.appendChild(input);
    box.appendChild(play);

    main.appendChild(box);

    play.addEventListener('click', () => {
        if (input.value) {
            clean();
            renderPlaceShips(input.value);
        }
            else alert('Please Write Your Name');
    });
}


function renderPlaceShips (name) {
    const main = document.getElementById('main');
    const mySection = document.createElement('div');
    const myGameSection = document.createElement('div');
    const myBoard = document.createElement('div');
    const myNameBox = document.createElement('div');
    const myName = document.createElement('h3');
    const axis = document.createElement('button');

    const ships = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];
    let sizes = [4,3,2,2,1];

    main.classList.add('main-game');
    mySection.classList.add('my-section');
    myGameSection.classList.add('my-game-section');
    myBoard.classList.add('my-board');
    myNameBox.classList.add('my-name-box');
    myName.classList.add('my-name');
    axis.classList.add('axis');

    let pos = 0;

    myName.textContent = `${name},  place your  ${ships[pos]}`;
    myName.dataset.size = pos;

    axis.innerHTML = 'Axis X';

    axis.addEventListener('click', () => {
        if (axis.innerHTML === 'Axis X') {
            axis.innerHTML = 'Axis Y';
        }
            else axis.innerHTML = 'Axis X';
        })

    let board = new Gameboard();

    board.createBoard();
   
    let player = new Player(board);
    
    for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          const coordinate = `${i},${j}`;
          const div = document.createElement('div');
          div.classList.add('my-div-box');
          div.id = `${coordinate}`;
          if (i === 7 || j === 7) {
            div.dataset.notAllowed = true;
          }

          div.addEventListener('mouseover', () => {
            let title = document.querySelector('.my-name');
            let name = title.textContent;
            let split = name.split(' ');
            let ship = split[split.length -1];
            let index = ships.indexOf(ship);
            let size = sizes[index];
            let axis = document.querySelector('.axis');
            let axisText = axis.textContent.split(' ')[1];

            let adjacents = board.getAdjacents(board, size, div.id);

            if (axisText === 'X') {
                if (adjacents[0].length < size) {
                    div.style.background = 'red';
                    div.style.cursor = 'not-allowed';
                } // fix bug when size is less //
                let has = false;
                if (div.dataset.notAllowed) {
                    div.style.background = 'red';
                    div.style.cursor = 'not-allowed'; 
                }
                if (board.hasShip(div.id)) {
                    div.style.background = 'red';
                    div.style.cursor = 'not-allowed'
                    has = true;
                }
                let adjWithShip = adjacents[0].some(x => board.hasShip(x));
                if (adjWithShip) {
                    adjacents[0].forEach(position => {
                            let ubi = document.getElementById(position);
                            div.style.background = 'red';
                            ubi.style.background = 'red';
                            div.style.cursor = 'not-allowed';
                    })
                }
                else {
                    adjacents[0].forEach(position => {
                            
    
                            if (has) {
                                let ubi = document.getElementById(position);
                                ubi.style.background = 'red';
                                div.style.cursor = 'not-allowed'; 
                            }
                                else {
                                    let ubi = document.getElementById(position);
                                    div.style.background = 'black';
                                    ubi.style.background = 'black';
                                    div.style.cursor = 'crosshair'; 
                                }
                    });
                }
            };

            if (axisText === 'Y') {
                let has = false;
                if (div.dataset.notAllowed) {
                    div.style.background = 'red';
                    div.style.cursor = 'not-allowed'; 
                }
                if (board.hasShip(div.id)) {
                    div.style.background = 'red';
                    div.style.cursor = 'not-allowed'
                    has = true;
                }
                adjacents[1].forEach(position => {
                    if (adjacents[1].length < size) {
                        div.style.background = 'red';
                        div.style.cursor = 'not-allowed'; 
                    }
                    if (has) {
                        let ubi = document.getElementById(position);
                        ubi.style.background = 'red';
                        div.style.cursor = 'not-allowed'; 
                    }
                        else {
                            let ubi = document.getElementById(position);
                            div.style.background = 'black';
                            ubi.style.background = 'black';
                            div.style.cursor = 'crosshair'; 
                        }
                });
            };

           

            // check if adjacents hasShip //
            // if so, click pointer cross, div background red // 

          });

          div.addEventListener('mouseleave', () => {
            let title = document.querySelector('.my-name');
            let name = title.textContent;
            let split = name.split(' ');
            let ship = split[split.length -1];
            let index = ships.indexOf(ship);
            let size = sizes[index];
            let axis = document.querySelector('.axis');
            let axisText = axis.textContent.split(' ')[1];

            let adjacents = board.getAdjacents(board, size, div.id);

            if (axisText === 'X') {
                if (div.dataset.notAllowed) {
                    div.style.background = 'lightgoldenrodyellow';
                    div.style.cursor = 'crosshair'; 
                }
                adjacents[0].forEach(position => {
                        let ubi = document.getElementById(position);
                        div.style.background = 'lightgoldenrodyellow';
                        ubi.style.background = 'lightgoldenrodyellow';
                });
            };

            if (axisText === 'Y') {
                if (div.dataset.notAllowed) {
                    div.style.background = 'lightgoldenrodyellow';
                    div.style.cursor = 'crosshair'; 
                }
                adjacents[1].forEach(position => {
                        let ubi = document.getElementById(position);
                        div.style.background = 'lightgoldenrodyellow';
                        ubi.style.background = 'lightgoldenrodyellow';
                });
            };
            // adjacents cancel hover //
          })

          div.addEventListener('click', () => {
           
            // if (place ship is those coordinates === true) {
                pos += 1;
                if (pos === ships.length) {
                        clean();
                        renderInitalBoards(name);
                }
                myName.textContent = `${name},  place your  ${ships[pos]}`;
            // }
            
            //render board // 
            // render text with name of ship // 
            // check if hasAllShipsPlaced // 
            // if so, render initial boards to play // 
          })
          myBoard.appendChild(div);
        };
    };
    

    myNameBox.appendChild(myName);
    myNameBox.appendChild(axis);
    myGameSection.appendChild(myBoard);
    mySection.appendChild(myNameBox);
    mySection.appendChild(myGameSection);
    
    board.placeShip(3, ['4,4', '5,4', '6,4']);
    console.log(board);
    renderMyBoard(board);
    main.appendChild(mySection);

    // IF ANY OF ADJACENTS HAS SHIP MARKED WITH RED AND CROSS // 
    

}

function renderInitalBoards (name) {
    const main = document.getElementById('main');

    const mySection = document.createElement('div');
    const myGameSection = document.createElement('div');
    const myBoard = document.createElement('div');
    const myNameBox = document.createElement('div');
    const myName = document.createElement('h3');
        
    const enemySection = document.createElement('div');
    const enemyGameSection = document.createElement('div');
    const enemyBoard = document.createElement('div');
    const enemyNameBox = document.createElement('div');
    const enemyName = document.createElement('h3');

    
    mySection.classList.add('my-section');
    myGameSection.classList.add('my-game-section');
    myBoard.classList.add('my-board');
    myNameBox.classList.add('my-name-box');
    myName.classList.add('my-name');
    
    enemySection.classList.add('enemy-section');
    enemyGameSection.classList.add('enemy-game-section');
    enemyBoard.classList.add('enemy-board');
    enemyNameBox.classList.add('enemy-name-box');
    enemyName.classList.add('enemy-name');


    for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          const coordinate = `${i},${j}`;
          const div = document.createElement('div');
          const divEnemy = document.createElement('div');
          div.classList.add('my-div-box');
          divEnemy.classList.add('enemy-div-box');

          div.id = `P ${coordinate}`;
          divEnemy.id = `E ${coordinate}`;
  
          myBoard.appendChild(div);
          enemyBoard.appendChild(divEnemy);
        }
    }

    myName.textContent = name;
    enemyName.textContent = 'Enemy';

    myNameBox.appendChild(myName);
    myGameSection.appendChild(myBoard);
    mySection.appendChild(myNameBox);
    mySection.appendChild(myGameSection);
    
    enemyNameBox.appendChild(enemyName);
    enemyGameSection.appendChild(enemyBoard);
    enemySection.appendChild(enemyNameBox);
    enemySection.appendChild(enemyGameSection);

    main.appendChild(mySection);
    main.appendChild(enemySection);

    main.classList.add('main-game');
}

function renderMyBoard (board) {
    const boxes = document.querySelectorAll('.my-div-box');

    for (const box of boxes) {
        let coordinates = box.id;
         
        
        if (board.board[coordinates].hasShip) {
            box.style.background = 'green';
        }
        if (board.board[coordinates].attacked) {
            box.innerHTML = '❌';
            box.style.background = '#F5C2C1';
        }
        if (board.board[coordinates].missed) {
            box.innerHTML = '💦';
            box.style.background = 'lightblue';
        }
    }
}

function renderEnemyBoard (board) {
    const boxes = document.querySelectorAll('.enemy-div-box');

    for (const box of boxes) {
        let coordinates = box.id;
        let split = coordinates.split(' ');
        let num = split[1]; 
        
        if (board.board[num].hasShip) {
            box.style.background = 'orange';
        }
        if (board.board[num].attacked) {
            box.innerHTML = '❌';
            box.style.background = '#F5C2C1';
        }
        if (board.board[num].missed) {
            box.innerHTML = '💦';
            box.style.background = 'lightblue';
        }
        if (board.board[num].hasShip) {
            box.innerHTML = '🚢';
            box.style.background = 'lightblue';
        }
    }
}





function renderWin () {
    const main = document.getElementById('main');
    const box = document.createElement('div');
    const title = document.createElement('h3'); 
    const play = document.createElement('button')

    box.classList.add('pop-up-box');
    title.classList.add('title-pop-up');
    play.classList.add('play-button');

    title.textContent = 'You Win';
    play.innerHTML = 'Play Again';
    play.type = 'submit';

    box.appendChild(title);
    box.appendChild(play);

    main.appendChild(box);

    play.addEventListener('click', () => {
        clean();
        writeName();
    });
}

function renderLose () {
    const main = document.getElementById('main');
    const box = document.createElement('div');
    const title = document.createElement('h3'); 
    const play = document.createElement('button')

    box.classList.add('pop-up-box');
    title.classList.add('title-pop-up');
    play.classList.add('play-button');

    title.textContent = 'You Lose';
    play.innerHTML = 'Play Again';
    play.type = 'submit';

    box.appendChild(title);
    box.appendChild(play);

    main.appendChild(box);

    play.addEventListener('click', () => {
        clean();
        writeName();
    });
}

function clean () {
    const main = document.getElementById('main');
    main.innerHTML = '';
}


export {writeName, clean, renderInitalBoards, renderMyBoard, renderEnemyBoard, renderWin, renderLose};
