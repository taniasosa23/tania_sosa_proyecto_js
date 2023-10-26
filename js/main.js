class Gasto {
    constructor(concepto, cantidad, usuario) {
        this.fecha = new Date().toLocaleString();
        this.concepto = concepto;
        this.cantidad = cantidad;
        this.usuario = usuario;
    }
}

const historialGastos = JSON.parse(localStorage.getItem("historialGastos")) || [];

const agregarGasto = (concepto, cantidad, usuario) => {
    const nuevoGasto = new Gasto(concepto, cantidad, usuario);
    historialGastos.push(nuevoGasto);
    localStorage.setItem("historialGastos", JSON.stringify(historialGastos));
    mostrarGastos ()
}
const mostrarGasto = ({concepto, cantidad, usuario, fecha}) => {
    const tablaDatosCargados = document.getElementById("tablaDatosCargados");
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${concepto}</td>
        <td>${cantidad}</td>
        <td>${usuario}</td>
        <td>${fecha}</td>
    `;
    tablaDatosCargados.append(fila);
}
const mostrarGastos = () => {
    const tablaDatosCargados = document.getElementById("tablaDatosCargados")
    tablaDatosCargados.innerHTML = ""
    historialGastos.forEach ((gasto)=> {
        mostrarGasto(gasto)
    }
    )
}

const calcularTotalGastos = () => {
    return historialGastos.reduce((acc, gasto) => acc + gasto.cantidad, 0)
}

const cargarGasto = () => {
const formCargarGasto = document.getElementById("formCargarGasto");
formCargarGasto.addEventListener("submit", (e) => {
    e.preventDefault();
    const concepto = e.target.elements["concepto"].value;
    const cantidad = parseFloat(e.target.elements["cantidad"].value);
    const usuario = e.target.elements["usuario"].value;

    if (!isNaN(cantidad)) {
        agregarGasto(concepto, cantidad, usuario);
        formCargarGasto.reset();
    } else {
        alert("Cantidad inválida. Ingresa un número.");
    }
});    
}
const calcularTotal = () => {

    const btnTotalGastos = document.getElementById("btnTotalGastos");
    btnTotalGastos.addEventListener("click", () => {
        const mostrarTotalGastos = document.getElementById("mostrarTotalGastos");
        mostrarTotalGastos.innerText = calcularTotalGastos();
    });

}

const buscarGastosPorConcepto = (concepto) => {
        return historialGastos.filter(gasto => gasto.concepto.toLowerCase().includes(concepto.toLowerCase()));
    
}


const buscar = () => {
    const btnBuscarConcepto = document.getElementById("btnBuscarConcepto");
    btnBuscarConcepto.addEventListener("click", () => {
        const conceptoABuscar = document.getElementById("inputBuscarConcepto").value;
        const resultados = buscarGastosPorConcepto(conceptoABuscar);
    
        const modalTablaResultados = document.getElementById("modalTablaResultados");
        modalTablaResultados.innerHTML = "";
        resultados.forEach(gasto => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${gasto.fecha}</td>
                <td>${gasto.concepto}</td>
                <td>${gasto.cantidad}</td>
                <td>${gasto.usuario}</td>
            `;
            modalTablaResultados.appendChild(fila);
        });
    
        const modal = new bootstrap.Modal(document.getElementById('modalResultados'));
        modal.show();
    });
    

}

cargarGasto ()
mostrarGastos ()
calcularTotal ()
buscar ()



// Carrousel 

const carouselInner = document.getElementById("carouselInner")
const carouselIndicators = document.getElementById("carouselIndicators")
const traerDataCarousel = async () =>{
    const response = await fetch("./dataCarousel.json")
    const dataCarousel = await response.json()
    dataCarousel.forEach((element,index) => {
  
        const div = document.createElement("div")
        if( index == 0){
            div.className= "carousel-item active"
        }else{
            div.className= "carousel-item"
            const miBoton = document.createElement("button")
            miBoton.setAttribute('type', 'button')
            miBoton.setAttribute('data-bs-target', '#carouselExampleCaptions')
            miBoton.setAttribute('data-bs-slide-to', index)
            miBoton.setAttribute('aria-label', "Slide" + index)
            carouselIndicators.append(miBoton)
        }
        
        div.innerHTML = `<img src="${element.imagen}" class="d-block w-100" alt="...">
                         <div class="carousel-caption d-none d-md-block">
                            <h5>${element.titulo}</h5>
                            <p>${element.descripcion}</p>
                        </div>
        `
        carouselInner.append(div)
    });
}

traerDataCarousel()