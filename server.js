const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

// Configuración de la conexión a MongoDB
mongoose.connect(
  "mongodb+srv://josoriomt:2NdxIL89xlV3b8FO@biblioteca.npvq61z.mongodb.net/",
  {
    dbName: "biblioteca",
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conexión a MongoDB establecida");
});

// Configuración de body-parser para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importar el modelo Libro
const Libro = require("./modelos/modelos_libros");

// Importar el enrutador de libros
const librosRouter = require("./rutas/rutas_libros");

// Usar el enrutador de libros
app.use("/libros", librosRouter);

// Servir index.html desde la raíz
app.use(express.static(path.join(__dirname, "/")));

// Servir archivos HTML de html_lib desde /html_lib
app.use("/html_lib", express.static(path.join(__dirname, "html_lib")));

// Iniciar el servidor (usando app.listen() en lugar de server.listen())
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});
