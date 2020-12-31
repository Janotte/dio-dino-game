const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

/**
 * @param {{ keyCode: number; }} event
 */
function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {

        if (position >= 250) {
            //going down
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);

                    isJumping = false;
                } else {
                    position -= 2;

                    dino.style.bottom = position + 'px';
                }
            });
        } else {
            // going up
            position += 30;

            dino.style.bottom = position + 'px';
        }

    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            //Display out
            clearInterval(leftInterval);

            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //Game over
            clearInterval(leftInterval);

            isGameOver = true;

            document.body.innerHTML = '<h1 class="game-over"> Fim de jogo! </h1>'
        } else {
            cactusPosition -= 10;

            cactus.style.left = cactusPosition + 'px';
        }

    }, 50);

    setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keyup', handleKeyUp);