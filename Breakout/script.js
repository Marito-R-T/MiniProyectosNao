// Variables del juego
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var radioPelota = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var alturaPaleta = 10;
var anchoPaleta = 75;
var xPaleta = (canvas.width - anchoPaleta) / 2;
var teclaDerechaPresionada = false;
var teclaIzquierdaPresionada = false;
var cantidadFilasLadrillos = 1;
var cantidadColumnasLadrillos = 1;
var anchoLadrillo = 75;
var altoLadrillo = 20;
var margenLadrillo = 10;
var margenSuperiorLadrillo = 30;
var margenIzquierdoLadrillo = 30;
var ladrillos = [];
var ladrillosDestruidos = 0;
var totalLadrillos = cantidadFilasLadrillos * cantidadColumnasLadrillos;

// Crear ladrillos
for (var c = 0; c < cantidadColumnasLadrillos; c++) {
  ladrillos[c] = [];
  for (var r = 0; r < cantidadFilasLadrillos; r++) {
    ladrillos[c][r] = { x: 0, y: 0, estado: 1 };
  }
}

// Event listeners
document.addEventListener("keydown", presionarTecla, false);
document.addEventListener("keyup", soltarTecla, false);

// Manejadores de teclas
function presionarTecla(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    teclaDerechaPresionada = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    teclaIzquierdaPresionada = true;
  }
}

function soltarTecla(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    teclaDerechaPresionada = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    teclaIzquierdaPresionada = false;
  }
}

// Detección de colisiones
function detectarColision() {
  for (var c = 0; c < cantidadColumnasLadrillos; c++) {
    for (var r = 0; r < cantidadFilasLadrillos; r++) {
      var ladrillo = ladrillos[c][r];
      if (ladrillo.estado == 1) {
        if (
          x > ladrillo.x &&
          x < ladrillo.x + anchoLadrillo &&
          y > ladrillo.y &&
          y < ladrillo.y + altoLadrillo
        ) {
          dy = -dy;
          ladrillo.estado = 0;
          ladrillosDestruidos++;
        }
      }
    }
  }
}

// Detección de victoria
function detectarVictoria() {
  if (ladrillosDestruidos == totalLadrillos) {
    alert("¡Has ganado!");
    document.location.reload();
  }
}

// Dibujar la pelota
function dibujarPelota() {
  ctx.beginPath();
  ctx.arc(x, y, radioPelota, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Dibujar la paleta
function dibujarPaleta() {
  ctx.beginPath();
  ctx.rect(xPaleta, canvas.height - alturaPaleta, anchoPaleta, alturaPaleta);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Dibujar los ladrillos
function dibujarLadrillos() {
  for (var c = 0; c < cantidadColumnasLadrillos; c++) {
    for (var r = 0; r < cantidadFilasLadrillos; r++) {
      if (ladrillos[c][r].estado == 1) {
        var ladrilloX = c * (anchoLadrillo + margenLadrillo) + margenIzquierdoLadrillo;
        var ladrilloY = r * (altoLadrillo + margenLadrillo) + margenSuperiorLadrillo;
        ladrillos[c][r].x = ladrilloX;
        ladrillos[c][r].y = ladrilloY;
        ctx.beginPath();
        ctx.rect(ladrilloX, ladrilloY, anchoLadrillo, altoLadrillo);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// Dibujar el juego
function dibujar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarLadrillos();
  dibujarPelota();
  dibujarPaleta();
  detectarColision();
  detectarVictoria();

  // Movimiento de la pelota
  if (x + dx > canvas.width - radioPelota || x + dx < radioPelota) {
    dx = -dx;
  }
  if (y + dy < radioPelota) {
    dy = -dy;
  } else if (y + dy > canvas.height - radioPelota) {
    if (x > xPaleta && x < xPaleta + anchoPaleta) {
      dy = -dy;
    } else {
      // Condición de fin del juego
      alert("GAME OVER");
      document.location.reload();
    }
  }

  if (teclaDerechaPresionada && xPaleta < canvas.width - anchoPaleta) {
    xPaleta += 7;
  } else if (teclaIzquierdaPresionada && xPaleta > 0) {
    xPaleta -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(dibujar);
}

// Iniciar el juego
dibujar();

    
