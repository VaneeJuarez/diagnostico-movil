const PRODUCTOS = [
  { id: 1, nombre: 'Audífonos Inalámbricos', precio: 59.99,  estrellas: 5, categoria: 'Tecnología' },
  { id: 2, nombre: 'Smartwatch Pro',         precio: 89.99,  estrellas: 4, categoria: 'Tecnología' },
  { id: 3, nombre: 'Cámara Digital',         precio: 199.99, estrellas: 5, categoria: 'Tecnología' },
  { id: 4, nombre: 'Mochila Urbana',         precio: 39.99,  estrellas: 4, categoria: 'Accesorios' },
  { id: 5, nombre: 'Teclado Mecánico',       precio: 74.99,  estrellas: 5, categoria: 'Tecnología' },
  { id: 6, nombre: 'Lámpara de Escritorio',  precio: 24.99,  estrellas: 3, categoria: 'Hogar' },
  { id: 7, nombre: 'Botella Térmica',        precio: 18.99,  estrellas: 4, categoria: 'Accesorios' },
  { id: 8, nombre: 'Altavoz Bluetooth',      precio: 45.99,  estrellas: 4, categoria: 'Tecnología' },
];

const IMG = 'assets/img/producto.svg';

const estado = {
  texto: '',
};

function productosFiltrados() {
  const t = estado.texto.trim().toLowerCase();
  if (!t) return PRODUCTOS;
  return PRODUCTOS.filter(p => p.nombre.toLowerCase().includes(t));
}

function estrellasHTML(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function tarjetaHTML(p) {
  return `
    <div class="col">
      <article class="card h-100 shadow-sm">
        <div class="row g-0 flex-md-column align-items-center">
          <div class="col-4 col-md-12">
            <img src="${IMG}" alt="${p.nombre}" class="producto-img">
          </div>
          <div class="col-8 col-md-12">
            <div class="card-body">
              <h2 class="h6 card-title mb-1">${p.nombre}</h2>
              <p class="producto-precio mb-1">$${p.precio.toFixed(2)}</p>
              <div class="estrellas" aria-label="${p.estrellas} de 5 estrellas">${estrellasHTML(p.estrellas)}</div>
            </div>
          </div>
        </div>
      </article>
    </div>`;
}

function render() {
  const cont = document.getElementById('listaProductos');
  const lista = productosFiltrados();

  if (lista.length === 0) {
    cont.innerHTML = `
      <div class="col-12">
        <div class="alert alert-light border text-center mb-0">
          No se encontraron productos para "<strong>${estado.texto}</strong>".
        </div>
      </div>`;
    return;
  }

  cont.innerHTML = lista.map(tarjetaHTML).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('inputBuscar');
  const form  = document.getElementById('formBuscar');
  const btn   = document.getElementById('btnFiltrar');

  input.addEventListener('input', e => {
    estado.texto = e.target.value;
    render();
  });

  form.addEventListener('submit', e => e.preventDefault());

  btn.addEventListener('click', () => {
    estado.texto = input.value;
    render();
  });

  render();
});
