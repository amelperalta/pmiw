// Alumnas: Peralta Amel y Silva Delfina - Comisión 5 Leonardo Garay
// Título: Tu clave es Jonás

let imagenes = [];           
let estado = 0;              
let creditosY = 0;           
let frameInicio = 0;         
let finY = -50;              
let Y_FINAL_FIN = 100;       

let frases = [
  'Obbard te asigna la misión de hallar al Dr. Dumont y el canto', // 0
  '', // 1 (Decisión inicial)
  'Grabación borrada; copia en el MIT. KGB en la ciudad.', // 2
  'Examen: ¿Para qué sirven las ballenas a la humanidad?', // 3
  'Agentes de la KGB irrumpen armados por la cinta.', // 4
  'Recurso militar activado desde Washington.', // 5
  'Sin ayuda, persigues a Anton Roudnitska', // 6
  'McKim ocultó la carta para evitar uso militar', // 7
  'KGB traslada cinta a balsa rumbo al submarino.', // 8
  'Infiltración en sede de Ivan Ivenko en NY.', // 9
  'Revelación: Caverna secreta bajo la isla', // 10
  'Código incorrecto: caes en la trampa; contacto es doble agente.', // 11
  'Lancha inutilizada; quedas en aguas congeladas.', // 12
  'Entregas cinta traducida al presidente', // 13
  'FINAL 3: Captura y fracaso. Encarcelado en submarino; KGB toma la caverna.', // 14
  'FINAL 2: Salvado por la ballena. Una ballena gibosa te lleva en su lomo a la playa.', // 15
  'FINAL 1: Tratado ecológico. EE.UU. y URSS declaran reserva natural protegida.'  // 16
];

let totalPantallas = 17; 

function preload() {
  let nombresArchivos = [
    'obbard.jpg'          
    'camino.jpg'         
    'klein.jpg'          
    'sradumont.jpg'       
    'agentekgb.jpg'       
    'agentekgb2.jpg'      
    'antonhuyendo.jpg'    
    'mckimcarta.jpg'      
    'agentesubmarino.jpg' 
    'infiltracionivan.jpg'
    'cavernasecreta.jpg'  
    'cayendotrampa.jpg'   
    'atrapadoagua.jpg'   
    'entregacintas.jpg'   
    'finalcaverna.jpg'    
    'salvadoballena.jpg' 
    'reservanatural.jpg'   
  ];

  for (let i = 0; i < totalPantallas; i++) {
    imagenes[i] = loadImage("data/" + nombresArchivos[i]); 
  }
} 

function setup() {
  createCanvas(640, 480);    
  textAlign(CENTER, CENTER);  
  textSize(20);              
  frameInicio = frameCount;  
}

function draw() {
  background(0); 

  if (imagenes[estado]) {
    image(imagenes[estado], 0, 0, width, height); 
  }

  if (estado === 0) {
    let framesTranscurridos = frameCount - frameInicio; 
    let opacidad = map(framesTranscurridos, 0, 50, 0, 255);  
    opacidad = constrain(opacidad, 0, 255);                   

    fill(255, opacidad);   
    textSize(46);          
    textStyle(BOLD);       
    text("TU CLAVE ES JONÁS", width / 2, height / 2 - 40); 
    textSize(18);          
    text("Iniciativa de Inteligencia", width / 2, height / 2);

    if (opacidad >= 250) { 
      botonilli(width / 2 - 75, height / 2 + 20, 150, 50, "INICIAR"); 
    }
  } else {
    fill(255);           
    textSize(18);        
    textStyle(BOLD);

    let indiceFrase = estado; 
    if (indiceFrase >= 0 && indiceFrase < frases.length && frases[indiceFrase] !== '') {
      text(frases[indiceFrase], width / 2, height - 30); 
    }

    if (estado >= 14 && estado <= 16) {
      let Y_FINAL_CREDITOS = 300; 
      let velocidad_creditos = 1; 
      let velocidad_fin = 5;

      if (finY < Y_FINAL_FIN) {
        finY += velocidad_fin;
        if (finY > Y_FINAL_FIN) finY = Y_FINAL_FIN;
      }

      creditosY = manejarCreditos(creditosY, Y_FINAL_CREDITOS, velocidad_creditos); 

      textSize(54); 
      textStyle(BOLD);
      text("FIN", width / 2, finY);
      textStyle(NORMAL); 

      if (finY === Y_FINAL_FIN) {
        botonilli(width / 2 - 120, 400, 240, 50, "VOLVER AL INICIO"); 
      }
    }
  }

  
  if (estado === 1) { dibujarDosBotones("Ir a Cambridge", "Entrevistar Sra DuMont"); }
  else if (estado === 2) { dibujarDosBotones("Proteger copia MIT", "Buscar carta robada"); }
  else if (estado === 3) { dibujarDosBotones("Recurso militar", "Milagro natural"); }
  else if (estado === 6) { dibujarDosBotones("Ir al faro Galey Pt.", "Rendirse y seguir"); }
  else if (estado === 7) { dibujarDosBotones("Convencer a McKim", "Buscar en radio NY"); }
  else if (estado === 8) { dibujarDosBotones("Viajar a NY", "Infiltrar casa de te"); }
  else if (estado === 9) { dibujarDosBotones("Falsa identidad", "Perseguir lancha Martín"); }
  else if (estado === 10) { dibujarDosBotones("Alerta al GEI", "Robar decodificador"); }

  let estadosConDecision = [0, 1, 2, 3, 6, 7, 8, 9, 10, 14, 15, 16];
  if (!estadosConDecision.includes(estado)) { 
    let flechaTamCirculo = 40; 
    let margen = 20; 
    let flechaY = height - 90; 
    let flechaXDerecha = width - margen - flechaTamCirculo / 2;
    dibujarFlecha(flechaXDerecha, flechaY, flechaTamCirculo); 
  }
}

