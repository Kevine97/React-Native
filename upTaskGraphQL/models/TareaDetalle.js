const mongoose = require("mongoose");

const TareaDetalleSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  producto: {
    type: String,
    required: true,
    trim: true,
  },
  zona: {
    type: String,
    required: true,
    trim: true,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  inicio: {
    type: String,
    required: true,
  },

  fin: {
    type: String,
    required: true,
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proyecto",
  },
  nombreProyecto: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("TareaDetalle", TareaDetalleSchema);
