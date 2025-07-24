// Seleciona os elementos da tela
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.getElementById('score');

// Variáveis de controle
let isGameOver = false; // verifica se o jogo acabou
let score = 0; // pontuação

// Atualiza a pontuação a cada 100 milissegundos enquanto o jogo está ativo
const scoreLoop = setInterval(() => {
  if (!isGameOver) {
    score++;
    scoreDisplay.textContent = score;
  }
}, 100);

// Função de pulo
const jump = () => {
  if (isGameOver) return; // se perdeu, não pula mais

  // Adiciona classe que faz o Mario "saltar"
  mario.classList.add('jump');

  // Remove a classe após 500ms para poder pular novamente
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
};

// Loop principal do jogo (verifica colisões a cada 10ms)
const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft; // posição do cano
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); // posição do Mario

  // Detecta colisão com base nas posições horizontal e vertical
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    // Para a animação do cano
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    // Para a animação do Mario
    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    // Altera a imagem do Mario para o "game over"
    mario.src = './assets/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    // Marca o fim do jogo
    isGameOver = true;

    // Para os loops
    clearInterval(loop);
    clearInterval(scoreLoop);
  }
}, 10);

// Evento para pular ou reiniciar usando teclado (PC)
document.addEventListener('keydown', () => {
  if (isGameOver) {
    location.reload(); // reinicia o jogo
  } else {
    jump(); // executa o pulo
  }
});

// Evento para pular ou reiniciar usando toque (mobile)
document.addEventListener('touchstart', () => {
  if (isGameOver) {
    location.reload(); // reinicia no celular
  } else {
    jump(); // executa o pulo no celular
  }
});
