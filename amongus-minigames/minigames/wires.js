const leftColumn = document.getElementById("left-column");
const rightColumn = document.getElementById("right-column");
const svg = document.getElementById("wire-lines");
const status = document.getElementById("status");

const colors = ["red", "blue", "yellow", "green"];
const matches = {};
let draggingWire = null;

function createWire(color, side) {
  const wire = document.createElement("div");
  wire.className = "wire";
  wire.style.backgroundColor = color;
  wire.setAttribute("data-color", color);
  wire.setAttribute("draggable", side === "left");

  if (side === "left") {
    wire.addEventListener("dragstart", (e) => {
      draggingWire = wire;
    });
  } else {
    wire.addEventListener("dragover", (e) => e.preventDefault());
    wire.addEventListener("drop", () => {
      if (draggingWire && draggingWire.dataset.color === wire.dataset.color && !matches[color]) {
        matches[color] = true;
        drawLine(draggingWire, wire);
        draggingWire.style.opacity = "0.5";
        wire.style.opacity = "0.5";

        if (Object.keys(matches).length === colors.length) {
          status.textContent = "✅ Wires connected!";
        }
      }
    });
  }

  return wire;
}

function drawLine(from, to) {
  const svgRect = svg.getBoundingClientRect();
  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();

  const x1 = fromRect.right - svgRect.left;
  const y1 = fromRect.top + fromRect.height / 2 - svgRect.top;
  const x2 = toRect.left - svgRect.left;
  const y2 = toRect.top + toRect.height / 2 - svgRect.top;

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", from.style.backgroundColor);
  line.setAttribute("stroke-width", 4);

  svg.appendChild(line);
}

// Shuffle colors for right side
const shuffledColors = [...colors].sort(() => 0.5 - Math.random());

colors.forEach((color) => {
  leftColumn.appendChild(createWire(color, "left"));
});
shuffledColors.forEach((color) => {
  rightColumn.appendChild(createWire(color, "right"));
});
