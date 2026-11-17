const http = require("http");
const fs = require("fs");
const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("hospital.db");

// Crear la tabla de pacientes
db.exec(`
    CREATE TABLE IF NOT EXISTS pacientes (
        id_paciente INTEGER PRIMARY KEY, 
        nombre TEXT, 
        apellido TEXT, 
        dni TEXT, 
        telefono TEXT, 
        obra_social TEXT
    )
`);

const servidor = http.createServer(function(req, res) {

    if (req.url == "/" && req.method == "GET") {
        res.end(fs.readFileSync("index.html"));
    }

    if (req.url == "/script.js" && req.method == "GET") {
        res.end(fs.readFileSync("script.js"));
    }

    if (req.url == "/pacientes" && req.method == "POST") {

        let datos = "";

        req.on("data", function(parte) {
            datos += parte;
        });

        req.on("end", function() {
            let p = JSON.parse(datos);

            let consulta = db.prepare(
                "INSERT INTO pacientes (nombre, apellido, dni, telefono, obra_social) VALUES (?, ?, ?, ?, ?)"
            );

            // Se guardan los datos directos sin encriptar
            consulta.run(
                p.nombre,
                p.apellido,
                p.dni,
                p.telefono,
                p.obra_social
            );

            res.end("OK");
        });
    }

});

servidor.listen(3000, () => console.log("Corriendo en http://localhost:3000"));