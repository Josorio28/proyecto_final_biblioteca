const express = require("express");
const routerA = express.Router();
const Autor = require("../modelos/modelos_autores");

// Ruta para manejar la creación de autores (POST)
routerA.post("/", async (req, res) => {
  try {
    const autor = new Autor({
      nombreAutor: req.body.nombre_autor,
      apellido: req.body.apellido,
      fechaPublicacion: req.body.fecha_publicacion,
      premios: req.body.premios,
      fechaNacimiento: req.body.fecha_nacimiento,
      fechaFallecimiento: req.body.fecha_fallecimiento,
    });

    await autor.save();
    res.send(`
      <h1>Autor creado exitosamente</h1>
      <button onclick="window.location.href='/'">Volver al inicio</button>
    `);
  } catch (error) {
    console.error("Error al crear el autor:", error);
    res.status(500).send(`
      <h1>Error al crear el autor</h1>
      <p>${error.message}</p>
      <button onclick="window.location.href='/'">Volver al inicio</button>
    `);
  }
});

// Ruta para consultar un Autor por nombre (GET)
routerA.get("/:autor", async (req, res) => {
  try {
    const nombreAutorCodificado = req.params.autor;
    const nombreAutorDecodificado = decodeURIComponent(nombreAutorCodificado); // Decodificar el nombre del autor
    const autor = await Autor.findOne({ nombreAutor: nombreAutorDecodificado });
    if (!autor) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }
    res.json(autor); // Envía los datos del autor como JSON
  } catch (error) {
    console.error("Error al consultar el autor:", error);
    res.status(500).json({ message: error.message });
  }
});

// Ruta para actualizar un autor (PUT)
routerA.put("/:autor", async (req, res) => {
  try {
    const nombreAutorCodificado = req.params.autor;
    const nombreAutorDecodificado = decodeURIComponent(nombreAutorCodificado); // Decodificar el nombre del autor
    const autorActualizado = await Autor.findOneAndUpdate(
      { nombreAutor: nombreAutorDecodificado },
      req.body,
      { new: true }
    );
    if (!autorActualizado) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }
    res.json(autorActualizado);
  } catch (error) {
    console.error("Error al actualizar el autor:", error);
    res.status(500).json({ message: error.message });
  }
});

// Ruta para eliminar un autor (DELETE)
routerA.delete("/:autor", async (req, res) => {
  try {
    const nombreAutorCodificado = req.params.autor;
    const nombreAutorDecodificado = decodeURIComponent(nombreAutorCodificado); // Decodificar el nombre del autor
    const autorEliminado = await Autor.findOneAndDelete({
      nombreAutor: nombreAutorDecodificado,
    });
    if (!autorEliminado) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }
    res.json({ message: "Autor eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el autor:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = routerA;
