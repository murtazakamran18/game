const player = document.querySelector('.player');
const obstacle = document.querySelector('.obstacle');
const scoreDisplay = document.querySelector('.score');

let isJumping = false;
let score = 0;

function jump() {
  if (isJumping) return;

  isJumping = true;
  let position = 0;

  // Jump up (faster speed)
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      // Fall down (faster speed)
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 3; // Adjust fall speed
        player.style.bottom = position + 'px';
      }, 10); // Faster interval
    }
    position += 3; // Adjust jump speed
    player.style.bottom = position + 'px';
  }, 10); // Faster interval
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    jump();
  }
});
let gameSpeed = 20; // Initial speed
let level = 1;
const jumpSound = new Audio('jump-15984.mp3');
jumpSound.play();

const crashSound = new Audio('jump-15984.mp3'); // Replace with actual sound file
jumpSound.play();
document.addEventListener('touchstart', (event) => {
  jump(); // Trigger jump on touch
});
// Move obstacle with increasing speed
function moveObstacle() {
  let obstaclePosition = 600;

  let obstacleInterval = setInterval(() => {
    if (obstaclePosition < -30) {
      obstaclePosition = 600;
      score += 1;
      scoreDisplay.textContent = `Score: ${score}`;

      // Increase difficulty every 5 points
      if (score % 5 === 0) {
        level += 1;
        gameSpeed -= 2; // Increase speed
        clearInterval(obstacleInterval);
        moveObstacle(); // Restart with new speed
      }
    }

    if (
      obstaclePosition > 50 &&
      obstaclePosition < 90 &&
      parseInt(player.style.bottom) < 30
    ) {
      clearInterval(obstacleInterval);
      alert(`Game Over! Score: ${score}, Level: ${level}`);
      document.location.reload();
    }

    obstaclePosition -= 5;
    obstacle.style.left = obstaclePosition + 'px';
  }, gameSpeed); // Adjust interval based on level
}

moveObstacle();



function moveObstacle() {
  let obstaclePosition = 600;

  let obstacleInterval = setInterval(() => {
    if (obstaclePosition < -30) {
      obstaclePosition = 600;
      score += 1;
      scoreDisplay.textContent = `Score: ${score}`;
    }

    if (
      obstaclePosition > 50 &&
      obstaclePosition < 90 &&
      parseInt(player.style.bottom) < 30
    ) {
      clearInterval(obstacleInterval);
      alert('Game Over! Your score: ' + score);
      document.location.reload();
    }

    obstaclePosition -= 5;
    obstacle.style.left = obstaclePosition + 'px';
  }, 20);
}

moveObstacle();
