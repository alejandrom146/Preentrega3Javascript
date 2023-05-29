/*Array de productos*/ 
const productos = [
    {   id: 1,
        nombre: "Orbea",
        precio: 500,
        img: './assets/Orbea1.jpg'
    },
    {   id: 2,
        nombre: "Orbea Enduro",
        precio: 1000,
        img: './assets/Orbea2.jpg'
    },
    {   id: 3,
        nombre: "Orbea Speed",
        precio: 1500,
        img: './assets/Orbea3.jpg'
    },
    {   id: 4,
        nombre: "Orbea Dh",
        precio: 2000,
        img: './assets/Orbea4.jpg'}];

/*capturo variable con ID de Html*/ 
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* creo elementos e utilizo for each para recorrer los productos y mostrar en web */
productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} USD</p>
    `;

    shopContent.append(content);
/* boton */     
    let comprar = document.createElement("button")
    comprar.innerText = "Comprar";
    comprar.className = "Comprar";

    content.append(comprar);
/*Agrego funcionalidad al boton comprar y pushear a carrito */ 
    comprar.addEventListener("click", () =>{
        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
    });
            console.log(carrito);
            savelocal();
    });
});
/*Al hacer click el usuario puede visualizar el carrito */
verCarrito.addEventListener("click", () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
     <h1 class ="modal-header-tittle">Carrito</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "❌";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", ()=> {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

/*Para ver cada producto que haya elegido el usuario y for each para recorrerlo*/ 
    carrito.forEach((product) => {
      let carritoContent = document.createElement("div")
      carritoContent.className = "modal-content"
      carritoContent.innerHTML = `
       <img src="${product.img}">
       <h3>${product.nombre}</h3>
       <p>${product.precio}</p>
      `;

      modalContainer.append(carritoContent)
    });
/*usando metodo reduce para contabilizar el total de lo que eligio el usuario*/ 
    const total = carrito.reduce((acc, el) => acc + el.precio, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: ${total} $`; 
    modalContainer.append(totalBuying);
});  


// Local storage
const savelocal = () => {
  localStorage.setItem("carrito", JSON.stringify (carrito));
};

