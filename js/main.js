function procesarGastos() {
    let totalGastos = 0;

    while(true) {
        let gasto = prompt("Ingresa un gasto:");

        if (gasto === null) {
            
            break;
        }

        if (gasto.toLowerCase() === "salir") {
            break;
        }

        let cantidad = parseFloat(prompt("Ingresa la cantidad del gasto: escribe cancelar para terminar"));

        if (!isNaN(cantidad)) {
            totalGastos += cantidad;
        } else {
            alert("Cantidad inválida. Ingresa un número.");
        }
    }

    alert(`El total de gastos es: $${totalGastos.toFixed(2)}`);
}

procesarGastos();
