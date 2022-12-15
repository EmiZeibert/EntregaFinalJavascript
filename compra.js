let productoElegidos = localStorage.getItem("productos-elegidos");
productoElegidos = JSON.parse(productoElegidos);

const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAccion = document.querySelector("#carrito-accion");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const vaciarCarrito = document.querySelector("#carrito-accion-vaciar");
let botonEliminar = document.querySelectorAll(".carrito-eliminar");
const contenedorTotal = document.querySelector("#total");
const comprarAhora = document.querySelector("#carrito-accion-comprar");


function productosCarrito() {
    if (productoElegidos && productoElegidos.length > 0) {
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAccion.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoVacio.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productoElegidos.forEach(producto => {

            const div = document.createElement("div");

            div.classList.add("carrito-productos");

            div.innerHTML = `
        <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="carrito-producto-titulo">
            <small>Título</small>
            <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito-producto-cantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
            <small>Precio</small>
            <p>$${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>$${producto.precio * producto.cantidad}</p>
        </div>
        <button class="carrito-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
    `;
            contenedorCarritoProductos.append(div);
        })


    } else {
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAccion.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoVacio.classList.remove("disabled");
    }
    actBotonEliminar();
    actTotal();
}
productosCarrito();

function actBotonEliminar() {
    botonEliminar = document.querySelectorAll(".carrito-eliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelcarrito);
    });
}

function eliminarDelcarrito(e) {
    const idBoton = e.currentTarget.id;
    const indice = productoElegidos.findIndex(producto => producto.id === idBoton);

    productoElegidos.splice(indice, 1);
    productosCarrito();

    localStorage.setItem("productos-elegidos", JSON.stringify(productoElegidos));
}

vaciarCarrito.addEventListener("click",carritovaciar);
function carritovaciar() {
    productoElegidos.length =0;
    localStorage.setItem("productos-elegidos", JSON.stringify(productoElegidos));
    productosCarrito();  
}

function actTotal() {
    const totalProducto = productoElegidos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalProducto}`;
}

comprarAhora.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productoElegidos.length = 0;
    localStorage.setItem("productos-elegidos", JSON.stringify(productoElegidos));
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAccion.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}



