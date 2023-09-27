
function Gasto(concepto, cantidad) {
    this.concepto = concepto;
    this.cantidad = cantidad;
}

let historialGastos = [];

function agregarGasto(concepto, cantidad) {
    let nuevoGasto = new Gasto(concepto, cantidad);
    historialGastos.push(nuevoGasto);
}

function calcularTotalGastos() {
    let totalGastos = 0;
    for (let i = 0; i < historialGastos.length; i++) {
        totalGastos += historialGastos[i].cantidad;
    }
    return totalGastos;
}

function simularControlDeGastos() {
    while (true) {
        let concepto = prompt("Ingresa el nombre del gasto (o escribe 'salir' para terminar):");

        if (concepto === null || concepto.toLowerCase() === "salir") {
            break;
        }

        let cantidad = parseFloat(prompt(`Ingresa la cantidad que se gasto en "${concepto}":`));

        if (!isNaN(cantidad)) {
            agregarGasto(concepto, cantidad);
        } else {
            alert("Cantidad inválida. Ingresa un número.");
        }
    }

    let totalGastos = calcularTotalGastos();
    alert(`El total de gastos es: $${totalGastos.toFixed(2)}`);
}


simularControlDeGastos();
