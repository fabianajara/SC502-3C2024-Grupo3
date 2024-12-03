document.addEventListener('DOMContentLoaded', function () {

    let alojamientos = [];
    const API_URL = 'http://localhost/SC502-3C2024-Grupo3/backend/alojamientos.php';  // URL local

    // Función para cargar los alojamientos
    async function loadAlojamientos() {
        try {
            const response = await fetch(API_URL, {
                method: 'GET'
            });
            if (response.ok) {
                alojamientos = await response.json();  // Parsear la respuesta JSON
                renderAlojamientos(alojamientos);  // Llamar a la función para renderizar los alojamientos
            } else {
                console.error("Error al obtener alojamientos");
            }
        } catch (err) {
            console.error(err);
        }
    }

    // Función para renderizar los alojamientos en el HTML
    function renderAlojamientos(alojamientos) {
        const alojamientoList = document.getElementById('alojamiento-list');
        alojamientoList.innerHTML = '';  // Limpiar la lista antes de renderizar

        alojamientos.forEach(function (alojamiento) {
            const alojamientoCard = document.createElement('div');
            alojamientoCard.className = 'col-md-4 mb-3';
            alojamientoCard.innerHTML = `
            <div class="card">
                <img src="${alojamiento.propiedad_imagen}" class="card-img-top" alt="Imagen de la propiedad">
                <div class="card-body">
                    <h5 class="card-title">${alojamiento.nombre}</h5>
                    <p class="card-text">${alojamiento.descripcion}</p>
                    <p class="card-text"><small class="text-muted">Tipo: ${alojamiento.tipo_propiedad}</small></p>
                    <p class="card-text"><small class="text-muted">Ubicación: ${alojamiento.ubicacion}</small></p>
                    <p class="card-text"><strong>Precio por noche: $${alojamiento.precio_noche}</strong></p>
                    <p class="card-text"><small class="text-muted">Calificación: ${alojamiento.calificacion}</small></p>
                    <p class="card-text">${alojamiento.disponibilidad ? 'Disponible' : 'No disponible'}</p>
                </div>
            </div>
            `;
            alojamientoList.appendChild(alojamientoCard);
        });
    }

    loadAlojamientos();  // Llamar a esta función para cargar los alojamientos al cargar la página

});
