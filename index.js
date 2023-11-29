document.addEventListener("DOMContentLoaded", function() {
    // Obtén el formulario y el botón de registro
    const registroForm = document.getElementById("registroForm");
    const registroButton = document.getElementById("registroButton");

    // Agrega un manejador de eventos para el envío del formulario
    registroForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío por defecto del formulario

        // Validar cada campo
        const Usuario = document.getElementById("Usuario").value;
        const nombres = document.getElementById("nombres").value;
        const apellidos = document.getElementById("apellidos").value;
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("Contrasena").value;
        
         // Verifica que todos los campos estén llenos
if (!Usuario || !nombres || !apellidos || !correo || !contrasena) {
alert("Por favor, complete todos los campos.");
} else {
// Obtener la lista de usuarios existentes del almacenamiento local
const usuariosExistentes = JSON.parse(localStorage.getItem("usuariosExistentes")) || [];

// Verificar si el nombre de usuario o correo ya existen
const usuarioExistente = usuariosExistentes.find(usuario => usuario.Usuario === Usuario || usuario.correo === correo);

if (usuarioExistente) {
alert("Nombre de usuario o correo ya existen. Por favor, elige otros.");
} else {
// Guardar los datos del nuevo usuario
const userData = {
Usuario,
nombres,
apellidos,
correo,
contrasena
};
usuariosExistentes.push(userData);
localStorage.setItem("usuariosExistentes", JSON.stringify(usuariosExistentes));
alert("Registro exitoso. Ahora puedes iniciar sesión.");
// Redirigir al usuario a la página de inicio de sesión
window.location.href = "login.html";
}
}
});
});