process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //CHEQUEAR IMPORTANTE CERTIFICADO SSL !! ESTO ES SOLO PARA PRUEBA MAILS
require("dotenv").config();
const mongoURI = process.env.MONGOOSE;
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require("fs-extra");
const handlebars = require("handlebars");

const app = express();
app.use(
  cors({
    origin: "https://0a9d-186-136-5-6.ngrok-free.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cors());
app.use("/src", express.static(path.join(__dirname, "../frontend/src")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.set("strictQuery", false);
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  facebookId: String,
  datosFacturacion: {
    email: String,
    nombre: String,
    apellido: String,
    codArea: String,
    telefono: String,
    provincia: String,
    localidad: String,
    codigo: String,
    calle: String,
    altura: String,
    piso: String,
    departamento: String,
    info: String,
  },
  compras: [
    {
      _id: String,
      fecha: Date,
      total: Number,
      items: [
        {
          _id: Number,
          title: String,
          quantity: Number,
          price: Number,
        },
      ],
    },
  ],
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const ventaSchema = new mongoose.Schema({
  _id: String,
  ventas: [
    {
      _id: String,
      persona: String,
      telefono: String,
      domicilio: String,
      info: String,
      items: [
        {
          title: String,
          quantity: Number,
        },
      ],
    },
  ],
});

const Venta = mongoose.model("Venta", ventaSchema);

//Configuracion estrategias

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3002/backend/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL: "http://localhost:3002/backend/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

//Configuracion estrategias

const suscripcionesSchema = new mongoose.Schema({
  email: String,
});

const Suscripcion = mongoose.model("Suscripciones", suscripcionesSchema);

const alimentosSchema = new mongoose.Schema(
  {
    _id: Number,
    marca: String,
    logo: String,
    subMarca: String,
    tipo: String,
    mascota: String,
    edad: String,
    raza: String,
    kg: String,
    precio: String,
    cantStock: Number,
    stock: Boolean,
    img: String,
    imgTable: String,
    offer: String,
    porcDescuento: String,
    description: String,
    description1: String,
    description2: String,
    alto: String,
    ancho: String,
    profundo: String,
  },
  {
    collection: "alimentos",
  }
);

const Alimento = mongoose.model("Alimento", alimentosSchema);

app.get("/backend/api", async (req, res) => {
  try {
    const datos = await Alimento.find({}, "-cantStock");
    res.json(datos);
  } catch (err) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error al obtener los datos." });
  }
});

app.get("/backend/maxStock/:productKey", async (req, res) => {
  const { productKey } = req.params;
  const productKeyy = parseInt(productKey, 10);
  try {
    const maxStock = await Alimento.find({ _id: productKeyy }, "cantStock");
    const maxxStock = maxStock[0].cantStock;
    res.json(maxxStock);
  } catch (error) {
    console.error("Error al obtener la cantidad en stock:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

app.get("/backend/offer", async (req, res) => {
  try {
    const datos = await Alimento.find(
      { offer: "flash" },
      "-cantStock -description -description1 -description2"
    );
    res.json(datos);
  } catch (err) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error al obtener los datos." });
  }
});

app.get("/backend/promo", async (req, res) => {
  try {
    const datos = await Alimento.find(
      { offer: "descuento" },
      "-cantStock -description -description1 -description2"
    );
    res.json(datos);
  } catch (err) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error al obtener los datos." });
  }
});

//Authentication
app.get("/backend/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/backend/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000//",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

app.get(
  "/backend/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/backend/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

//Authentication

app.get("/backend/registered", function (req, res) {
  if (req.isAuthenticated()) {
    const data = true;
    res.json(data);
  } else {
    const data = false;
    res.json(data);
  }
});

//Nodemailer
app.post("/backend/forgot-password", async (req, res) => {
  try {
    const { username } = req.body;

    // Find the user based on the provided username or email
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const source = fs.readFileSync(
      "./mail-templates/forgot-password.html",
      "utf-8"
    );

    const template = handlebars.compile(source);

    const replacements = {
      username: username,
      resetLink: `http://www.peludosarrecifes.com/reset-password/${token}`,
    };

    const htmlToSend = template(replacements);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "peludosarrecifes@gmail.com",
        pass: process.env.NODE_MAILER,
      },
    });

    const mailOptions = {
      from: "peludosarrecifes@gmail.com",
      to: user.username,
      subject: "Recuperar contraseña",
      html: htmlToSend,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ mensaje: "Error al enviar el correo electrónico" });
      }
      console.log("Email sent: " + info.response);
      res.json({ mensaje: "Correo electrónico enviado con éxito" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

app.post("/backend/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Set the new password for the user
    await user.setPassword(password);
    await user.save();

    res.json({ mensaje: "Contraseña cambiada exitosamente" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ mensaje: "El token ha expirado" });
    }
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

app.get("/backend/reset-password/:token", (req, res) => {
  const { token } = req.params;
  res.render("reset-password-page", { token });
});

//Nodemailer
app.post("/backend/suscribe", async (req, res) => {
  const email = req.body.email;

  const existeSuscripcion = await Suscripcion.findOne({ email });

  if (!existeSuscripcion) {
    const nuevaSuscripcion = new Suscripcion({ email });
    nuevaSuscripcion
      .save()
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => {
        console.error("Error al guardar la suscripción:", err);
        res.status(500).send("Error al procesar la suscripción.");
      });
  } else {
    res.json({ success: true });
  }
});

app.post("/backend/calculate-shipping", async (req, res) => {
  const { param1 } = req.body;

  try {
    const url =
      "https://demo.micorreoar.com/precio/b7600/u9000/1/cp/d/12.34/55/60/95";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Apikey: process.env.API_KEY,
      },
      body: JSON.stringify({ param1, param2, param3, param4, param5, param6 }),
    });

    const data = await response.json();
    res.json({ shippingCost: data.shippingCost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//MERCADOPAGO CHECKOUT
const mercadopago = require("mercadopago");
const { log } = require("console");
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

app.post("/backend/create_preference", (req, res) => {
  const item = req.body;

  let preference = {
    items: item.items.map(item => ({
      id: item.id,
      title: item.description,
      unit_price: Number(item.price),
      quantity: Number(item.quantity),
    })),
    back_urls: {
      success: "https://0a9d-186-136-5-6.ngrok-free.app/success",
      failure: "https://0a9d-186-136-5-6.ngrok-free.app/failure",
      pending: "",
    },
    auto_return: "approved",
    external_reference: req.user.username,
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("/backend/mp_notification", async (req, res) => {
  try {
    const data = req.body;
    console.log("Notificación de MercadoPago recibida:", data);

    const paymentId = data.data.id;

    const url = `https://api.mercadopago.com/v1/payments/${paymentId}`;
    const headers = {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };

    const paymentResponse = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    const paymentData = await paymentResponse.json();
    if (paymentData.status === "approved") {
      console.log("Información adicional del pago:", paymentData);
      const items = paymentData.additional_info.items;
      const total = paymentData.transaction_amount;
      const useremail = paymentData.external_reference;
      const idPago = paymentData.id;

      try {
        await fetch(
          "https://0a9d-186-136-5-6.ngrok-free.app/backend/correoconfirmacompra",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ items, useremail, total, idPago }),
          }
        );
      } catch (error) {
        console.error(
          "Error al enviar la solicitud para enviar el correo:",
          error
        );
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error al procesar la notificación de MercadoPago:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

app.post("/backend/correoconfirmacompra", async (req, res) => {
  const { items, useremail, total, idPago } = req.body;
  const itemsToUpdate = items.map(item => ({
    quantity: parseInt(item.quantity),
    id: parseInt(item.id),
  }));

  try {
    await Promise.all(
      itemsToUpdate.map(async item => {
        try {
          const { id, quantity } = item;
          await Alimento.updateOne(
            { _id: id },
            { $inc: { cantStock: -quantity } }
          );
          console.log(`Actualización exitosa para el alimento con ID ${id}`);

          const alimento = await Alimento.findById(id);
          if (alimento.cantStock < 1) {
            await Alimento.updateOne({ _id: id }, { stock: false });
            console.log(`El producto con ID ${id} está fuera de stock.`);
          }
        } catch (error) {
          console.error(
            `Error al actualizar o verificar el stock del alimento con ID ${item.id}:`,
            error
          );
        }
      })
    );

    const usuario = await User.findOne({ username: useremail });

    const newItems = items.map(item => ({
      _id: item.id,
      quantity: item.quantity,
      title: item.title,
      price: item.unit_price,
    }));

    const newItemss = items.map(item => ({
      quantity: item.quantity,
      title: item.title,
    }));

    usuario.compras.push({
      _id: idPago,
      items: newItems,
      total: total,
      fecha: Date.now(),
    });

    await usuario.save();

    const fechaHoy = new Date();
    const año = fechaHoy.getFullYear();
    const mes = String(fechaHoy.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaHoy.getDate()).padStart(2, "0");
    const fechaFormateada = `${dia}/${mes}/${año}`;

    const fechaExistente = await Venta.findOne({ _id: fechaFormateada });

    if (fechaExistente) {
      fechaExistente.ventas.push({
        _id: idPago,
        persona:
          usuario.datosFacturacion.nombre +
          " " +
          usuario.datosFacturacion.apellido,
        telefono:
          usuario.datosFacturacion.codArea +
          " - " +
          usuario.datosFacturacion.telefono,
        domicilio:
          usuario.datosFacturacion.calle +
          " " +
          usuario.datosFacturacion.altura +
          " " +
          usuario.datosFacturacion.piso +
          " " +
          usuario.datosFacturacion.departamento,
        info: usuario.datosFacturacion.info,
        items: newItemss,
      });
      await fechaExistente.save();
    } else {
      const nuevaVenta = {
        _id: fechaFormateada,
        ventas: [
          {
            _id: idPago,
            persona:
              usuario.datosFacturacion.nombre +
              " " +
              usuario.datosFacturacion.apellido,
            telefono:
              usuario.datosFacturacion.codArea +
              " - " +
              usuario.datosFacturacion.telefono,
            domicilio:
              usuario.datosFacturacion.calle +
              " " +
              usuario.datosFacturacion.altura +
              " " +
              usuario.piso +
              " " +
              usuario.departamento,
            info: usuario.datosFacturacion.info,
            items: newItemss,
          },
        ],
      };

      const nuevaVentaParaHoy = new Venta(nuevaVenta);
      await nuevaVentaParaHoy.save();
    }
  } catch (error) {
    console.error("Error en el proceso de actualización:", error);
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "peludosarrecifes@gmail.com",
        pass: process.env.NODE_MAILER,
      },
    });

    const mailOptions = {
      from: "peludosarrecifes@gmail.com",
      to: useremail,
      subject: "¡Compra exitosa!",
      text: `¡GRACIAS POR SU COMPRA! \n\n\DETALLE: \n\n${items
        .map(
          item => `${item.title}:\n${item.quantity} x $ ${item.unit_price} ARS`
        )
        .join(
          "\n\n"
        )}\n ----------------------------------------- \nTOTAL: $ ${total} ARS`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);

    res.status(200).json({ mensaje: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ mensaje: "Error al enviar el correo" });
  }
});
//MERCADOPAGO CHECKOUT

app.post("/backend/register", function (req, res, next) {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send("El usuario ya se encuentra registrado. backend");
    }
    passport.authenticate("local")(req, res, function () {
      try {
        const source = fs.readFileSync(
          "./mail-templates/login-template.html",
          "utf-8"
        );

        const template = handlebars.compile(source);

        const replacements = {
          username: req.body.username,
        };

        const htmlToSend = template(replacements);

        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "peludosarrecifes@gmail.com",
            pass: process.env.NODE_MAILER,
          },
        });

        const mailOptions = {
          from: "peludosarrecifes@gmail.com",
          to: user.username,
          subject: "¡Te damos la bienvenida!",
          html: htmlToSend,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            return res
              .status(500)
              .json({ mensaje: "Error al enviar el correo electrónico" });
          }
          console.log("Email sent: " + info.response);
          res.json({ mensaje: "Correo electrónico enviado con éxito" });
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
      }
      res.redirect("/");
    });
  });
});

app.post("/backend/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ mensaje: "Nombre de usuario o contraseña incorrectos" });
    }
    req.login(user, function (err) {
      if (err) {
        console.log(err);
        return next(err);
      }
      console.log("Inicio de sesión exitoso");
      return res.redirect("/");
    });
  })(req, res, next);
});

app.post("/backend/verificarDisponibilidad", async (req, res) => {
  const { cart } = req.body;

  try {
    const cartUpdated = await Promise.all(
      cart.map(async item => {
        const alimento = await Alimento.findById(item.key).select(
          "-description -description1 -description2 -imgTable -offer -stock -tipo -logo"
        );

        if (alimento) {
          if (item.cant > alimento.cantStock) {
            item.cant = alimento.cantStock;
          }
        }

        return item;
      })
    );

    res.json(cartUpdated);
  } catch (error) {
    console.error("Error al verificar disponibilidad:", error);
    res.status(500).json({ mensaje: "Error al verificar disponibilidad" });
  }
});

app.get("/backend/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000/");
  });
});

