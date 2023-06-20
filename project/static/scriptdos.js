document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let color = "black";
    let isErasing = false;
    let isFilling = false;

    const decreaseBrushSizeButton = document.getElementById("decrease-brush-size");
    const increaseBrushSizeButton = document.getElementById("increase-brush-size");
    const brushSizeSlider = document.getElementById("brush-size-slider");

    let brushSize = parseInt(brushSizeSlider.value);


    decreaseBrushSizeButton.addEventListener("click", () => {
        brushSize = Math.max(1, brushSize - 1);
        brushSizeSlider.value = brushSize;
    });

    increaseBrushSizeButton.addEventListener("click", () => {
        brushSize = Math.min(20, brushSize + 1);
        brushSizeSlider.value = brushSize;
    });

    brushSizeSlider.addEventListener("input", () => {
        brushSize = parseInt(brushSizeSlider.value);
    });

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseout", stopDrawing);
    canvas.addEventListener("contextmenu", toggleEraser);

    const colorButtons = document.querySelectorAll(".color-button");
    colorButtons.forEach(button => {
        button.addEventListener("click", changeColor);
    });

    const fillButton = document.getElementById("fill-button");
    fillButton.addEventListener("click", toggleFillMode);
    const colorInput = document.getElementById("color-input");

    colorInput.addEventListener("input", () => {
      color = colorInput.value;
      isErasing = false;
      isFilling = false;
    });

    function startDrawing(event) {
        if (event.button === 2) return;
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
            context.strokeStyle = "white";
            context.lineWidth = brushSize * 2; // Ajusta el tamaño del pincel
        } else {
            context.strokeStyle = color;
            context.lineWidth = brushSize; // Ajusta el tamaño del pincel
        }
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();

        [lastX, lastY] = [event.offsetX, event.offsetY];
    }

    function changeColor(event) {
        color = event.target.dataset.color;
        isErasing = false;
        isFilling = false;
    }

    function toggleEraser(event) {
        event.preventDefault();
        isErasing = !isErasing;
        isFilling = false;
        return false;
    }

    function toggleFillMode() {
        isFilling = !isFilling;
        fillButton.classList.toggle("active");
    }

    canvas.addEventListener("click", (event) => {
        if (isErasing || !isFilling) return;

        const clickedColor = getPixelColor(event.offsetX, event.offsetY);
        floodFill(event.offsetX, event.offsetY, clickedColor, color);
        console.log(color)
    });

    function getPixelColor(x, y) {
        const pixelData = context.getImageData(x, y, 1, 1).data;
        return `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
    }

    function floodFill(x, y, targetColor, fillColor) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const targetRgb = parseRgbString(targetColor);
        const fillRgb = parseRgbString(fillColor);
        console.log(fillRgb)
        console.log(fillColor)

        const stack = [[x, y]];
        //const ready = [];

        while (stack.length > 0) {
            const [currentX, currentY] = stack.pop();
            const currentIndex = (currentY * imageData.width + currentX) * 4;

            if (isWithinCanvas(currentX, currentY) && isBlank(imageData, currentIndex, targetRgb)) {
                setPixelColor(imageData, currentIndex, fillRgb);

                /*if(!ready.find([currentX + 1, currentY])){
                    stack.push([currentX + 1, currentY]); // Derecha
                }*/
                pushStackIfIsNecessary(stack, imageData, currentX + 1, currentY) // Derecha
                pushStackIfIsNecessary(stack, imageData, currentX - 1, currentY) // Izquierda
                pushStackIfIsNecessary(stack, imageData, currentX, currentY + 1) // Abajo
                pushStackIfIsNecessary(stack, imageData, currentX, currentY - 1) // Arriba
                /*stack.push([currentX - 1, currentY]); // Izquierda
                stack.push([currentX, currentY + 1]); // Abajo
                stack.push([currentX, currentY - 1]); // Arriba*/
                //ready.push(`${currentX},${currentY}`)
            }
        }

        context.putImageData(imageData, 0, 0);
    }

    function pushStackIfIsNecessary(stack, imageData, x, y) {
        const currentIndex = (y * imageData.width + x) * 4;
        if(isBlank(imageData, currentIndex, null) 
            && x > 0 && x < canvas.width
            && y > 0 && y < canvas.height){
            stack.push([x, y]);
        }
    }

    function isWithinCanvas(x, y) {
        return x >= 0 && x < canvas.width && y >= 0 && y < canvas.height;
    }

    function parseRgbString(rgbString) {
        const rgbValues = rgbString.slice(1).split(/([\da-f]{2})/);
        console.log(rgbValues)
        const [w, r, x, g, y, b, z] = rgbValues.map(value => parseInt(value,16));
        return { r, g, b };
    }

    function isBlank(imageData, index, targetColor) {
        const r = imageData.data[index];
        const g = imageData.data[index + 1];
        const b = imageData.data[index + 2];
        const e = imageData.data[index + 3];
        return r === 0 && g === 0 && b === 0 && e === 0;
    }

    function setPixelColor(imageData, index, color) {
        imageData.data[index] = color.r;
        imageData.data[index + 1] = color.g;
        imageData.data[index + 2] = color.b;
        imageData.data[index + 3] = 255; // Alpha channel
    }

});
