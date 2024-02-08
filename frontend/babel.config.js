module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: "last 2 versions",
        },
        modules: false, // Esta opción indica que se utilicen módulos ES6 en la salida
      },
    ],
  ],
};
