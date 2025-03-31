const express = require("express");
const router = express.Router();
const Libro = require("../modelos/modelos_libros");

// Ruta para manejar la creación de libros (POST)
router.post("/", async (req, res) => {
  try {
    const libro = new Libro({
      isbn: req.body.isbn,
      titulo: req.body.titulo,
      autor: req.body.autor,
      fechaEdicion: req.body.fecha,
      paginas: req.body.paginas,
      cantEjemplares: req.body["q-ejemplares"],
      ejemDisponibles: req.body["q-ejemplares-dis"],
      sinopsis: req.body.sinopsis,
      presentacion: req.body.presentacion,
      literatura: req.body.literatura,
    });

    await libro.save();
    res.send(`
      <h1>Libro creado exitosamente</h1>
      <button onclick="window.location.href='/'">Volver al inicio</button>
    `);
  } catch (error) {
    console.error("Error al crear el libro:", error);
    res.status(500).send(`
      <h1>Error al crear el libro</h1>
      <p>${error.message}</p>
      <button onclick="window.location.href='/'">Volver al inicio</button>
    `);
  }
});

// Ruta para consultar un libro por ISBN (GET)
router.get("/:isbn", async (req, res) => {
  try {
    const libro = await Libro.findOne({ isbn: req.params.isbn });
    if (!libro) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.json(libro); // Envía los datos del libro como JSON
  } catch (error) {
    console.error("Error al consultar el libro:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
