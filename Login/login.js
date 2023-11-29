document.addEventListener("DOMContentLoaded", function() {
    // Obtén el formulario y el botón de inicio de sesión
    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("loginButton");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío por defecto del formulario

        // Recupera los datos del usuario del almacenamiento local
        const usuariosExistentes = JSON.parse(localStorage.getItem("usuariosExistentes"));

        if (usuariosExistentes) {
            // Compara las credenciales ingresadas con las almacenadas
            const Usuario = document.getElementById("Usuario").value;
            const contrasena = document.getElementById("contrasena").value;

            const usuarioEncontrado = usuariosExistentes.find(usuario => usuario.Usuario === Usuario && usuario.contrasena === contrasena);

            if (usuarioEncontrado) {
                // Las credenciales son correctas, redirige al usuario a la página principal.html
                window.location.href = "principal.html";
            } else {
                alert("Credenciales incorrectas. Inténtalo de nuevo.");
            }
        } else {
            alert("No se encontraron datos de usuario. Regístrate primero.");
        }
    });
});