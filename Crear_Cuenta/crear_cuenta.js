document.getElementById("formCrearCuenta").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const correo = document.getElementById("correo").value;
    const edad = document.getElementById("edad").value;
    const telefono = document.getElementById("telefono").value;
    const genero = document.getElementById("genero").value;

    // Crear un objeto para almacenar los datos del usuario
    const usuario = {
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        edad: edad,
        telefono: telefono,
        genero: genero
    };

    // Guardar los datos en el almacenamiento local
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Confirmación al usuario
    alert("Cuenta creada exitosamente!");
    document.getElementById("formCrearCuenta").reset();
});