function mousePressed() {
  let flechaTamCirculo = 40; 
  let margen = 20; 
  let flechaY = height - 90; 
  let flechaXDerecha = width - margen - flechaTamCirculo / 2;
  let flechaDerechaClickada = overMouseFlecha(flechaXDerecha, flechaY, flechaTamCirculo);

  if (estado >= 14 && estado <= 16) {
    if (finY === Y_FINAL_FIN) { 
      if (overMouse(width / 2 - 120, 400, 240, 50)) {
        estado = 0; creditosY = 0; finY = -50; frameInicio = frameCount; 
        return; 
      }
    }
    return; 
  }

  if (estado === 0) {
    let framesTranscurridos = frameCount - frameInicio; 
    if (framesTranscurridos >= 50 && overMouse(width / 2 - 75, height / 2 + 20, 150, 50)) {
      estado = 1; 
      return; 
    }
  }

  if ([1, 2, 3, 6, 7, 8, 9, 10].includes(estado)) {
    let res = chequearDosBotonesClick();
    if (res !== null) {
      manejarTransicionDecision(estado, res);
      return;
    }
  }

  if (flechaDerechaClickada) {
    manejarTransicionSecuencial();
  }
}

function manejarTransicionDecision(estActual, opcion) {
  if (estActual === 1) estado = (opcion === 0) ? 2 : 3;
  else if (estActual === 2) estado = (opcion === 0) ? 4 : 6;
  else if (estActual === 3) {
    if (opcion === 0) estado = 5;
    else { estado = 16; creditosY = -50; finY = -50; }
  }
  else if (estActual === 6) {
    if (opcion === 0) estado = 7;
    else { estado = 14; creditosY = -50; finY = -50; }
  }
  else if (estActual === 7) estado = (opcion === 0) ? 8 : 9;
  else if (estActual === 8) {
    if (opcion === 0) estado = 9;
    else { estado = 14; creditosY = -50; finY = -50; }
  }
  else if (estActual === 9) estado = (opcion === 0) ? 10 : 12;
  else if (estActual === 10) {
    if (opcion === 0) { estado = 15; creditosY = -50; finY = -50; }
    else estado = 11;
  }
}

function manejarTransicionSecuencial() {
  if (estado === 4) estado = 7;
  else if (estado === 5) estado = 8;
  else if (estado === 11) { estado = 14; creditosY = -50; finY = -50; }
  else if (estado === 12) { estado = 15; creditosY = -50; finY = -50; }
  else if (estado === 13) { estado = 14; creditosY = -50; finY = -50; }
}

function dibujarDosBotones(textoIzq, textoDer) {
  let botonAncho = 190, botonAlto = 50, separacion = 20; 
  let posXIzquierda = width / 2 - separacion / 2 - botonAncho;
  let posXDerecha = width / 2 + separacion / 2;
  let posY = 350;

  botonilli(posXIzquierda, posY, botonAncho, botonAlto, textoIzq); 
  botonilli(posXDerecha, posY, botonAncho, botonAlto, textoDer);
}

function chequearDosBotonesClick() {
  let botonAncho = 190, botonAlto = 50, separacion = 20; 
  let posXIzquierda = width / 2 - separacion / 2 - botonAncho;
  let posXDerecha = width / 2 + separacion / 2;
  let posY = 350;

  if (overMouse(posXIzquierda, posY, botonAncho, botonAlto)) return 0;
  if (overMouse(posXDerecha, posY, botonAncho, botonAlto)) return 1;
  return null;
}

function manejarCreditos(yActual, yFinal, vel) { 
  return (yActual >= yFinal) ? yFinal : yActual + vel;      
}

function botonilli(posX, posY, tamX, tamY, textoB) { 
  if (overMouse(posX, posY, tamX, tamY)) fill(126, 153, 255); 
  else fill(200, 120, 0, 100); 
  
  rect(posX, posY, tamX, tamY, tamY / 4); 
  textSize(15); textStyle(BOLD); fill(255);          
  textAlign(CENTER, CENTER); 
  text(textoB, posX + tamX / 2, posY + tamY / 2); 
}

function dibujarFlecha(cX, cY, diam) { 
  let tam = diam * 0.55, desp = tam * 0.15;         
  if (overMouseFlecha(cX, cY, diam)) fill(126, 153, 255); 
  else fill(200, 120, 0, 100);  

  noStroke(); circle(cX, cY, diam); 
  fill(255); 
  triangle(cX - tam / 2 + desp, cY - tam / 2, cX - tam / 2 + desp, cY + tam / 2, cX + tam / 2 + desp, cY); 
}

function overMouse(posX, posY, tamX, tamY) { 
  return mouseX > posX && mouseX < posX + tamX && mouseY > posY && mouseY < posY + tamY;
}

function overMouseFlecha(centerX, centerY, diameter) { 
  return dist(mouseX, mouseY, centerX, centerY) < diameter / 2;
}
