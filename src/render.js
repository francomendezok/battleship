// DOM Manipulation, Render the Game // 

// Render Write Your Name // 


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

    play.addEventListener('click', clean);
}

function renderInitalBoards () {
    const main = document.getElementById('main');

    const mySection = document.createElement('div');
    const myGameSection = document.createElement('div');
    const myBoard = document.createElement('div');
    const myShips = document.createElement('div');
    const myNameBox = document.createElement('div');
    const myName = document.createElement('h3');

    const enemySection = document.createElement('div');
    const enemyGameSection = document.createElement('div');
    const enemyBoard = document.createElement('div');
    const enemyShips = document.createElement('div');
    const enemyNameBox = document.createElement('div');
    const enemyName = document.createElement('h3');


    mySection.classList.add('my-section');
    myGameSection.classList.add('my-game-section');
    myBoard.classList.add('my-board');
    myShips.classList.add('my-ships');
    myNameBox.classList.add('my-name-box');
    myName.classList.add('my-name');

    enemySection.classList.add('enemy-section');
    enemyGameSection.classList.add('enemy-game-section');
    enemyBoard.classList.add('enemy-board');
    enemyShips.classList.add('enemy-ships');
    enemyNameBox.classList.add('enemy-name-box');
    enemyName.classList.add('enemy-name');

    for (let i = 0; i < 64; i++) {
        const div = document.createElement('div');
        const divEnemy = document.createElement('div');
        div.classList.add('div-box');
        divEnemy.classList.add('div-box');

        myBoard.appendChild(div);
        enemyBoard.appendChild(divEnemy);
    }

    myName.textContent = 'Franco';
    enemyName.textContent = 'Enemy';

    myNameBox.appendChild(myName);
    myGameSection.appendChild(myBoard);
    myGameSection.appendChild(myShips);
    mySection.appendChild(myNameBox);
    mySection.appendChild(myGameSection);

    enemyNameBox.appendChild(enemyName);
    enemyGameSection.appendChild(enemyBoard);
    enemyGameSection.appendChild(enemyShips);
    enemySection.appendChild(enemyNameBox);
    enemySection.appendChild(enemyGameSection);

    main.appendChild(mySection);
    main.appendChild(enemySection);

    main.classList.add('main-game');
}

function clean () {
    const main = document.getElementById('main');
    main.innerHTML = '';
}

export {writeName, clean, renderInitalBoards};
