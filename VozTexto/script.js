// Acceso al botón y al resultado
const startBtn = document.getElementById('start-btn');
const resultDiv = document.getElementById('result');

// Verificar la disponibilidad de la API de reconocimiento de voz
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    // Configurar idioma y otras opciones
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = true;

    // Evento al recibir un resultado de reconocimiento
    recognition.onresult = function(event) {
        console.log(event);
        const result = event.results[event.results.length - 1][0].transcript;
        resultDiv.textContent = result;
    };

    // Evento al iniciar el reconocimiento
    recognition.onstart = function() {
        startBtn.textContent = 'Escuchando...';
    };

    // Evento al detener el reconocimiento
    recognition.onend = function(e) {
        console.log(e);
        startBtn.textContent = 'Iniciar';
    };

    // Manejar clic en el botón de inicio
    startBtn.addEventListener('click', function() {
        console.log(recognition);
        if (recognition.continuous) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });
} else {
    // El navegador no es compatible con la API de reconocimiento de voz
    startBtn.disabled = true;
    resultDiv.textContent = 'El reconocimiento de voz no es compatible en este navegador.';
}
