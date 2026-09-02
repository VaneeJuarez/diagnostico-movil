const PRODUCTOS = [
  { id: 1, nombre: 'Audífonos Inalámbricos', precio: 59.99,  estrellas: 5, categoria: 'Tecnología' },
  { id: 2, nombre: 'Smartwatch Pro',         precio: 89.99,  estrellas: 4, categoria: 'Tecnología' },
  { id: 3, nombre: 'Cámara Digital',         precio: 199.99, estrellas: 5, categoria: 'Tecnología' },
  { id: 4, nombre: 'Mochila Urbana',         precio: 39.99,  estrellas: 4, categoria: 'Accesorios' },
  { id: 5, nombre: 'Teclado Mecánico',       precio: 74.99,  estrellas: 5, categoria: 'Tecnología' },
  { id: 6, nombre: 'Lámpara de Escritorio',  precio: 24.99,  estrellas: 3, categoria: 'Hogar' },
  { id: 7, nombre: 'Botella Térmica',        precio: 18.99,  estrellas: 4, categoria: 'Accesorios' },
  { id: 8, nombre: 'Altavoz Bluetooth',      precio: 45.99,  estrellas: 4, categoria: 'Tecnología' },
  { id: 9, nombre: 'Ratón Inalámbrico',      precio: 22.50,  estrellas: 4, categoria: 'Tecnología' },
  { id: 10, nombre: 'Organizador de Cables', precio: 12.99,  estrellas: 3, categoria: 'Hogar' },
];

const IMG = 'assets/img/producto.svg';
const POR_PAGINA = 4;

const estado = {
  texto: '',
  pagina: 1,
};

function productosFiltrados() {
  const t = estado.texto.trim().toLowerCase();
  if (!t) return PRODUCTOS;
  return PRODUCTOS.filter(p => p.nombre.toLowerCase().includes(t));
}

function totalPaginas(lista) {
  return Math.max(1, Math.ceil(lista.length / POR_PAGINA));
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

function renderLista() {
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

  const inicio = (estado.pagina - 1) * POR_PAGINA;
  const pagina = lista.slice(inicio, inicio + POR_PAGINA);
  cont.innerHTML = pagina.map(tarjetaHTML).join('');
}

function renderPaginacion() {
  const ul = document.getElementById('paginacion');
  const lista = productosFiltrados();
  const paginas = totalPaginas(lista);

  if (lista.length === 0) { ul.innerHTML = ''; return; }

  let html = `
    <li class="page-item ${estado.pagina === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" data-pagina="${estado.pagina - 1}" aria-label="Anterior">&laquo;</a>
    </li>`;

  for (let i = 1; i <= paginas; i++) {
    html += `
      <li class="page-item ${i === estado.pagina ? 'active' : ''}">
        <a class="page-link" href="#" data-pagina="${i}">${i}</a>
      </li>`;
  }

  html += `
    <li class="page-item ${estado.pagina === paginas ? 'disabled' : ''}">
      <a class="page-link" href="#" data-pagina="${estado.pagina + 1}" aria-label="Siguiente">&raquo;</a>
    </li>`;

  ul.innerHTML = html;
}

function render() {
  const lista = productosFiltrados();
  const paginas = totalPaginas(lista);
  if (estado.pagina > paginas) estado.pagina = paginas;
  if (estado.pagina < 1) estado.pagina = 1;

  renderLista();
  renderPaginacion();
}

function buscar(valor) {
  estado.texto = valor;
  estado.pagina = 1;
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('inputBuscar');
  const form  = document.getElementById('formBuscar');
  const btn   = document.getElementById('btnFiltrar');
  const ul    = document.getElementById('paginacion');

  input.addEventListener('input', e => buscar(e.target.value));
  form.addEventListener('submit', e => { e.preventDefault(); buscar(input.value); });
  btn.addEventListener('click', () => buscar(input.value));

  ul.addEventListener('click', e => {
    const enlace = e.target.closest('[data-pagina]');
    if (!enlace) return;
    e.preventDefault();
    const p = Number(enlace.dataset.pagina);
    if (!Number.isNaN(p)) {
      estado.pagina = p;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  render();
});