app.get("/backend/datosfacturacion", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ mensaje: "Usuario no autenticado" });
    }
    const id = req.user.id; // Obtener el email o nombre de usuario
    // Buscar en la base de datos utilizando el email o nombre de usuario
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ mensaje: "Usuario no encontrado en la base de datos" });
    }
    const datosFacturacion = user.datosFacturacion;
    datosFacturacion.email = user.username;
    return res.status(200).json(datosFacturacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

app.put("/backend/data", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ mensaje: "Usuario no autenticado" });
    }

    const email = req.user.username;

    const user = await User.findOne({ username: email });

    if (!user) {
      return res
        .status(404)
        .json({ mensaje: "Usuario no encontrado en la base de datos" });
    }

    user.username = req.body.email;
    user.datosFacturacion.nombre = req.body.nombre;
    user.datosFacturacion.apellido = req.body.apellido;
    user.datosFacturacion.codArea = req.body.codArea;
    user.datosFacturacion.telefono = req.body.telefono;
    user.datosFacturacion.provincia = req.body.provincia;
    user.datosFacturacion.localidad = req.body.localidad;
    user.datosFacturacion.codigo = req.body.codigo;
    user.datosFacturacion.calle = req.body.calle;
    user.datosFacturacion.altura = req.body.altura;
    user.datosFacturacion.departamento = req.body.departamento;
    user.datosFacturacion.piso = req.body.piso;
    user.datosFacturacion.info = req.body.info;

    await user.save();

    return res
      .status(200)
      .json({ mensaje: "Datos actualizados exitosamente.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

const port = 3002;

app.listen(port, () => {
  console.log("Server corriendo en el puerto " + port + " !");
});
