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
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} USD</p>
    `;
    shopContent.append(content);
    
    let comprar = document.createElement("button")
    comprar.innerText = "Comprar";
    comprar.className = "Comprar";

    content.append(comprar);

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

