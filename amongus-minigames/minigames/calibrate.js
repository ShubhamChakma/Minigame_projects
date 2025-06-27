const rotors = [
  { id: "rotor1", angle: 0, spinning: true },
  { id: "rotor2", angle: 0, spinning: false },
  { id: "rotor3", angle: 0, spinning: false }
];

let current = 0;
let gameDone = false;

function updateRotors() {
  rotors.forEach((rotor, index) => {
    if (rotor.spinning) {
      rotor.angle = (rotor.angle + 4) % 360;
      const needle = document.querySelector(`#${rotor.id} .needle`);
      needle.style.transform = `rotate(${rotor.angle}deg)`;
    }
  });
}

function checkAlignment(angle) {
  // Check if needle is within 40° of top (0° or 360°)
  return angle >= 340 || angle <= 40;
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !gameDone) {
    const rotor = rotors[current];
    rotor.spinning = false;
    const status = document.getElementById("status");

    if (checkAlignment(rotor.angle)) {
      status.textContent = `✅ Rotor ${current + 1} aligned!`;
      current++;
      if (current < rotors.length) {
        rotors[current].spinning = true;
      } else {
        status.textContent = "✅ All rotors calibrated!";
        gameDone = true;
      }
    } else {
      status.textContent = `❌ Rotor ${current + 1} missed! Restarting...`;
      setTimeout(() => window.location.reload(), 1000);
    }
  }
});

setInterval(updateRotors, 30);
