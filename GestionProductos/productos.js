// 2. CREAR OBJETOS HTML
const coleccionStr = "Productos";
const frm = document.querySelector("#frm");
const dataTable = document.querySelector("#tblDatos > tbody");

var editStatus = false;
var idSeleccionado = "";

// 4. CREACION DE CRUD
window.addEventListener("load", async () => {
    onFindAll((query) => {
      dataTable.innerHTML = "";
  
      query.forEach((doc) => {
        let dato = doc.data();
  
        dataTable.innerHTML += `
                                      <tr>
                                          <td>${dato.nombre}</td>
                                          <td>${dato.categoria}</td>
                                          <td>${dato.etiquetas}</td>
                                          <td>${dato.descripcion}</td>
                                          <td>${dato.precio}</td>
                                          <td>${dato.disponibilidad}</td>
                                          <td>${dato.envio}</td>
                                          <td>${dato.imagen}</td>
                                          <td class="text-center">
                                          <button class="btn btn-secondary btn-editar" data-id="${doc.id}">Editar</button>
                                          <button class="btn btn-danger btn-borrar" data-id="${doc.id}">Borrar</button>
                                          </td>
                                      </tr>            
                                      `;
      });

      const btnBorrar = document.querySelectorAll(".btn-borrar");
      btnBorrar.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
          if (confirm("Desea eliminar el registro?")) {
            await onDelete(event.target.dataset.id);
          }
        });
      });

      const btnEditar = document.querySelectorAll(".btn-editar");
    btnEditar.forEach((btn) => {
      btn.addEventListener("click", async (event) => {
        const docSeleccionado = await findById(event.target.dataset.id);
        const productoSeleccionado = docSeleccionado.data();

        frm.txtNombre.value = productoSeleccionado.nombre;
        frm.txtCategoria.value = productoSeleccionado.categoria;
        frm.txtEtiquetas.value = productoSeleccionado.etiquetas;
        frm.txtDescripcion.value = productoSeleccionado.descripcion;
        frm.txtPrecio.value = productoSeleccionado.precio;
        frm.txtDisponibilidad.value = productoSeleccionado.disponibilidad;
        frm.txtEnvio.value = productoSeleccionado.envio;
        frm.txtImagen.value = productoSeleccionado.imagen;
        frm.btnGuardar.innerHTML = "Modificar";

        editStatus = true;
        idSeleccionado = event.target.dataset.id;
      });
    });
  });
});

frm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const precio = parseFloat(frm.txtPrecio.value);
    if (isNaN(precio) || precio < 0) {
        alert("Por favor, ingrese un valor de precio válido.");
        return;
    }

    //CREAR OBJETO A INSERTAR
    const productoTO = {
      nombre: frm.txtNombre.value,
      categoria: frm.txtCategoria.value,
      etiquetas: txtEtiquetas.value,
      descripcion: txtDescripcion.value,
      precio: precio,
      disponibilidad: frm.txtDisponibilidad.value,
      envio: frm.txtEnvio.value,
      imagen: frm.txtImagen.value,
    };
  
    console.log(editStatus);
  
    if (editStatus) {
      await onUpdate(idSeleccionado, productoTO);
    } else {
      await onInsert(productoTO);
    }
    limpiar();
  });

  function limpiar() {
    frm.reset();
    frm.btnGuardar.innerHTML = "Guardar";
    frm.txtNombre.focus();
  
    editStatus = false;
    idSeleccionado = "";
  }

  function limpiarFormulario() {
    // Obtener referencia al formulario
    const frm = document.getElementById("frm");
  
    // Restablecer el formulario
    frm.reset();
  }

  // Agrega un evento al cambio del campo de imagen para mostrar una vista previa
frm.txtImagen.addEventListener('change', mostrarVistaPrevia);

function mostrarVistaPrevia() {
    const input = frm.txtImagen;
    const preview = document.getElementById('previewImagen');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        preview.src = '';
    }
}


//const categorias = ["Componentes", "Perifericos", "Celulares"];

const selectCategoria = document.getElementById('txtCategoria');

categorias.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria.toLowerCase().replace(/\s/g, ''); // Valor en minúsculas y sin espacios
    option.text = categoria;
    selectCategoria.add(option);
});

//const opcionesDisponibilidad = ["Disponible", "No Disponible"];

// Luego, dentro de la función de carga del formulario
const selectDisponibilidad = document.getElementById('txtDisponibilidad');

opcionesDisponibilidad.forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion.toLowerCase().replace(/\s/g, ''); // Valor en minúsculas y sin espacios
    option.text = opcion;
    selectDisponibilidad.add(option);
});

const selectEnvio = document.getElementById('txtEnvio');

opcionesEnvio.forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion.toLowerCase().replace(/\s/g, ''); // Valor en minúsculas y sin espacios
    option.text = opcion;
    selectEnvio.add(option);
});