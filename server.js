const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3001;

//---------------------------------------------
// CONEXION A LA BASE DE DATOS
//---------------------------------------------
var bdURL = "mongodb://127.0.0.1:27017/biblioteca";
mongoose.connect(bdURL);

//CONFIGURACION EVENTOS DE LA CONEXION
mongoose.connection.on("connected", function () {
  console.log("Conexion a mongo realizada en: " + bdURL);
});
mongoose.connection.on("error", function (err) {
  console.log("ERROR: no hay conexion a mongo: " + err);
});
mongoose.connection.on("disconnected", function (err) {
  console.log("Desconexion a mongo db realizada con exito." + err);
});

// Cuando termine Node se desconecta de mongo
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Conexion con base de datos terminada por finalizacion del servidor."
    );
    process.exit(0);
  });
});

//---------------------------------------------

// Configuración de body-parser para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importar el modelo libro y modelo autores
const Libro = require("./modelos/modelos_libros");
const Autor = require("./modelos/modelos_autores");

// Importar el enrutador de libros y de autores
const librosRouter = require("./rutas/rutas_libros");
const autoresRouter = require("./rutas/rutas_autores");

// Usar el enrutador de libros y autores
app.use("/libros", librosRouter);
app.use("/autores", autoresRouter);

// Servir index.html desde la raíz
app.use(express.static(path.join(__dirname, "/")));

// Servir archivos HTML de html_lib desde /html_lib
app.use("/html_lib", express.static(path.join(__dirname, "html_lib")));

// Servir archivos HTML de html_aut desde /html_aut
app.use("/html_aut", express.static(path.join(__dirname, "html_aut")));

// Iniciar el servidor (usando app.listen() en lugar de server.listen())
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});
