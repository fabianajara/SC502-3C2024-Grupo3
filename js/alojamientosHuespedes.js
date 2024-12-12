document.addEventListener('DOMContentLoaded', async () => {
  const alojamientosList = document.getElementById('alojamiento-list');

  try {
      const response = await fetch('http://localhost:8000/backend/alojamientosHuespedes.php');
      if (!response.ok) {
          const errorText = await response.text();
          console.error(`HTTP error! status: ${response.status}`, errorText);
          throw new Error(errorText);
      }

      const alojamientos = await response.json();

      alojamientosList.innerHTML = `
      <div class="container py-2">
          <div class="h1 text-center text-dark" id="pageHeaderTitle">Todos los Alojamientos</div>
          <div class="row"></div>
      </div>
      `;
      const row = alojamientosList.querySelector('.row');

      alojamientos.forEach(alojamiento => {
          const card = document.createElement('div');
          card.className = 'col-md-4';
          card.innerHTML = `
              <div class="card shadow mb-4">
                  <img src="${alojamiento.alojamiento_imagen}" class="card-img-top" alt="Imagen del Alojamiento">
                  <div class="card-body">
                      <h5 class="card-title">${alojamiento.alojamiento_nombre}</h5>
                      <p class="card-text">${alojamiento.descripcion}</p>
                      <p class="card-text"><strong>Precio por Noche:</strong> $${alojamiento.precio_noche}</p>
                      <form class="reserva-form">
                          <div class="mb-3">
                              <label for="fechaInicio-${alojamiento.id}" class="form-label">Fecha de Inicio</label>
                              <input type="date" class="form-control" id="fechaInicio-${alojamiento.id}" required>
                          </div>
                          <div class="mb-3">
                              <label for="noches-${alojamiento.id}" class="form-label">Noches</label>
                              <input type="number" class="form-control noches-input" id="noches-${alojamiento.id}" min="1" required>
                          </div>
                          <div class="mb-3">
                              <label for="personas-${alojamiento.id}" class="form-label">Personas</label>
                              <input type="number" class="form-control" id="personas-${alojamiento.id}" min="1" required>
                          </div>
                          <p><strong>Total: $<span id="total-${alojamiento.id}">0.00</span></strong></p>
                          <button type="submit" class="btn btn-success">Reservar</button>
                      </form>
                  </div>
              </div>
          `;
          row.appendChild(card);

          // Actualizar el precio total en tiempo real
          const nochesInput = card.querySelector(`#noches-${alojamiento.id}`);
          const totalDisplay = card.querySelector(`#total-${alojamiento.id}`);

          nochesInput.addEventListener('input', () => {
              const noches = parseInt(nochesInput.value) || 0;
              const total = noches * alojamiento.precio_noche;
              totalDisplay.textContent = total.toFixed(2);
          });

          // Enviar la reserva
          const form = card.querySelector('.reserva-form');
          form.addEventListener('submit', async (e) => {
              e.preventDefault();
              const fechaInicio = document.getElementById(`fechaInicio-${alojamiento.id}`).value;
              const noches = document.getElementById(`noches-${alojamiento.id}`).value;
              const personas = document.getElementById(`personas-${alojamiento.id}`).value;

              const total = noches * alojamiento.precio_noche;

              const reservaResponse = await fetch('http://localhost:8000/backend/reservarAlojamiento.php', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      id_usuario: 2, // Simular usuario logueado con ID 2
                      id_alojamiento: alojamiento.id,
                      fecha_inicio: fechaInicio,
                      noches: parseInt(noches, 10),
                      personas: parseInt(personas, 10),
                      precio_total: total,
                  }),
              });

              if (reservaResponse.ok) {
                  alert(`Reserva confirmada:\nUsuario ID: 2\nFecha: ${fechaInicio}\nNoches: ${noches}\nTotal: $${total}`);
              } else {
                  alert('Error al realizar la reserva. Intenta nuevamente.');
              }
          });
      });
  } catch (error) {
      console.error('Error al cargar los alojamientos:', error);
      alojamientosList.innerHTML = '<div class="text-danger text-center">Error al cargar los alojamientos. Por favor, intenta más tarde.</div>';
  }
});
