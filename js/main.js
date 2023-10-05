class Gasto {
    constructor(concepto, cantidad, usuario) {
        this.fecha = new Date();
        this.concepto = concepto;
        this.cantidad = cantidad;
        this.usuario = usuario;
    }
}

const historialGastos = JSON.parse(localStorage.getItem("historialGastos")) || [];

const agregarGasto = (concepto, cantidad, usuario, fecha) => {
    const nuevoGasto = new Gasto(concepto, cantidad, usuario, fecha);
    historialGastos.push(nuevoGasto);
    localStorage.setItem("historialGastos", JSON.stringify(historialGastos));

    const tablaDatosCargados = document.getElementById("tablaDatosCargados");
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${concepto}</td>
        <td>${cantidad}</td>
        <td>${usuario}</td>
        <td>${fecha}</td>
    `;
    tablaDatosCargados.appendChild(fila);
}

const calcularTotalGastos = () => {
    return historialGastos.reduce((acc, gasto) => acc + gasto.cantidad, 0)
}

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

const btnTotalGastos = document.getElementById("btnTotalGastos");
btnTotalGastos.addEventListener("click", () => {
    const mostrarTotalGastos = document.getElementById("mostrarTotalGastos");
    mostrarTotalGastos.innerText = calcularTotalGastos();
});

const btnBuscarConcepto = document.getElementById("btnBuscarConcepto");
btnBuscarConcepto.addEventListener("click", () => {
    const conceptoABuscar = document.getElementById("inputBuscarConcepto").value;
    const resultados = buscarGastosPorConcepto(conceptoABuscar);

    const tablaResultados = document.getElementById("tablaResultados");
    tablaResultados.innerHTML = "";
    resultados.forEach(gasto => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${gasto.fecha}</td>
            <td>${gasto.concepto}</td>
            <td>${gasto.cantidad}</td>
            <td>${gasto.usuario}</td>
        `;
        tablaResultados.appendChild(fila);
    });
});

function buscarGastosPorConcepto(concepto) {
    return historialGastos.filter(gasto => gasto.concepto.toLowerCase().includes(concepto.toLowerCase()));
}
