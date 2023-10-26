// DOM Manipulation, Render the Game // 

// Render Write Your Name // 
import { game } from "./game";

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
        clean();
        game(input.value);
    });
}

function renderInitalBoards (name) {
    const main = document.getElementById('main');

    const mySection = document.createElement('div');
    const myGameSection = document.createElement('div');
    const myBoard = document.createElement('div');
    const myNameBox = document.createElement('div');
    const myName = document.createElement('h3');
    
    const shipsContainer = document.createElement('div');
    
    const enemySection = document.createElement('div');
    const enemyGameSection = document.createElement('div');
    const enemyBoard = document.createElement('div');
    const enemyNameBox = document.createElement('div');
    const enemyName = document.createElement('h3');

    const carrier = document.createElement('img');
    const battleship = document.createElement('img');
    const cruiser = document.createElement('img');
    const submarine = document.createElement('img');
    const destroyer = document.createElement('img');

    carrier.src = '../dist/Images/5.png';
    battleship.src = '../dist/Images/5.png';
    cruiser.src = '../dist/Images/5.png';
    submarine.src = '../dist/Images/5.png';
    destroyer.src = '../dist/Images/5.png';


    const ships = [carrier, battleship, cruiser, submarine, destroyer];


    ships.forEach(ship => {
        ship.classList.add('ship');
        shipsContainer.appendChild(ship);
    });
    
    
    
    mySection.classList.add('my-section');
    myGameSection.classList.add('my-game-section');
    myBoard.classList.add('my-board');
    myNameBox.classList.add('my-name-box');
    myName.classList.add('my-name');
    
    shipsContainer.classList.add('my-ships');
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
    main.appendChild(shipsContainer);
    main.appendChild(enemySection);

    main.classList.add('main-game');
}

function renderMyBoard (board) {
    const boxes = document.querySelectorAll('.my-div-box');

    for (const box of boxes) {
        let coordinates = box.id;
        let split = coordinates.split(' ');
        let num = split[1]; 
        
        if (board.board[num].hasShip) {
            box.style.background = 'green';
        }
        if (board.board[num].attacked) {
            box.innerHTML = '❌';
            box.style.background = '#F5C2C1';
        }
        if (board.board[num].missed) {
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
    }
}

function dragAndDrop () {
    let ships = document.querySelectorAll('.ship');
    let boxes = document.querySelectorAll('.my-div-box');

    ships.forEach(ship => {
        ship.draggable = true;
    
        ship.addEventListener('dragstart', (e) => {
            let selected = e.target;
            boxes.forEach(box => {
                box.addEventListener('dragover', () => {
                    box.style.background = 'red';
                });
                box.addEventListener('dragend', (e) => {
                    // let boxId = e.target.id;
                    // let myBox = document.getElementById(boxId);
                    // console.log(e.target);
                    // myBox.appendChild(selected);
                    // selected = null;
                });
                box.addEventListener('drop', (e) => {
                    // let boxId = e.target.id;
                    // let myBox = document.getElementById(boxId);
                    console.log(e.target);
                    // myBox.appendChild(selected);
                    // selected = null;
                });
            });
        });
    });
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
