document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let color = "black";
    let isErasing = false;

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseout", stopDrawing);
    canvas.addEventListener("contextmenu", toggleEraser);

    // Agregar eventos para cambiar el color de dibujo
    const colorButtons = document.querySelectorAll(".color-button");
    colorButtons.forEach(button => {
        button.addEventListener("click", changeColor);
    });

    function startDrawing(event) {
        if (event.button === 2) return; // Si es el botón derecho, no dibujar
        isDrawing = true;
        [lastX, lastY] = [event.offsetX, event.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function draw(event) {
        if (!isDrawing) return;

        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(event.offsetX, event.offsetY);
        if (isErasing) {
            context.strokeStyle = "white"; // Usar color blanco para borrar
            context.lineWidth = 20; // Ancho de línea mayor para el borrador
        } else {
            context.strokeStyle = color;
            context.lineWidth = 5;
        }
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();

        [lastX, lastY] = [event.offsetX, event.offsetY];
    }

    function changeColor(event) {
        color = event.target.dataset.color;
        isErasing = false; // Asegurarse de que el borrador esté desactivado al cambiar de color
    }

    function toggleEraser(event) {
        event.preventDefault(); // Evitar el menú contextual por defecto al hacer clic derecho
        isErasing = !isErasing;
        return false;
    }
});