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

function clean () {
    const main = document.getElementById('main');
    main.innerHTML = '';
}

export {writeName, clean};
