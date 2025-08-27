// ============Variáveis Globáis=========================

let t = 0; //Inicializando o Tempo para animar a diagonal 
let startSeg, endSeg; // Vetores para guardar o inicio e fim do seguimento (Diagonal vermelha)

// Cria uma área de desenho (canvas) de 600×600 pixels em 3D, definindo também os pontos inicial e final da diagonal.
function setup() {
  createCanvas(600, 600, WEBGL);
  startSeg = createVector(-100, 100, 0); 
  endSeg   = createVector(100, -100, 0);
}

// Redesenha a cena a cada frame.
function draw() {
  background(200); // fundo acinzentado
  orbitControl(); // controles de câmera com o mouse

  // Eixos
  push();
  stroke(150); // linha cinza mais clara
  strokeWeight(3); // espessura dos eixos
  line(-300,0,0,300,0,0);
  line(0,-300,0,0,300,0);
  line(0,0,-300,0,0,300);
  pop();

  // ================ Diagonal vermelha (Seguimento) ===============
  stroke(255, 0, 0); //Cor 
  strokeWeight(6); // espessura das diagonal
  line(startSeg.x, startSeg.y, startSeg.z, endSeg.x, endSeg.y, endSeg.z); // desenha do ponto fixo (startSeg) até o ponto móvel (endSeg).

  // Animação da ponta (endSeg)
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

  t += 0.01; // Incrementa o tempo em 0.01 → faz o seno mudar a cada frame.
  if(t > 1) t = 0; // Reinicia 't' quando ele passa de 1 (um ciclo completo do seno).

  // Marcador final
  push();   // Salva as configurações de estilo e transformação atuais.
  noStroke();  // Remove contorno da esfera.
  fill(0, 255, 0);
  translate(endSeg.x, endSeg.y, endSeg.z);  // Move o sistema de coordenadas para a ponta da diagonal (endSeg).
  sphere(8); //  // Desenha uma esfera verde de raio 8 no ponto final.
  pop();  // Restaura configurações anteriores (para não afetar outros desenhos).
}
