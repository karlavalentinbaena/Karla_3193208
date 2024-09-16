// Lista de productos disponibles en la tienda
var productos = [
    { nombre: 'Blusa', precio: 250 },
    { nombre: 'Vestido', precio: 700 },
    { nombre: 'Zapatillas', precio: 900 },
    { nombre: 'Jeans', precio: 500 }
];

// Carrito de compras (arreglo vacío)
var carrito = [];

// Función para mostrar el menú de productos
function mostrarMenu() {
    var menu = "Seleccione los productos que quisiera agregar:\n";
    for (var i = 0; i < productos.length; i++) {
        menu += (i + 1) + ". " + productos[i].nombre + " - $" + productos[i].precio + "\n";
    }
    menu += (productos.length + 1) + ". Ver Carrito y Total\n";
    menu += (productos.length + 2) + ". Salir\n";
    return menu;
}

// Función para agregar productos al carrito y la cantidad
function agregarAlCarrito(index, cantidad) {
    var productoSeleccionado = productos[index];

    // Buscar si el producto ya está en el carrito
    var productoEnCarrito = carrito.find(item => item.nombre === productoSeleccionado.nombre);
    if (productoEnCarrito) {
        // Si ya está en el carrito se suma
        productoEnCarrito.cantidad += cantidad;
    } else {
        // Si no está se agrega dependiendo cuánto quiera
        carrito.push({ nombre: productoSeleccionado.nombre, precio: productoSeleccionado.precio, cantidad: cantidad });
    }

    console.log('Se agregó ' + cantidad +  productoSeleccionado.nombre + '" al carrito.');
}

// Función para mostrar el carrito y el total
function mostrarCarritoYTotal() {
    if (carrito.length === 0) {
        console.log("El carrito está vacío.");
    } else {
        var mensajeCarrito = "Carrito de compras:\n";
        var total = 0;
        for (var i = 0; i < carrito.length; i++) {
            var subtotal = carrito[i].precio * carrito[i].cantidad;
            mensajeCarrito += (i + 1) + ". " + carrito[i].nombre + " (x" + carrito[i].cantidad + ") - $" + subtotal + "\n";
            total += subtotal;
        }
        mensajeCarrito += "\nTotal: $" + total;
        console.log(mensajeCarrito);
    }
}

// Bucle principal de la tienda
function agregarVariosAlCarrito() {
    var continuar = true;
    while (continuar) {
        var opcion = prompt(mostrarMenu());
        opcion = Number(opcion);
        
        if (isNaN(opcion) || opcion < 1 || opcion > productos.length + 2) {
            console.log("Opción no válida, por favor intenta de nuevo.");
        } else if (opcion >= 1 && opcion <= productos.length) {
            // para preguntar cuántas prendas quiere agregar
            var cantidad = Number(prompt("¿Cuántas unidades de " + productos[opcion - 1].nombre + " quiere agregar?"));

            // Validar la cantidad ingresada
            if (isNaN(cantidad) || cantidad <= 0) {
                console.log("Esta cantidad no es válida, por favor intenta de nuevo.");
            } else {
                agregarAlCarrito(opcion - 1, cantidad);
            }
        } else if (opcion === productos.length + 1) {
            // Si elige ver el carrito y el total
            mostrarCarritoYTotal();
        } else if (opcion === productos.length + 2) {
            // Si elige salir del proceso
            continuar = false;
        }
    }
}

agregarVariosAlCarrito();
console.log("Gracias por visitar la tienda :).");

