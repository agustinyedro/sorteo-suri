// public/js/script.js

let selectedNumbers = [];

function handleClick(numero, estado, esAdmin) {
  if (esAdmin) {
    if (selectedNumbers.includes(numero)) {
        
        selectedNumbers = selectedNumbers.filter(num => num !== numero);
      } else {
        selectedNumbers.push(numero);
      }
      abrirFormulario(selectedNumbers, estado);
  } else {
      if (selectedNumbers.includes(numero)) {
        
      selectedNumbers = selectedNumbers.filter(num => num !== numero);
    } else {
      selectedNumbers.push(numero);
    }
    updateButton(estado);
  }
}

function updateButton() {
    console.log(selectedNumbers);
  const button = document.getElementById('sendButton');
  if (selectedNumbers.length > 0) {
    button.style.display = 'block';
    button.href = `https://wa.me/5493512270298?text=Hola!%20soy%20....(escribe%20tu%20nombre)%20,%20quiero%20los%20números%20${selectedNumbers.join(',%20')}`;
  } else {
    button.style.display = 'none';
  }
}

function abrirFormulario(numeros, estado) {
  const formButton = document.getElementById('formButton');
  
    if (numeros.length > 0 && estado === 'disponible') {
      formButton.style.display = 'block';
      formButton.href = `/admin/form?numeros=${numeros.join(',')}`;
    } else {
      formButton.style.display = 'none';
    }
  }

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.numeros button').forEach(button => {
    button.addEventListener('click', () => {
      if(button.dataset.estado === 'disponible'){
        
        button.classList.toggle('elegido');
      }
      const numero = parseInt(button.dataset.numero);
      const estado = button.dataset.estado;
      const esAdmin = button.dataset.esadmin === 'true';
      handleClick(numero, estado, esAdmin);
    });
  });
});

document.querySelectorAll('.tachado').forEach(button => {
  console.log("hola");
  button.addEventListener('mouseover', function () {
    console.log("chau");
    const numero = parseInt(this.getAttribute('data-numero'));
    const tooltipText = this.getAttribute('title');

    if (tooltipText) {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = tooltipText;
      document.body.appendChild(tooltip);

      const rect = this.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight}px`;

      this.addEventListener('mouseout', () => {
        tooltip.remove();
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tachado').forEach(button => {
    button.addEventListener('click', function (event) {
      event.stopPropagation(); // Evita que el clic en el botón cierre el popup inmediatamente

      const nombre = this.getAttribute('data-nombre');
      const telefono = this.getAttribute('data-telefono');
      const numero = this.getAttribute('data-numero');

      const popup = document.getElementById('details-popup');
      if (popup) {
        if (nombre && telefono) {
          popup.innerHTML = `
            <h2>Detalles del Número ${numero}</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <button id="close-popup">Cerrar</button>
          `;
          popup.style.display = 'block';

          // Obtener la posición del botón
          const rect = this.getBoundingClientRect();

          // Posicionar el popup
          popup.style.position = 'absolute';
          popup.style.left = `${rect.left + window.scrollX}px`;
          popup.style.top = `${rect.top + window.scrollY + this.offsetHeight}px`;

          // Cerrar el popup al hacer clic en el botón de cerrar
          document.getElementById('close-popup').addEventListener('click', () => {
            popup.style.display = 'none';
          });
          
          // Cerrar el popup al hacer clic fuera de él
          document.addEventListener('click', (event) => {
            if (!popup.contains(event.target) && !button.contains(event.target)) {
              popup.style.display = 'none';
            }
          });
        }
      } else {
        console.error('El popup no se encuentra en el DOM.');
      }
    });
  });
});



document.addEventListener('DOMContentLoaded',() => {
  

  const agustin = document.getElementById('agustin');

  agustin.addEventListener('click', () => {
    copiarAlPortapapeles('agustin');
  });
  
  const jorgelina = document.getElementById('jorgelina');

  jorgelina.addEventListener('click', () => {
    copiarAlPortapapeles('jorgelina');
  });
  
  const alias = document.getElementById('alias');

  alias.addEventListener('click', () => {
    copiarAlPortapapeles('alias');
  });

});
function copiarAlPortapapeles(id) {
  const text = document.getElementById(id).innerText;

  // Intentar copiar usando la API del portapapeles
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      mostrarPopup();
    }).catch(err => {
      console.error('Error al copiar con clipboard API: ', err);
      copiarConExecCommand(text); // Fallback si falla
    });
  } else {
    // Si la API de clipboard no está disponible, usar el fallback
    copiarConExecCommand(text);
  }
}

function copiarConExecCommand(text) {
  // Crear un campo de texto temporal
  const inputTemporal = document.createElement('textarea');
  inputTemporal.value = text;

  // Añadirlo al DOM
  document.body.appendChild(inputTemporal);

  // Seleccionar el contenido del campo de texto
  inputTemporal.select();
  inputTemporal.setSelectionRange(0, 99999); // Para dispositivos móviles

  try {
    // Ejecutar el comando de copiar
    document.execCommand('copy');
    console.log('Texto copiado al portapapeles usando execCommand');
    mostrarPopup();
  } catch (err) {
    console.error('Error al copiar con execCommand: ', err);
  }

  // Eliminar el campo de texto temporal
  document.body.removeChild(inputTemporal);
}

function mostrarPopup() {
  const copiadoPopup = document.getElementById('copiado-popup');
  copiadoPopup.style.display = 'flex';
  setTimeout(() => {
    copiadoPopup.style.display = 'none';
  }, 1500);
}
