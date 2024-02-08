const path = require("path");

module.exports = {
  mode: "production", // Configura el modo de producción
  entry: "./src/index.js", // Archivo de entrada de tu aplicación
  output: {
    filename: "bundle.js", // Nombre del archivo de salida
    path: path.resolve(__dirname, "dist"), // Ruta de salida
  },
  optimization: {
    usedExports: true, // Habilita el rastreo de exportaciones utilizadas
  },
};
