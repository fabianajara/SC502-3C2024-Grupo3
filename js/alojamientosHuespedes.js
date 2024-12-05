document.addEventListener('DOMContentLoaded', async () => {
    const alojamientosList = document.getElementById('alojamiento-list');

    try {
        const response = await fetch('../backend/alojamientosHuespedes.php');
        console.log('HTTP response status:', response.status); // Verifica el estado HTTP
        const textResponse = await response.text(); // Obtén la respuesta como texto
        console.log('Text response:', textResponse); // Verifica la respuesta completa

        // Verifica si la respuesta es HTML (indicando un error)
        if (textResponse.startsWith('<')) {
            throw new Error('La respuesta es HTML, lo que indica un error en el servidor.');
        }

        const alojamientos = JSON.parse(textResponse); // Intenta convertir la respuesta a JSON
        console.log('JSON response:', alojamientos); // Verifica la respuesta JSON

        if (!Array.isArray(alojamientos)) {
            throw new Error('La respuesta no es un array');
        }

        alojamientos.forEach(alojamiento => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-3';
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${alojamiento.nombre}</h5>
                        <p class="card-text">${alojamiento.descripcion}</p>
                        <p class="card-text">Precio por noche: $${alojamiento.precio_noche}</p>
                    </div>
                </div>
            `;
            alojamientosList.appendChild(card);
        });
    } catch (error) {
        console.error('Error al cargar los alojamientos:', error);
        alojamientosList.innerHTML = 'Error al cargar los alojamientos';
    }
});