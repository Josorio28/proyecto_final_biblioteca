const mongoose = require("mongoose");

const autorSchema = new mongoose.Schema({
  nombreAutor: { type: String, required: true, maxlength: 60 },
  apellido: { type: String, required: true, maxlength: 60 },
  fechaPublicacion: { type: Date, required: true },
  premios: { type: String, maxlength: 100 },
  fechaNacimiento: { type: Date, required: true },
  fechaFallecimiento: { type: Date },
});

const Autor = mongoose.model("Autor", autorSchema);

module.exports = Autor;
