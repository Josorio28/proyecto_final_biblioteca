const mongoose = require("mongoose");

const libroSchema = new mongoose.Schema({
  isbn: { type: String, required: true, maxlength: 50 },
  titulo: { type: String, required: true, maxlength: 50 },
  autor: { type: String, required: true, maxlength: 60 },
  fechaEdicion: { type: Date, required: true },
  paginas: { type: Number, required: true },
  cantEjemplares: { type: Number, required: true },
  ejemDisponibles: { type: Number, required: true },
  sinopsis: { type: String, maxlength: 1000 },
  presentacion: { type: String, required: true },
  literatura: { type: String, required: true },
});

const Libro = mongoose.model("Libro", libroSchema);

module.exports = Libro;
