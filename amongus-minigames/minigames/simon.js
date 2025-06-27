const colors = ["red", "green", "blue", "yellow"];
let gameSequence = [];
let playerSequence = [];
let level = 0;
let canClick = false;

const levelText = document.getElementById("level");
const startBtn = document.getElementById("start-btn");

function flashButton(color) {
  const btn = document.getElementById(color);
  btn.classList.add("glow");
  setTimeout(() => {
    btn.classList.remove("glow");
  }, 400);
}

function playSequence() {
  canClick = false;
  playerSequence = [];
  let i = 0;
  const interval = setInterval(() => {
    flashButton(gameSequence[i]);
    i++;
    if (i >= gameSequence.length) {
      clearInterval(interval);
      canClick = true;
    }
  }, 600);
}

function nextLevel() {
  level++;
  levelText.textContent = "Level: " + level;
  const randomColor = colors[Math.floor(Math.random() * 4)];
  gameSequence.push(randomColor);
  playSequence();
}

function resetGame() {
  level = 0;
  gameSequence = [];
  playerSequence = [];
  levelText.textContent = "Level: 0";
}

function handleClick(color) {
  if (!canClick) return;

  playerSequence.push(color);
  flashButton(color);

  const currentIndex = playerSequence.length - 1;
  if (playerSequence[currentIndex] !== gameSequence[currentIndex]) {
    alert("❌ Wrong pattern! Try again.");
    resetGame();
    return;
  }

  if (playerSequence.length === gameSequence.length) {
    setTimeout(() => {
      nextLevel();
    }, 800);
  }
}

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => handleClick(btn.id));
});

startBtn.addEventListener("click", () => {
  resetGame();
  nextLevel();
});
