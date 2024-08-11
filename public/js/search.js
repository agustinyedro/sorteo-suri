document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('nombre');
    const autocompleteResults = document.getElementById('autocomplete-results');
  
    searchInput.addEventListener('input', async () => {
      const nombre = searchInput.value.trim();
  
      if (nombre) {
        try {
          const response = await fetch(`/admin/search?nombre=${encodeURIComponent(nombre)}`);
          const personas = await response.json();
  
          autocompleteResults.innerHTML = personas.map(persona => `
            <div class="autocomplete-item" data-id="${persona.personas_id}">
              ${persona.nombre} - ${persona.telefono}
            </div>
          `).join('');
  
          autocompleteResults.style.display = 'block';
        } catch (error) {
          console.error('Error al buscar personas:', error);
        }
      } else {
        autocompleteResults.innerHTML = '';
        autocompleteResults.style.display = 'none';
      }
    });
  
    document.addEventListener('click', (event) => {
      if (!autocompleteResults.contains(event.target) && event.target !== searchInput) {
        autocompleteResults.style.display = 'none';
      }
    });
  
    autocompleteResults.addEventListener('click', (event) => {
      const item = event.target.closest('.autocomplete-item');
      if (item) {
        const id = item.getAttribute('data-id');
        searchInput.value = item.textContent.split(' - ')[0]; // Asignar nombre al campo de entrada
        autocompleteResults.innerHTML = '';
        autocompleteResults.style.display = 'none';
  
        // Aquí puedes hacer una solicitud para obtener más detalles de la persona seleccionada
        fetch(`/admin/personas/${id}`)
          .then(response => response.json())
          .then(persona => {
            document.getElementById('telefono').value = persona.telefono;
          });
      }
    });
  });
  