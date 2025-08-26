let t = 0;
let startSeg, endSeg;

function setup() {
  createCanvas(600, 600, WEBGL);
  startSeg = createVector(-100, 100, 0);
  endSeg   = createVector(100, -100, 0);
}

function draw() {
  background(200); // fundo acinzentado
  orbitControl();

  // Eixos
  push();
  stroke(150); // linha cinza mais clara
  strokeWeight(3); // espessura dos eixos
  line(-300,0,0,300,0,0);
  line(0,-300,0,0,300,0);
  line(0,0,-300,0,0,300);
  pop();

  // Diagonal vermelha
  stroke(255, 0, 0);
  strokeWeight(6); // espessura das diagonal
  line(startSeg.x, startSeg.y, startSeg.z, endSeg.x, endSeg.y, endSeg.z);

  let amplitude = 50;
  endSeg.x = 100 + sin(t * 2 * PI) * amplitude;
  endSeg.y = -100 - sin(t * 2 * PI) * amplitude;

  // Plano
  let p1 = startSeg.copy();
  let p2 = endSeg.copy();
  let p3 = createVector(endSeg.x, endSeg.y + 200, 0);
  let p4 = createVector(startSeg.x, startSeg.y + 200, 0);

  fill(0, 100, 255, 150);
  stroke(0);
  strokeWeight(4); //espessura das linhas do plano
  beginShape();
  vertex(p1.x, p1.y, p1.z);
  vertex(p2.x, p2.y, p2.z);
  vertex(p3.x, p3.y, p3.z);
  vertex(p4.x, p4.y, p4.z);
  endShape(CLOSE);

  t += 0.01;
  if(t > 1) t = 0;

  // Marcador final
  push();
  noStroke();
  fill(0, 255, 0);
  translate(endSeg.x, endSeg.y, endSeg.z);
  sphere(8); // marcador maior
  pop();
}
