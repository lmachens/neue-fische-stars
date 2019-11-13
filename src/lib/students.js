import { getRandomItem, waitFor } from "./utils.js";

export const students = [
  {
    dx: 0,
    dy: 0,
    size: 1,
    name: "Lukas Kreidenweis"
  },
  {
    dx: -1.1,
    dy: -3.2,
    size: 1,
    name: "Cristina Merisoiu"
  },
  {
    dx: 5,
    dy: 1.5,
    size: 1,
    name: "Hanna Frauenkorn"
  },
  {
    dx: -5,
    dy: -1.3,
    size: 1,
    name: "Jonas Munsch"
  },
  {
    dx: 5.8,
    dy: -1.6,
    size: 1,
    name: "Jürgen Baltres"
  },
  {
    dx: 3.9,
    dy: -6.0,
    size: 1,
    name: "Jose Antonio Teran"
  },
  {
    dx: 4.6,
    dy: 3.5,
    size: 1,
    name: "Julian Toscani"
  },
  {
    dx: 1.9,
    dy: 5.9,
    size: 1,
    name: "Lena Kastenmeier"
  },
  {
    dx: -6.8,
    dy: -2,
    size: 1,
    name: "Omid Arzani"
  },
  {
    dx: -5.8,
    dy: 0.2,
    size: 1,
    name: "Philipp Mäcke"
  }
];

const initialPointWidth = 512;
const pointPath = new Path2D(
  "M324.52 191.715a97.542 97.542 0 0 0-4.228-4.229L256 22.303l-64.291 165.183a93.225 93.225 0 0 0-4.222 4.224L22.301 255.998l165.179 64.291a97.542 97.542 0 0 0 4.229 4.229L256 489.697l64.284-165.174a95.208 95.208 0 0 0 4.237-4.233l165.178-64.287zM256"
);

function drawStudent({ context, x, y, width }) {
  const zoom = width / initialPointWidth;

  context.translate(x, y);
  context.scale(zoom, zoom);
  context.fillStyle = "hsla(" + 0 + "," + 0 + "%," + 100 + "%," + 1 + ")";
  context.stroke(pointPath);
  context.fill(pointPath);
  context.scale(1 / zoom, 1 / zoom);
  context.translate(-x, -y);
}

function drawTooltip({ context, student, mouseX, mouseY }) {
  context.beginPath();
  context.fillStyle = "#fff";
  context.font = "30px Arial";
  context.textAlign = "center";
  context.fillText(student.name, mouseX, mouseY - 10);
}

export function drawStudents({ students, canvas, zoom, mouseX, mouseY }) {
  const context = canvas.getContext("2d");
  let closest;
  students.forEach(student => {
    const width = parseInt(
      (Math.min(canvas.width / 2, canvas.height / 2) / 25) * student.size
    );
    const x = canvas.width / 2 + student.dx * zoom - width / 2;
    const y = canvas.height / 2 + student.dy * zoom - width / 2;

    drawStudent({
      context,
      x,
      y,
      width
    });

    const dx = x - mouseX;
    const dy = y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 15 && (!closest || distance < closest.distance)) {
      closest = {
        distance,
        student
      };
    }
  });
  if (closest) {
    drawTooltip({ context, student: closest.student, mouseX, mouseY });
  }
}

export async function hightlightRandomStudent(students) {
  const student = getRandomItem(students);
  for (let i = 0; i < 50; i++) {
    student.size += 0.02;
    await waitFor(10);
  }
  for (let i = 0; i < 50; i++) {
    student.size -= 0.02;
    await waitFor(10);
  }
  setTimeout(() => hightlightRandomStudent(students), 2000);
}
