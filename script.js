const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.getElementById('score');
const gameOverMessage = document.querySelector('.game-over-message');

let isGameOver = false;
let score = 0;

const scoreLoop = setInterval(() => {
  if (!isGameOver) {
    score++;
    scoreDisplay.textContent = score;
  }
}, 100);

const jump = () => {
  if (isGameOver) return;
  mario.classList.add('jump');
  setTimeout(() => mario.classList.remove('jump'), 500);
};

const loop = setInterval(() => {
  const pipePos = pipe.offsetLeft;
  const marioPos = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePos <= 120 && pipePos > 0 && marioPos < 80) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePos}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPos}px`;

    mario.style.display = 'none';
    pipe.style.display = 'none';

    gameOverMessage.style.display = 'block';

    isGameOver = true;

    clearInterval(loop);
    clearInterval(scoreLoop);
  }
}, 10);


document.addEventListener('keydown', (event) => {
  if (isGameOver) {
    location.reload();
  } else {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
      jump();
    }
  }
});

document.addEventListener('click', () => {
  if (isGameOver) {
    location.reload();
  } else {
    jump();
  }
});
