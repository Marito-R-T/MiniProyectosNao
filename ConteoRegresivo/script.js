// Función para obtener el tiempo restante hasta el Año Nuevo
function obtenerTiempoRestante() {
    const ahora = new Date();
    const proximoAnoNuevo = new Date(ahora.getFullYear() + 1, 0, 1);
    const tiempoRestante = proximoAnoNuevo - ahora;

    const segundos = Math.floor((tiempoRestante / 1000) % 60);
    const minutos = Math.floor((tiempoRestante / 1000 / 60) % 60);
    const horas = Math.floor((tiempoRestante / (1000 * 60 * 60)) % 24);
    const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));

    return {
        dias,
        horas,
        minutos,
        segundos
    };
}

// Función para actualizar el contador regresivo en la página
function actualizarContador() {
    const diasElemento = document.getElementById('days');
    const horasElemento = document.getElementById('hours');
    const minutosElemento = document.getElementById('minutes');
    const segundosElemento = document.getElementById('seconds');
  
    const tiempoRestante = obtenerTiempoRestante();
  
    diasElemento.textContent = tiempoRestante.dias;
    horasElemento.textContent = tiempoRestante.horas;
    minutosElemento.textContent = tiempoRestante.minutos;
    segundosElemento.textContent = tiempoRestante.segundos;
}

// Función para iniciar la cuenta regresiva y actualizarla cada segundo
function iniciarContador() {
    actualizarContador();
    setInterval(actualizarContador, 1000); // Actualizar cada segundo
}

// Iniciar el contador al cargar la página
window.addEventListener('DOMContentLoaded', iniciarContador);