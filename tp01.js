const ESTADO_CORRER        = 0;
const ESTADO_POSTURA_BASE  = 1;
const ESTADO_ATAQUE_ESPADA = 2;
const ESTADO_GUARDIA_BACULO= 3;
const ESTADO_DOBLE_ESPADA  = 4;
const ESTADO_POSE_FINAL    = 5;

let estadoActual;

let fondo;
let framesCorrer       = new Array(2);
let framesPosturaBase  = new Array(1);
let framesAtaqueEspada = new Array(1);
let framesGuardiaBaculo= new Array(1);
let framesDobleEspada  = new Array(1);
let framesPoseFinal    = new Array(1);

let contadorTiempo = 0;
let posX, posY;
let posYBase = 320;
let anchoSprite = 150;
let altoSprite = 150;

function preload() {
  fondo = loadImage("assets/fondo.png");
  
  // chica6 y chica5 usadas para correr
  for (let i = 0; i < framesCorrer.length; i++) {
    let num = 6 - i;
    framesCorrer[i] = loadImage("assets/chica" + num + ".png");
  }
  
  // Asignación según la acción de cada imagen
  for (let i = 0; i < framesPosturaBase.length; i++) {
    framesPosturaBase[i] = loadImage("assets/chica1.png");
  }
  for (let i = 0; i < framesAtaqueEspada.length; i++) {
    framesAtaqueEspada[i] = loadImage("assets/chica2.png");
  }
  for (let i = 0; i < framesGuardiaBaculo.length; i++) {
    framesGuardiaBaculo[i] = loadImage("assets/chica3.png");
  }
  for (let i = 0; i < framesDobleEspada.length; i++) {
    framesDobleEspada[i] = loadImage("assets/chica4.png");
  }
  for (let i = 0; i < framesPoseFinal.length; i++) {
    framesPoseFinal[i] = loadImage("assets/chica5.png");
  }
}

function setup() {
  createCanvas(800, 600);
  reiniciarEscena();
}

function draw() {
  image(fondo, 0, 0, width, height);
  contadorTiempo++;
  
  switch (estadoActual) {

    case ESTADO_CORRER:
      posX -= 2.5;
      dibujarAnimacion(framesCorrer, posX, posY, anchoSprite, altoSprite, true);
      if (posX <= 380) {
        cambiarEstado(ESTADO_POSTURA_BASE);
      }
      break;
      
    case ESTADO_POSTURA_BASE:
      if (contadorTiempo < 50) {
        posY = posYBase - sin(radians(contadorTiempo * 3.6)) * 100;
      } else {
        posY = posYBase;
      }
      dibujarAnimacion(framesPosturaBase, posX, posY, anchoSprite, altoSprite, true);
      break;
      
    case ESTADO_ATAQUE_ESPADA:
      dibujarAnimacion(framesAtaqueEspada, posX, posY, anchoSprite, altoSprite, true);
      break;
      
    case ESTADO_GUARDIA_BACULO:
      dibujarAnimacion(framesGuardiaBaculo, posX, posY, anchoSprite, altoSprite, true);
      break;
      
    case ESTADO_DOBLE_ESPADA:
      dibujarAnimacion(framesDobleEspada, posX, posY, anchoSprite, altoSprite, true);
      break;

    case ESTADO_POSE_FINAL:
      posX += 3;
      dibujarAnimacion(framesPoseFinal, posX, posY, anchoSprite, altoSprite, false);
      
      if (posX > width + 100) {
        reiniciarEscena();
      }
      break;
  }
}

function mousePressed() {
  if (estadoActual === ESTADO_CORRER) {
    cambiarEstado(ESTADO_POSTURA_BASE);
  } else if (estadoActual === ESTADO_POSTURA_BASE) {
    posY = posYBase;
    cambiarEstado(ESTADO_ATAQUE_ESPADA);
  } else if (estadoActual === ESTADO_ATAQUE_ESPADA) {
    cambiarEstado(ESTADO_GUARDIA_BACULO);
  } else if (estadoActual === ESTADO_GUARDIA_BACULO) {
    cambiarEstado(ESTADO_DOBLE_ESPADA);
  } else if (estadoActual === ESTADO_DOBLE_ESPADA) {
    cambiarEstado(ESTADO_POSE_FINAL);
  } else if (estadoActual === ESTADO_POSE_FINAL) {
    reiniciarEscena();
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    reiniciarEscena();
  }
}

function dibujarAnimacion(frames, x, y, ancho, alto, espejar) {
  let indice = obtenerFrameActual(frames.length);
  
  push();
  if (espejar) {
    translate(x + ancho, y);
    scale(-1, 1);
    image(frames[indice], 0, 0, ancho, alto);
  } else {
    image(frames[indice], x, y, ancho, alto);
  }
  pop();
}

function cambiarEstado(nuevoEstado) {
  estadoActual = nuevoEstado;
  contadorTiempo = 0;
}

function obtenerFrameActual(totalFrames) {
  return floor(contadorTiempo / 10) % totalFrames;
}

function reiniciarEscena() {
  posX = 750;
  posY = posYBase;
  cambiarEstado(ESTADO_CORRER);
}
