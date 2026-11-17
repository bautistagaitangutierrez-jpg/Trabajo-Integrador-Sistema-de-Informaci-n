document.getElementById("guardar").onclick = function() {

    let datos = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        dni: document.getElementById("dni").value,
        telefono: document.getElementById("telefono").value,
        obra_social: document.getElementById("obra_social").value
    };

    fetch("/pacientes", {
        method: "POST",
        body: JSON.stringify(datos)
    }).then(() => {
        alert("Paciente guardado con éxito");
    });

};