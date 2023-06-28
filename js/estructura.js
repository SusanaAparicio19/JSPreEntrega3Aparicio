
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// MOSTRAR LOS PRODUCTOS
const mostrarProductos = (productos) => {
	const contenedorProductos = document.querySelector(".product-list");
	contenedorProductos.innerHTML = "";
	productos.forEach((productos) => {
		const li = document.createElement("li");
		li.innerHTML = `
    <img src="${productos.imagen}" alt="${productos.nombre}" />
    <h3>${productos.objeto} ${productos.nombre}</h3>
    <p class="product-description">${productos.descripcion}</p>
    <p class="product-price">$${productos.precio}</p>
    <button id="agregar-${productos.id}" class="add-to-cart">Agregar al carrito</button>
    `;
		contenedorProductos.appendChild(li);
		const boton = document.getElementById(`agregar-${productos.id}`);
		boton.addEventListener("click", () => {
		agregarAlCarrito(productos.id);
		});
	});
};

// AGREGAR EL PRODUCTO AL CARRITO

const agregarAlCarrito = (id) => {
	if (!carrito.some((productos) => productos.id === id)) {
		const producto = productos.find((productos) => productos.id === id);
		carrito.push({ ...producto, cantidad: 1 });
	} else {
		const productos = carrito.find((productos) => productos.id === id);
		productos.cantidad++;
	}
	
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
};

const mostrarCarrito = () => {
	const contenedorCarrito = document.querySelector(".carrito");
	contenedorCarrito.innerHTML = "";
	if (carrito.length > 0) {
		const productsCart = document.createElement("ul");
		productsCart.classList.add("productsCart");
		contenedorCarrito.appendChild(productsCart);
		const contenedorTotal = document.createElement("p");
		actualizarTotal(contenedorTotal);
		contenedorCarrito.appendChild(contenedorTotal);
		carrito.forEach((productos) => {
			const li = document.createElement("li");
			li.innerHTML = `
			<img src="${productos.imagen}" />
			<div class="productContent">
				<h3>${productos.objeto} ${productos.nombre}</h3>
				<p class="product-price">$${productos.precio}</p>
				<div class="counter">
				<button id="restar-${productos.id}" class="button">-</button>
				<span class="product-price">${productos.cantidad}u.</span>
				<button id="sumar-${productos.id}" class="button">+</button>
				</div>
			</div>
			<button id="eliminar-${productos.id}" class="remove">Eliminar</button>
			
		`;
			//eliminar
			productsCart.appendChild(li);
			const boton = document.getElementById(`eliminar-${productos.id}`);
			boton.addEventListener("click", () => {
				eliminarProducto(productos.id);
			});

			// restar.
			const restar = document.getElementById(`restar-${productos.id}`);
			restar.addEventListener("click", () => {
				restarProducto(productos.id);
			});

			// sumar
			const sumar = document.getElementById(`sumar-${productos.id}`);
			sumar.addEventListener("click", () => {
				sumarProducto(productos.id);
			});
		});
	} else {
		
		contenedorCarrito.innerHTML = '<p class="empty">Vacio</p>';
	}
}

const restarProducto = (id) => {
	const productos = carrito.find((prod) => prod.id === id);
	if (productos.cantidad === 1) {
		eliminarProducto(productos.id);
	} else {
		productos.cantidad--;
		localStorage.setItem("carrito", JSON.stringify(carrito));
		mostrarCarrito();
	}
};

const sumarProducto = (id) => {
	const productos = carrito.find((prod) => prod.id === id);
	productos.cantidad++;
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
};

const eliminarProducto = (id) => {
	carrito = carrito.filter((productos) => productos.id !== id);
	localStorage.setItem("carrito", JSON.stringify(carrito));
	mostrarCarrito();
};

const actualizarTotal = (contenedor) => {
	const total = carrito.reduce((acumulador, productos) => acumulador + productos.precio * productos.cantidad, 0);
	contenedor.textContent = `Total: $${total}`;
};

mostrarProductos(productos);
mostrarCarrito();

