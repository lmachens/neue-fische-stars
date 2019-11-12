import { getRandomItem, waitFor } from "./utils.js";

const initialFishWidth = 20;
const fishPath = new Path2D(
  "M19.0178284,10.2465476 L18.8214166,10.7483271 C18.4040952,11.6713083 17.610067,12.769892 16.3262987,14.1714561 C10.8684566,20.1295277 7.2640631,20.2685039 11.7785267,14.8162813 C11.7785267,14.8162813 16.7747795,10.4361902 11.5990914,3.90552837 C7.50237899,-1.26365476 10.7485465,-0.427152165 12.8014155,1.45279126 C13.6321902,2.21278571 15.3416608,3.79178355 16.7393223,5.28938975 C18.4614715,7.13433477 19.648968,8.3014909 19.0178284,10.2465476 Z M7.46892021,12.965293 C7.46892021,12.965293 10.3916744,10.0956272 7.35868031,5.813206 C4.95768536,2.42344763 6.85862524,2.97304468 8.0611642,4.20592457 C8.54789593,4.70465185 9.5497252,5.740157 10.3686809,6.72235063 C11.9081714,8.56831305 12.7187463,9.37978771 10.1310097,12.5440912 C6.93878018,16.4476343 4.82853491,16.5375721 7.46892021,12.965293 Z M1.50816497,11.214457 C1.50816497,11.214457 5.11728609,9.76853454 1.40823991,7.63709094 C-1.52719292,5.94984222 0.807830005,6.21762072 2.28091874,6.83009281 C2.87660101,7.07772688 4.10342283,7.59212205 5.10546699,8.08067538 C6.98964526,8.99877309 7.98266394,9.40166171 4.78420257,10.9940892 C0.838559646,12.9584764 -1.757128,13.011381 1.50816497,11.214457 Z"
);
export function drawFish({ context, canvas, students, mouseX, mouseY }) {
  const width = canvas.width / 2;
  const zoom = width / initialFishWidth;
  const offset = [canvas.width / 2 - width / 2, canvas.height / 2 - width / 2];

  context.translate(offset[0], offset[1]);
  context.scale(zoom, zoom);
  context.strokeStyle = "#FF5A36";
  context.lineWidth = 0.3;
  context.stroke(fishPath);

  context.scale(1 / zoom, 1 / zoom);
  context.translate(-offset[0], -offset[1]);
  drawStudents({ students, context, canvas, zoom, mouseX, mouseY });
}

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

function drawStudents({ students, context, canvas, zoom, mouseX, mouseY }) {
  students.forEach(student => {
    const width = parseInt((canvas.width / 2 / 25) * student.size);
    const x = canvas.width / 2 + student.dx * zoom - width / 2;
    const y = canvas.height / 2 + student.dy * zoom - width / 2;

    drawStudent({
      context,
      x,
      y,
      width
    });

    if (Math.abs(x - mouseX) < 20 && Math.abs(y - mouseY) < 20) {
      drawTooltip({ context, student, mouseX, mouseY });
    }
  });
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
