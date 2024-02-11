function redireccionar() {
    window.location.href = "game.html";
  }

function redireccionar2() {
    window.location.href = "index.html";
}

function habilitarBoton() {
    const inputs = document.querySelectorAll('input[type="text"]');
    let contador = 0;
    inputs.forEach(function(input) {
      if (input.value.trim() !== '') {
        contador++;
      }
    });
    const inputsize = document.getElementById('inputsize');
    const valorinputsize = parseInt(inputsize.value.trim());
    const iniciar = document.getElementById('iniciar');
    if (valorinputsize >= 3 && valorinputsize <= 5) {
        if(contador === 5){
            inputsize.style.backgroundColor = ""
            iniciar.disabled = false;
        }
    } else {
        inputsize.style.backgroundColor = "red";
        iniciar.disabled = true;
    }
}

function generarMatriz(size) {
    const matriz = [];
    for (let i = 0; i < size; i++) {
      const fila = [];
      for (let j = 0; j < size; j++) {
        const numeroAleatorio = Math.floor(Math.random() * 50) + 1;
        fila.push(numeroAleatorio);
      }
      matriz.push(fila);
    }
    return matriz;
}

function generarYMostrarCarton(matriz) {
    const tablero = document.getElementById("tablero");
    tablero.innerHTML = "";
    const size = matriz.length;
    for (let i = 0; i < size; i++) {
      const fila = document.createElement("tr");
      for (let j = 0; j < size; j++) {
        const celda = document.createElement("td");
        celda.textContent = matriz[i][j];
        fila.appendChild(celda);
      }
      tablero.appendChild(fila);
    }
}

function guardarTamano() {
    const size = document.getElementById("inputsize").value.trim();
    const jugadores = [
        { nombre: "Jugador 1", carton: generarMatriz(size) },
        { nombre: "Jugador 2", carton: generarMatriz(size) },
        { nombre: "Jugador 3", carton: generarMatriz(size) },
        { nombre: "Jugador 4", carton: generarMatriz(size) }
    ];
    localStorage.setItem("jugadores", JSON.stringify(jugadores));
}

document.addEventListener("DOMContentLoaded", function() {
    const seleccionarJugador = document.getElementById("seleccionarJugador");
    if (seleccionarJugador) {
        seleccionarJugador.addEventListener("change", function() {
            const jugadores = JSON.parse(localStorage.getItem("jugadores"));
            if (jugadores) {
                console.log(jugadores);
                const opcionSeleccionada = seleccionarJugador.options[seleccionarJugador.selectedIndex].id;
                for (let i = 0; i < jugadores.length; i++) {
                    if (opcionSeleccionada === jugadores[i].nombre) {
                        generarYMostrarCarton(jugadores[i].carton);
                        break;
                    }
                }
            }
        });
    }
});

function marcarCelda(numero) {
    const tablero = document.getElementById("tablero");
    const celdasMarcadas = [];
    for (let i = 0; i < tablero.rows.length; i++) {
        const fila = tablero.rows[i];
        for (let j = 0; j < fila.cells.length; j++) {
            const celda = fila.cells[j];
            const row = i;
            const col = j;
            if (parseInt(celda.textContent) === numero && !celdasMarcadas.includes(`${row}-${col}`)) {
                celda.classList.add("marcada");
                celdasMarcadas.push(`${row}-${col}`);
            }
        }
    }
}

function calcularPuntos() {
    let puntos = 0;
    const carton = document.getElementById("tablero");
    const size = carton.rows.length;

    for (let i = 0; i < size; i++) {
        let marcadasEnFila = true;
        for (let j = 0; j < size; j++) {
            const celda = carton.rows[i].cells[j];
            if (!celda.classList.contains("marcada")) {
                marcadasEnFila = false;
                break;
            }
        }
        if (marcadasEnFila) puntos++;
    }

    for (let i = 0; i < size; i++) {
        let marcadasEnColumna = true;
        for (let j = 0; j < size; j++) {
            const celda = carton.rows[j].cells[i];
            if (!celda.classList.contains("marcada")) {
                marcadasEnColumna = false;
                break;
            }
        }
        if (marcadasEnColumna) puntos++;
    }

    let diagonal1Marcada = true;
    let diagonal2Marcada = true;
    for (let i = 0; i < size; i++) {
        const celda1 = carton.rows[i].cells[i];
        const celda2 = carton.rows[i].cells[size - 1 - i];
        if (!celda1.classList.contains("marcada")) {
            diagonal1Marcada = false;
        }
        if (!celda2.classList.contains("marcada")) {
            diagonal2Marcada = false;
        }
    }
    if (diagonal1Marcada || diagonal2Marcada) puntos += 2;

    let cartonLleno = true;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const celda = carton.rows[i].cells[j];
            if (!celda.classList.contains("marcada")) {
                cartonLleno = false;
                break;
            }
        }
        if (!cartonLleno) break;
    }
    if (cartonLleno) puntos += 5;

    const puntosDiv = document.getElementById("puntos");
    puntosDiv.textContent = puntos;
}

function sacarBola() {
    let numeros = [];
    if(numeros.length === 0){
      for (let i = 1; i <= 50; i++) {
          numeros.push(i);
      }
    }
    const numero = Math.floor(Math.random() * numeros.length);
    const numeroAleatorio = numeros.splice(numero, 1)[0];
    const number = document.getElementById("number");
    number.innerHTML = "";
    number.textContent = numeroAleatorio;
    marcarCelda(numeroAleatorio)
}

function descontarTurnos() {
    const contadorTurnos = document.getElementById("turnos");
    let turnosRestantes = parseInt(contadorTurnos.textContent);
    turnosRestantes--;
    contadorTurnos.textContent = turnosRestantes;
    if (turnosRestantes === 0) {
      document.getElementById("sb").disabled = true;
    }
}

