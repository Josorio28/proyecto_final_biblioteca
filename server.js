const express = require("express");
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3001;

// Configuración de la conexión a MongoDB

require("dotenv").config(); //para procesar el documento .env que contiene la URI de acceso a la base de datos

mongoose
  .connect(uri, {
    dbName: "biblioteca",
  })
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectarse a MongoDB:", error);
  });

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
