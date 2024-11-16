 // Datos de prueba para validación
 const user1 = {
    username: "usuario",
    password: "1234"
};

document.getElementById("formInicio").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const username = document.getElementById("user").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = "";

    // Validación de campos vacíos
    if (!username || !password) {
        errorMessage.textContent = "Por favor, complete todos los campos.";
        return;
    }

    // Validación de credenciales
    if (username === user1.username && password === user1.password) {
        alert("Inicio de sesión exitoso.");
        //Redirigir
    } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
    }
});
