const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 180, y: 550, width: 40, height: 20, speed: 5 };
let bullets = [];
let asteroids = [];
let keys = {};

function drawPlayer() {
  ctx.fillStyle = "#00d26a";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
  ctx.fillStyle = "white";
  bullets.forEach((b) => {
    ctx.fillRect(b.x, b.y, b.width, b.height);
  });
}

function drawAsteroids() {
  ctx.fillStyle = "#ff3c3c";
  asteroids.forEach((a) => {
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function update() {
  // Move player
  if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
  if (keys["ArrowRight"] && player.x < canvas.width - player.width) player.x += player.speed;

  // Move bullets
  bullets.forEach((b) => b.y -= 7);
  bullets = bullets.filter((b) => b.y > 0);

  // Move asteroids
  asteroids.forEach((a) => a.y += 2);
  asteroids = asteroids.filter((a) => a.y < canvas.height);

  // Collision check
  bullets.forEach((b, bIndex) => {
    asteroids.forEach((a, aIndex) => {
      const dist = Math.hypot(b.x - a.x, b.y - a.y);
      if (dist < a.radius) {
        bullets.splice(bIndex, 1);
        asteroids.splice(aIndex, 1);
      }
    });
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBullets();
  drawAsteroids();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function spawnAsteroid() {
  const x = Math.random() * (canvas.width - 20) + 10;
  asteroids.push({ x, y: 0, radius: 15 });
}

// Controls
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (e.key === " ") {
    bullets.push({ x: player.x + player.width / 2 - 2, y: player.y, width: 4, height: 10 });
  }
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Start
setInterval(spawnAsteroid, 1000);
gameLoop();
