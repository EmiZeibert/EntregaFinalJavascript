
const productos = [
    {
        id: "notebook-Exo",
        titulo: "Notebook Exo",
        imagen: "./imagenes/notebook65000.jpg",
        categoria: {
            nombre: "Celulares-notebook",
            id: "Celulares-notebook"
        },
        precio: 85000
    },
    {
        id: "notebook-Acer",
        titulo: "Notebook Acer",
        imagen: "./imagenes/notebook85000.jpg",
        categoria: {
            nombre: "Celulares-notebook",
            id: "Celulares-notebook"
        },
        precio: 65000
    },
    {
        id: "parlante-Chico",
        titulo: "Parlante Chico",
        imagen: "./imagenes/parlante10500.jpg",
        categoria: {
            nombre: "Audio-video",
            id: "Audio-video"
        },
        precio: 10500
    },
    {
        id: "parlante-Grande",
        titulo: "Parlante Grande",
        imagen: "./imagenes/parlante20000.jpg",
        categoria: {
            nombre: "Audio-video",
            id: "Audio-video"
        },
        precio: 20600
    },
    {
        id: "celular-SamsungA03",
        titulo: "Celular SamsungA03",
        imagen: "./imagenes/samsunga03.jpg",

        categoria: {
            nombre: "Celulares-notebook",
            id: "Celulares-notebook"
        },
        precio: 52000
    },
    {
        id: "celular-MotorolaE20",
        titulo: "Celular MotorolaE20",
        imagen: "./imagenes/motorolae20.jpg",
        categoria: {
            nombre: "Celulares-notebook",
            id: "Celulares-notebook"
        },
        precio: 34000
    },
    {
        id: "smartv-43p",
        titulo: "Smartv 43p",
        imagen: "./imagenes/smart43.jpg",

        categoria: {
            nombre: "Audio-video",
            id: "Audio-video"
        },
        precio: 73000
    },
    {
        id: "smartv-32p",
        titulo: "Smartv 32p",
        imagen: "./imagenes/smart32.jpg",
        categoria: {
            nombre: "Audio-video",
            id: "Audio-video"
        },
        precio: 45000
    },
    {
        id: "auricular-Newvision",
        titulo: "Auricular Newvision",
        imagen: "./imagenes/auricular2500.jpg",
        categoria: {
            nombre: "Audio-video",
            id: "Audio-video"
        },
        precio: 2500
    },
    {
        id: "auricular-Redragon",
        titulo: "Auricular Redragon",
        imagen: "../imagenes/auricular5000.jpg",

        categoria: {
            nombre: "Audio-video",
            id: "Audio-video"
        },
        precio: 5000
    },
    {
        id: "tablet-Philips",
        titulo: "Tablet Philips",
        imagen: "./imagenes/tablet45000.jpg",
        categoria: {
            nombre: "Audio-video",
            id: "Audio-video"
        },
        precio: 45000
    },
    {
        id: "tablet-Lenovo",
        titulo: "Tablet Lenovo",
        imagen: "./imagenes/tablet54000.jpg",
        categoria: {
            nombre: "Audio-video",
            id: "Audio-video"
        },
        precio: 54000
    }

];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
let agregarP = document.querySelectorAll(".producto-agregar");
const tPrincipal = document.querySelector("#tPrincipal");
const numeroCarri = document.querySelector("#numeroCarri");

function cargarProductos(elegirProductos) {
    contenedorProductos.innerHTML = "";

    elegirProductos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-agregar" id=${producto.id}>Agregar</button>
                    </div>`;

        contenedorProductos.append(div);
    })
    actBotones();
}
cargarProductos(productos);
botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productosFiltrar = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosFiltrar);
            const tituloCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tPrincipal.innerText = tituloCategoria.categoria.nombre;
        } else {
            tPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })

});
function actBotones() {
    agregarP = document.querySelectorAll(".producto-agregar");
    agregarP.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productoElegidos;

let productosEnCarritoLS = localStorage.getItem("productos-elegidos");

if (productosEnCarritoLS) {
    productoElegidos = JSON.parse(productosEnCarritoLS);
    cantidadProductosCarrito();
} else {
    productoElegidos = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton)

    if (productoElegidos.some(producto => producto.id === idBoton)) {
        const buscar = productoElegidos.findIndex(producto => producto.id === idBoton);
        productoElegidos[buscar].cantidad++;

    } else {
        productoAgregado.cantidad = 1;
        productoElegidos.push(productoAgregado);
    }

    cantidadProductosCarrito();
    localStorage.setItem("productos-elegidos", JSON.stringify(productoElegidos));

}
function cantidadProductosCarrito() {
    let cambioNumeros = productoElegidos.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarri.innerText = cambioNumeros;
}

contenedorProductos.addEventListener("click", () => {
    Swal.fire({
        title: 'Agregado',
        text: 'tu producto ya esta en el carrito!',
        icon: 'success'
    })
})









