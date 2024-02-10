function redireccionar() {
    window.location.href = "game.html";
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
            inputsize.style.backgroundColor = ''
            iniciar.disabled = false;
        }
    } else {
        inputsize.style.backgroundColor = 'red';
        iniciar.disabled = true;
    }
}

function generarMatriz() {
    const inputsize = document.getElementById('inputsize');
    const size = parseInt(inputsize.value.trim());

    const matriz = [];
    for (let i = 0; i < size; i++) {
      const fila = [];
      for (let j = 0; j < size; j++) {
        const numeroAleatorio = Math.floor(Math.random() * 50) + 1;
        fila.push(numeroAleatorio);
      }
      matriz.push(fila);
    }
  }