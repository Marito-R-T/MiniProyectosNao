let ultimoItem;

let observador = new IntersectionObserver((entradas, observador) => {
  entradas.forEach(entrada => {
    if(entrada.isIntersecting) {
      agregarElementos();
    }
  });
}, {
  rootMargin: '0px 0px 0px 0px',
  threshold: 1.0
});

// Variable para llevar el registro del último elemento cargado
let index = 1;

// Función para crear y agregar elementos al contenedor
function agregarElementos() {
  const contenedor = document.getElementById("content");
  const item = document.createElement("div");
  item.className = "item";
  item.id = `i${index}`
  //item.textContent = "Elemento "+ i;

  contenedor.appendChild(item);

  if(ultimoItem) {
    observador.unobserve(ultimoItem);
  }

  const itemsEnPantalla = document.querySelectorAll('.content .item');
  ultimoItem = itemsEnPantalla[itemsEnPantalla.length - 1];
  observador.observe(ultimoItem);

  // Actualizar el índice del último elemento cargado
  index++;
}

// Cargar elementos iniciales
agregarElementos();

  