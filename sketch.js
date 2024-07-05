// VARIÁVEIS DA BOLINHA
let xBola = 50;
let yBola = 200;
let velocidadeX = 5;
let velocidadeY = 5;
const VELOCIDADE_INICIAL_X = 5;
const VELOCIDADE_INICIAL_Y = 5;
let diametro = 20;
let raio = diametro / 2;

// VARIÁVEIS DA RAQUETE
let larguraRaq = 10;
let alturaRaq = 80;
let xRaq1 = 10;
let yRaq1 = 200 - alturaRaq / 2;

let xRaq2 = 580;
let yRaq2 = 200 - alturaRaq / 2;

let colisao = false;
let colisao2 = false;

// PONTUAÇÃO
let pontosJ1 = 0;
let pontosJ2 = 0;

// VARIÁVEIS DO JOGO
let jogoTerminado = false;
let vencedor = "";

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  trilha.setVolume(0.6);
  ponto.setVolume(0.6);
  raquetada.setVolume(1.5);
}

function draw() {
  background(0, 100, 100); // Fundo azul escuro
  if (!jogoTerminado) {
    movimentaBolinha();
    movimentaRaquete();
    colisaoRaquete();
    contaPontos();
    mostraPontos();
  } else {
    mostraVencedor();
  }
}

function movimentaBolinha() {
  fill(255, 255, 0); // Cor amarela para a bola
  circle(xBola, yBola, diametro);
  xBola += velocidadeX;
  yBola += velocidadeY;

  if (xBola + raio >= width || xBola - raio <= 0) {
    velocidadeX *= -1;
  }

  if (yBola + raio >= height || yBola - raio <= 0) {
    velocidadeY *= -1;
  }
}

function movimentaRaquete() {
  fill(255); // Cor branca para as raquetes
  rect(xRaq1, yRaq1, larguraRaq, alturaRaq);
  rect(xRaq2, yRaq2, larguraRaq, alturaRaq);

  if (keyIsDown(87)) {
    yRaq1 -= 5;
  }
  if (keyIsDown(83)) {
    yRaq1 += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    yRaq2 -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaq2 += 5;
  }

  // Limites para a raquete do Jogador 1
  yRaq1 = constrain(yRaq1, 0, height - alturaRaq);
  // Limites para a raquete do Jogador 2
  yRaq2 = constrain(yRaq2, 0, height - alturaRaq);
}

function colisaoRaquete() {
  colisao = collideRectCircle(xRaq1, yRaq1, larguraRaq, alturaRaq, xBola, yBola, diametro);
  colisao2 = collideRectCircle(xRaq2, yRaq2, larguraRaq, alturaRaq, xBola, yBola, diametro);
  if (colisao || colisao2) {
    raquetada.play();
    velocidadeX *= -1;
    // Aumenta a velocidade a cada colisão com a raquete
    velocidadeX *= 1.05;
    velocidadeY *= 1.05;
  }
}

function contaPontos() {
  // Pontos Jogador 1
  if (xBola + raio >= width) {
    ponto.play();
    pontosJ1 += 1;
    resetBolinha(30, yRaq1 + alturaRaq / 2);
    velocidadeX = -VELOCIDADE_INICIAL_X;
    velocidadeY = VELOCIDADE_INICIAL_Y;
  }

  // Pontos Jogador 2
  if (xBola - raio <= 0) {
    ponto.play();
    pontosJ2 += 1;
    resetBolinha(width - 30, yRaq2 + alturaRaq / 2);
    velocidadeX = VELOCIDADE_INICIAL_X;
    velocidadeY = VELOCIDADE_INICIAL_Y;
  }

  if (pontosJ1 === 7 || pontosJ2 === 7) {
    jogoTerminado = true;
    vencedor = pontosJ1 === 7 ? "Jogador 1" : "Jogador 2";
  }
}

function resetBolinha(x, y) {
  xBola = x;
  yBola = y;
}

function mostraPontos() {
  stroke(255);
  textAlign(CENTER);
  textSize(28);
  fill(255, 0, 127);
  rect(170, 20, 60, 40);
  fill(255);
  text(pontosJ1, 200, 50);

  stroke(255);
  textAlign(CENTER);
  textSize(28);
  fill(0, 150, 0);
  rect(370, 20, 60, 40);
  fill(255);
  text(pontosJ2, 400, 50);
}

function mostraVencedor() {
  background(0);
  textAlign(CENTER);
  fill(255);
  textSize(32);
  text(`${vencedor} venceu!`, width / 2, height / 2);
}
