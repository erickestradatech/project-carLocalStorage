// Todo el bloque del carrito(TODO)
const carrito = document.querySelector('#carrito');

// Los productos seleccionados(CUERPO)
const contenedorCarrito = document.querySelector('#lista-carrito tbody');

// Selecionar el boton para borrar todos los productos del carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

// Todo el bloque que contiende a todos los cursos
const listaCursos = document.querySelector('#lista-cursos');

/**
 * Carrito de compras
 *
 * Usamos let porque agregaremos mas elementos al arreglo con spread operator
 */
let articulosCarrito = [];

// Aqui se cargaran todos los eventListeners
const cargarEventListeners = () => {
   // Agregar curso presionando "Agregar al carrito"
   listaCursos.addEventListener('click', agregarCurso);

   // Elimina curso del carrito
   carrito.addEventListener('click', eliminarCurso);

   // Vaciar el carrito
   vaciarCarritoBtn.addEventListener('click', () => {
      articulosCarrito = []; // reseteamos el arreglo

      limpiarHTML();
   });
};

// Mandar llamar los eventos de la función cargarEventListeners
cargarEventListeners();

// Funcion para agregar un curso en la lista de cards
/**
 * NOTAS:
 * e.target: Sirve para saber en donde le estoy dando click
 *
 * contains: Si esta contenido
 *
 *  e.preventDefault(): Previene la accion por default del enlace en este caso
 */
function agregarCurso(e) {
   // Para que recargue la pagina
   e.preventDefault();

   // Si donde doy click contiene la clase 'agregar-carrito
   if (e.target.classList.contains('agregar-carrito')) {
      /**
       * Ir desde <a>Agregar al carrito </a> hasta <div class=card>... </div>
       *
       * Para no pasar un codigo largo en la funcion leetDatosCurso creo la constante cursoSeleccionado
       */
      const cursoSeleccionado = e.target.parentElement.parentElement;

      leerDatosCurso(cursoSeleccionado);
   }
}

// Elimina el curso del carrito
function eliminarCurso(e) {
   if (e.target.classList.contains('borrar-curso')) {
      /*      const cursoId = e.target.getAttribute('data-id');

      // Elimina del arreglo de articulos carrito por el data-id
      // Quiero que me traiga todos los articulos, excepto que el que cumpla la condicion, para lugar mostrarlo en el carrito
      articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

      // Volvemos a iterar sobre el carrito y mostrar su HTML
      carritoHTML();
 */
      const cursoId = e.target.getAttribute('data-id');

      articulosCarrito.forEach((curso) => {
         if (curso.id === cursoId) {
            if (curso.cantidad > 1) {
               curso.cantidad--;

               carritoHTML();
            } else {
               articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

               carritoHTML();
            }
         }
      });
   }
}

/**
 *  Funcion para leer el <div class=card>...</div> a la cual le dimos click, el parametro 'curso' es cursoSeleccionado de la funcion agregarCurso(e)
 *
 * curso = e.target.parentElement.parentElement
 */
function leerDatosCurso(curso) {
   // Crea un objeto con el contenido del curso actual

   // console.log(curso);
   const infoCurso = {
      // Imagen del card
      imagen: curso.querySelector('img').src,
      // titulo del card
      titulo: curso.querySelector('h4').textContent,
      // precio del card que esta dentro de un span
      precio: curso.querySelector('.precio span').textContent,
      // id de cada curso(card) que contiene el atributo data-id
      id: curso.querySelector('a').getAttribute('data-id'),
      // Cada vez que añadimos un curso comenzaremos por 1
      cantidad: 1,
   };

   // Revisa si un elemento ya existe en el carrito
   const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
   if (existe) {
      // Actualizamos la cantidad
      const cursos = articulosCarrito.map((curso) => {
         if (curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso; // retorna el objeto actualizado
         } else {
            return curso; // retorna los objetos que no son los duplicados
         }
      });

      articulosCarrito = [...cursos];
   } else {
      // Agrega elementos al arreglo de carrito
      // Mostrar en consola para ir testeando todo que estamos añadiendo en el objeto infoCurso(Contiene los datos de los cursos, la cual lo añadiremos en le carrito de compras(table))
      // console.log(infoCurso);

      // Agregar elementos al arreglo carrito
      articulosCarrito = [...articulosCarrito, infoCurso];
      console.log(articulosCarrito);
   }

   carritoHTML();
}

// Muestra el carrito de compras en el HTML(tbody) donde esta el icono de compras
function carritoHTML() {
   // Limpiar el HTML
   limpiarHTML();

   // Recorre el carrito y genera el HTML
   articulosCarrito.forEach((curso) => {
      const { imagen, titulo, precio, cantidad, id } = curso;

      const row = document.createElement('tr');

      row.innerHTML = `
         <td> 
            <img src="${imagen}" width="100px" />
         </td>
         <td> ${titulo} </td>
         <td> ${precio} </td>
         <td> ${cantidad} </td>
         <td> 
            <a hred="#" class="borrar-curso" data-id="${id}">x</a>
         </td>
      `;

      // Agrega el HTML del carrito en el tbody
      contenedorCarrito.appendChild(row);
   });

   // Agregar el carrito de compras al Local Storage
}

// Elimina los curso del tbody
function limpiarHTML() {
   // Forma lenta
   // contenedorCarrito.innerHTML = '';

   while (contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild);
   }
}
