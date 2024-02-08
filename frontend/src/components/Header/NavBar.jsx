import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { AppContext } from "../../context/CartContext";
import { useApi } from "../../context/ProductsContext";
import $ from "jquery";
import peludos from "../../assets/images/peludos-pet-shop.webp";
import cartIcon from "../../assets/images/cart-shopping-solid.svg";
import userIcon from "../../assets/images/user-solid.svg";
import lupaIcon from "../../assets/images/magnifying-glass-solid.svg";
import barsIcon from "../../assets/images/bars-solid.svg";
import messageIcon from "../../assets/images/message-regular.svg";
import rssIcon from "../../assets/images/rss-solid.svg";
import footballIcon from "../../assets/images/football-solid.svg";
import medicalIcon from "../../assets/images/notes-medical-solid.svg";
import crownIcon from "../../assets/images/crown-solid.svg";
import bowlIcon from "../../assets/images/bowl-food-solid.svg";
import storeIcon from "../../assets/images/store-solid.svg";
import boltIcon from "../../assets/images/bolt-solid.svg";
import tagIcon from "../../assets/images/tag-solid.svg";
import dogIcon from "../../assets/images/dog-solid.svg";
import catIcon from "../../assets/images/cat-solid.svg";
import google from "../../assets/images/google.svg";
import eye1 from "../../assets/images/eye-solid.svg";
import eye2 from "../../assets/images/eye-slash-solid.svg";
import facebook from "../../assets/images/facebook.svg";
import "../../assets/styles/NavBar.css";
import Search from "../Search";

function NavBar() {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [usernamee, setUsername] = useState("");
  const [passwordd, setPassword] = useState("");
  const [usernameeLogin, setUsernameLogin] = useState("");
  const [passworddLogin, setPasswordLogin] = useState("");
  const [usernameeRecovery, setUsernameRecovery] = useState("");
  const [verified, setVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { cart } = useContext(AppContext);
  const [searchValue, setSearchValue] = useState("");
  const [searchFiltered, setSearchFiltered] = useState([]);
  const { data } = useApi();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    let filtro = data.filter((producto) => {
      const marca = producto.marca ? producto.marca.toLowerCase() : "";
      const subMarca = producto.subMarca ? producto.subMarca.toLowerCase() : "";
      const mascota = producto.mascota ? producto.mascota.toLowerCase() : "";
      const raza = producto.raza ? producto.raza.toLowerCase() : "";
      const edad = producto.edad ? producto.edad.toLowerCase() : "";

      return marca.includes(value.toLowerCase()) || subMarca.includes(value.toLowerCase()) || mascota.includes(value.toLowerCase()) || raza.includes(value.toLowerCase()) || edad.includes(value.toLowerCase());
    });

    setSearchFiltered(filtro);
  };

  const [datos, setDatos] = useState({
    email: "",
    nombre: "",
    apellido: "",
    codArea: "",
    telefono: "",
    provincia: "",
    localidad: "",
    codigo: "",
    calle: "",
    altura: "",
    piso: "",
    departamento: "",
    info: "",
  });

  useEffect(() => {
    // fetchDataa();
    fetchData();
  }, []);

  const handleChangeData = (fieldName, value) => {
    setDatos((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  function mostrarDatosFacturacion() {
    // Realizar una solicitud GET al backend para obtener los datos de facturación
    fetch("/backend/datosfacturacion")
      .then((response) => response.json())
      .then((datosFacturacion) => {
        // Rellenar los campos de entrada con los datos de facturación obtenidos
        setDatos(datosFacturacion);
      })
      .catch((error) => {
        console.error(error);
        // Manejar el error de la solicitud GET
      });
  }

  //Filtro menu
  const navigate = useNavigate();
  const handleFilter = (edad, raza, mascota, medicado, offer) => {
    navigate(`/shop/${edad}/${raza}/${mascota}/${medicado}/${offer}/1`);
    window.scrollTo(0, 0);
  };
  //Filtro menu

  const handleShow = () => {
    setShow(true);
  };
  const handleShowLogin = () => {
    setShowLogin(true);
  };
  const handleShowData = () => {
    setShowData(true);
  };
  const handleClose = () => {
    setShow(false);
    setUsername("");
    setPassword("");
    setUsernameLogin("");
    setPasswordLogin("");
    setShowPassword(false);
  };
  const handleCloseLogin = () => {
    setShowLogin(false);
    setUsernameLogin("");
    setPasswordLogin("");
    setUsername("");
    setPassword("");
    setShowPassword(false);
  };
  const handleCloseData = () => {
    setDatos("");
    setShowData(false);
  };
  const handleRegistrationButtonClick = () => {
    handleShow();
  };
  const handleRegistrationButtonClickLogin = () => {
    handleShowLogin();
  };

  const handleOpenRecovery = () => {
    setShowLogin(false);
    setShowRecovery(true);
  };

  const handleCloseRecovery = () => {
    setShowRecovery(false);
    setUsernameRecovery("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let username = e.target.username.value;
    let password = e.target.password.value;

    $.ajax({
      url: "/backend/register",
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      success: function (response) {
        // Registro exitoso, puedes realizar las acciones necesarias, como mostrar un mensaje de éxito, redirigir al usuario, etc.
        console.log("Registro exitoso front");
        window.location.href = "/";
      },
      error: function (xhr, status, error) {
        // Ocurrió un error durante el registro, puedes manejarlo adecuadamente
        window.location.href = "/";
        console.log("Error en el registro: front", error);
      },
    });
    handleClose();
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    let username = e.target.username.value;
    let password = e.target.password.value;
    $.ajax({
      url: "/backend/login",
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      success: function (response) {
        // Registro exitoso, puedes realizar las acciones necesarias, como mostrar un mensaje de éxito, redirigir al usuario, etc.
        console.log("Login exitoso front");
        window.location.href = "/";
      },
      error: function (xhr, status, error) {
        // Ocurrió un error durante el registro, puedes manejarlo adecuadamente
        console.log("Error en el login: front", error);
      },
    });

    handleCloseLogin();
  };

  const handleSubmitRecovery = async (e) => {
    e.preventDefault();

    let username = e.target.username.value;
    $.ajax({
      url: "/backend/forgot-password",
      method: "POST",
      data: {
        username: username,
      },
      success: function (response) {
        // Correo de recuperacion enviado.
        console.log("El correo de recuperacion ha sido enviado exitosamente.");
        window.location.href = "/";
      },
      error: function (xhr, status, error) {
        // Ocurrió un error durante el registro, puedes manejarlo adecuadamente
        console.log("Error en el login: front", error);
      },
    });

    handleCloseRecovery();
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();

    let email = e.target.email.value;
    let nombre = e.target.nombre.value;
    let apellido = e.target.apellido.value;
    let provincia = e.target.provincia.value;
    let localidad = e.target.localidad.value;
    let calle = e.target.calle.value;
    let altura = e.target.altura.value;
    let departamento = e.target.departamento.value;
    let codigo = e.target.codigo.value;
    let piso = e.target.piso.value;
    let info = e.target.info.value;
    let codArea = e.target.codArea.value;
    let telefono = e.target.telefono.value;

    if (codigo === "2740") {
      $.ajax({
        url: "/backend/data",
        method: "PUT",
        data: {
          email: email,
          nombre: nombre,
          apellido: apellido,
          provincia: provincia,
          localidad: localidad,
          calle: calle,
          altura: altura,
          departamento: departamento,
          piso: piso,
          codigo: codigo,
          info: info,
          codArea: codArea,
          telefono: telefono,
        },
        success: function (response) {
          // Registro exitoso, puedes realizar las acciones necesarias, como mostrar un mensaje de éxito, redirigir al usuario, etc.
          console.log("Datos de facturacion actualizados correctamente");
          window.location.href = "/";
        },
        error: function (xhr, status, error) {
          // Ocurrió un error durante el registro, puedes manejarlo adecuadamente
          window.location.href = "/";
          console.log("Error en la carga de datos", error);
        },
      });
    } else {
      alert("Solo se hacen envios a Arrecifes!");
    }
    handleCloseData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/backend/registered");
      if (response.ok) {
        const jsonDataa = await response.json();
        setVerified(jsonDataa);
      } else {
        console.log("Error en la respuesta del servidor:", response.status);
      }
    } catch (error) {
      console.log("Error al obtener los datos:", error);
    }
  };

  function showPass() {
    if (showPassword === false) {
      setShowPassword(true);
    } else if (showPassword === true) {
      setShowPassword(false);
    }
  }

  function goToBottom() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 50);
  }

  function borrarContenido() {
    setTimeout(() => {
      setSearchValue("");
    }, 100);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-white p-0 m-0">
      <div className="container d-flex justify-content-center m-auto p-2 bg-white">
        <div className="row align-items-center p-0">
          {/* LOGO */}
          <div className="col col-xs-12 col-sm-6 col-lg-3 p-0 d-flex ps-3">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="navbar-brand d-flex align-items-center m-0 p-0 position-relative">
                <img src={peludos} className="m-auto" decoding="async" loading="lazy" style={{ width: "90px", height: "90px" }} alt="PetShop" />
                <div className="d-grid ms-1 mt-2" style={{ width: "90px" }}>
                  <h5 className="text-secondary fw-light">PELUDOS</h5>
                  <h5 className="text-secondary fw-light">Pet Shop</h5>
                </div>
              </div>
            </Link>

            {/* MENU MOBILE */}
            <div className="buttoncanvas m-auto me-2 d-flex">
              <button className="btn d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                <img src={barsIcon} decoding="async" alt="menu" loading="eager" className="bars-Icon" style={{ width: "32px" }} />
              </button>
            </div>

            <div className="offcanvas offcanvas-start d-lg-none rounded-bottom-2 border-0" style={{ width: "350px", height: "88%", borderColor: "white" }} tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
              <div className="offcanvas-header d-flex justify-content-between m-0 p-0 pt-2">
                <a href="/" style={{ textDecoration: "none", color: "black" }}>
                  <div className="d-flex">
                    <img src={peludos} style={{ width: "80px", height: "80px" }} className="ms-2" decoding="async" loading="eager" alt="asd" />
                    <h5 className="offcanvas-title my-auto fw-light" id="offcanvasRightLabel" style={{ fontFamily: "Roboto" }}>
                      PELUDOS <br></br> Pet Shop
                    </h5>
                  </div>
                </a>
                <button type="button" className="btn-close me-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <hr className="d-flex ms-0" style={{ height: "1px" }}></hr>

              <div className="offcanvas-body rounded-2 p-0 ps-2 mt-1" style={{ backgroundColor: "#ffffff" }}>
                <a href="/shop/all/all/all/all/all/1" style={{ textDecoration: "none", color: "black" }}>
                  <button className="modal-line border-0 text-start">
                    <img src={storeIcon} alt="carrito" className="shopping-Cart mb-1 mx-2" style={{ width: "20px", height: "20px" }} />
                    SHOP
                  </button>
                </a>

                <button className="modal-line border-0 text-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample1" aria-expanded="false" aria-controls="collapseWidthExample">
                  <h4 className="dropdown-toggle my-auto">
                    <img src={bowlIcon} alt="alimentos" className="shopping-Cart mb-1 mx-2" style={{ width: "20px" }} />
                    ALIMENTOS
                  </h4>
                </button>

                <div className="collapse collapse-horizontal" id="collapseWidthExample1">
                  <div className="card p-2 d-flex m-auto" style={{ width: "300px" }}>
                    <button className="modal-line dropdown-toggle  w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample2" aria-expanded="false" aria-controls="collapseWidthExample">
                      <img src={dogIcon} alt="perro" className="shopping-Cart mx-2 mb-2" style={{ width: "30px", height: "30px" }} />
                      PERRO
                    </button>
                    <div className="collapse collapse-horizontal" id="collapseWidthExample2">
                      <div className="card  border-0 p-0 d-grid m-auto">
                        <div className="modal-line p-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample2" aria-expanded="false" aria-controls="collapseWidthExample">
                          <ul className="p-0 m-0">
                            <div className="modal-line p-0 m-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample4" aria-expanded="false" aria-controls="collapseWidthExample">
                              <li>
                                <button className="buttonMobileMenuDrop">
                                  <p className="my-auto">CACHORRO</p>
                                </button>
                              </li>
                              <div className="collapse collapse-horizontal" id="collapseWidthExample4">
                                <div className="card border-0 p-0 d-grid m-auto">
                                  <div className="modal-line p-0 m-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample4" aria-expanded="false" aria-controls="collapseWidthExample">
                                    <ul className="border border-1 rounded-1 p-0 mb-2">
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Cachorro", "Raza Pequeña", "Perro", "all", "all")}>
                                          RAZA PEQUEÑA
                                        </button>
                                      </li>
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Cachorro", "Me", "Perro", "all", "all")}>
                                          RAZA MEDIANA
                                        </button>
                                      </li>
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Cachorro", "Gr", "Perro", "all", "all")}>
                                          RAZA GRANDE
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="modal-line p-0 m-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample5" aria-expanded="false" aria-controls="collapseWidthExample">
                              <li>
                                <button className="buttonMobileMenuDrop">ADULTO</button>
                              </li>
                              <div className="collapse collapse-horizontal" id="collapseWidthExample5">
                                <div className="card border-0 p-0 d-grid m-auto">
                                  <div className="modal-line p-0 m-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample5" aria-expanded="false" aria-controls="collapseWidthExample">
                                    <ul className="border border-1 rounded-1 p-0 mb-2">
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Adulto", "Raza Pequeña", "Perro", "all", "all")}>
                                          RAZA PEQUEÑA
                                        </button>
                                      </li>
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Adulto", "Me", "Perro", "all", "all")}>
                                          RAZA MEDIANA
                                        </button>
                                      </li>
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Adulto", "Gr", "Perro", "all", "all")}>
                                          RAZA GRANDE
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="modal-line p-0 m-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample10" aria-expanded="false" aria-controls="collapseWidthExample">
                              <li>
                                <button className="buttonMobileMenuDrop">ADULTO MAYOR</button>
                              </li>
                              <div className="collapse collapse-horizontal" id="collapseWidthExample10">
                                <div className="card border-0 p-0 d-grid m-auto mt-3">
                                  <div className="modal-line p-0 m-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample10" aria-expanded="false" aria-controls="collapseWidthExample">
                                    <ul className="border border-1 rounded-1 p-0 mb-2">
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Adulto Mayor", "Raza Pequeña", "Perro", "all", "all")}>
                                          RAZA PEQUEÑA
                                        </button>
                                      </li>
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Adulto Mayor", "Me", "Perro", "all", "all")}>
                                          RAZA MEDIANA
                                        </button>
                                      </li>
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Adulto Mayor", "Gr", "Perro", "all", "all")}>
                                          RAZA GRANDE
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="modal-line p-0 m-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample7" aria-expanded="false" aria-controls="collapseWidthExample">
                              <li>
                                <button className="buttonMobileMenuDrop">ESPECIALES</button>
                              </li>

                              <div className="collapse collapse-horizontal" id="collapseWidthExample7">
                                <div className="card border-0 p-0 d-grid m-auto mt-3">
                                  <div className="modal-line p-0 m-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample7" aria-expanded="false" aria-controls="collapseWidthExample">
                                    <ul className="border border-1 rounded-1 p-0">
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Perro", "Cardiaco", "all")}>
                                          CARDÍACO
                                        </button>
                                      </li>
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Perro", "Dermico", "all")}>
                                          DÉRMICO
                                        </button>
                                      </li>
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Perro", "Diabetico", "all")}>
                                          DIABETICO
                                        </button>
                                      </li>
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Perro", "Gastro", "all")}>
                                          GASTROENTÉRICO
                                        </button>
                                      </li>
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Perro", "Obesidad", "all")}>
                                          OBESIDAD
                                        </button>
                                      </li>
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Perro", "Renal", "all")}>
                                          RENAL
                                        </button>
                                      </li>
                                      <li>
                                        <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Perro", "Urinario", "all")}>
                                          URINARIO
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="collapse collapse-horizontal" id="collapseWidthExample1">
                  <div className="card p-2 d-flex m-auto" style={{ width: "300px" }}>
                    <button className="modal-line dropdown-toggle w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample3" aria-expanded="false" aria-controls="collapseWidthExample">
                      <img src={catIcon} alt="gato" className="shopping-Cart mb-2 mx-2" style={{ width: "30px", height: "30px" }} />
                      GATO
                    </button>
                    <div className="collapse collapse-horizontal" id="collapseWidthExample3">
                      <div className="card border-0 p-0 d-grid m-auto">
                        <div className="modal-line p-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample4" aria-expanded="false" aria-controls="collapseWidthExample">
                          <li>
                            <button className="buttonMobileMenuDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Cachorro", "all", "Gato", "all", "all")}>
                              CACHORRO
                            </button>
                          </li>
                          <li>
                            <button className="buttonMobileMenuDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Adulto", "all", "Gato", "all", "all")}>
                              ADULTO
                            </button>
                          </li>
                          <li>
                            <button className="buttonMobileMenuDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Adulto Mayor", "all", "Gato", "all", "all")}>
                              ADULTO MAYOR
                            </button>
                          </li>

                          <div className="modal-line p-0 m-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample11" aria-expanded="false" aria-controls="collapseWidthExample">
                            <li>
                              <button className="buttonMobileMenuDrop">ESPECIALES</button>
                            </li>
                            <div className="collapse collapse-horizontal" id="collapseWidthExample11">
                              <div className="card card-body border-0 p-0 d-flex m-auto mt-3" style={{ width: "auto" }}>
                                <div className="modal-line p-0 m-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample11" aria-expanded="false" aria-controls="collapseWidthExample">
                                  <ul className="border border-1 rounded-1 p-0">
                                    <li>
                                      <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Perro", true, "Cardiaco", "all")}>
                                        CARDÍACO
                                      </button>
                                    </li>
                                    <li>
                                      <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Gato", "Dermico", "all")}>
                                        DÉRMICO
                                      </button>
                                    </li>
                                    <li>
                                      <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Gato", "Diabetico", "all")}>
                                        DIABETICO
                                      </button>
                                    </li>
                                    <li>
                                      <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Gato", "Gastro", "all")}>
                                        GASTROENTÉRICO
                                      </button>
                                    </li>
                                    <li>
                                      <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Gato", "Obesidad", "all")}>
                                        OBESIDAD
                                      </button>
                                    </li>
                                    <li>
                                      <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Gato", "Renal", "all")}>
                                        RENAL
                                      </button>
                                    </li>
                                    <li>
                                      <button className="buttonMobileMenuDropDrop" data-bs-dismiss="offcanvas" onClick={() => handleFilter("all", "all", "Gato", "Urinario", "all", "all")}>
                                        URINARIO
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="modal-line" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Accesorios", "all", "all", "all", "all")}>
                  <img src={crownIcon} alt="accesorios" className="shopping-Cart mb-1 mx-2" style={{ width: "20px", height: "20px" }} />
                  ACCESORIOS
                </button>
                <button className="modal-line" onClick={() => handleFilter("Juguetes", "all", "all", "all", "all")} data-bs-dismiss="offcanvas">
                  <img src={footballIcon} alt="juguetes" className="shopping-Cart mb-1 mx-2" style={{ width: "20px", height: "20px" }} />
                  JUGUETES
                </button>
                <button className="modal-line" data-bs-dismiss="offcanvas" onClick={() => handleFilter("Salud", "all", "all", "all", "all")}>
                  <img src={medicalIcon} alt="higiene-salud" className="shopping-Cart mb-1 mx-2" style={{ width: "20px", height: "20px" }} />
                  HIGIENE Y SALUD
                </button>

                <hr className="d-flex mx-auto" style={{ height: "2px", width: "50%" }}></hr>

                <button onClick={() => handleFilter("all", "all", "all", "all", "flash")} className="modal-line" data-bs-dismiss="offcanvas">
                  <img src={boltIcon} alt="ofertas" className="shopping-Cart mb-1 mx-2" style={{ width: "20px", height: "20px" }} />
                  FLASH SALES
                </button>
                <button onClick={() => handleFilter("all", "all", "all", "all", "descuento")} className="modal-line" data-bs-dismiss="offcanvas">
                  <img src={tagIcon} alt="promociones" className="shopping-Cart mb-1 mx-2" style={{ width: "20px", height: "20px" }} />
                  OFERTAS DEL MES
                </button>

                <hr className="d-flex mx-auto" style={{ height: "2px", width: "50%" }}></hr>

                <button className="modal-line" data-bs-dismiss="offcanvas" onClick={goToBottom}>
                  <img src={rssIcon} alt="suscripcion" className="shopping-Cart mb-1 mx-2" style={{ width: "20px", height: "20px" }} />
                  SUSCRIBIRME
                </button>
                <button className="modal-line" data-bs-dismiss="offcanvas" onClick={goToBottom}>
                  <img src={messageIcon} alt="contacto" className="shopping-Cart mb-1 mx-2" style={{ width: "20px", height: "20px" }} />
                  CONTACTO
                </button>
              </div>
            </div>
          </div>

          {/* MENU DESKTOP WIDESCREEN */}
          <div className="col col-sm-1 col-lg-5 d-none d-lg-block p-0 ">
            <ul className="navbar-nav">
              <li>
                <Link className="nav-link" aria-current="page" to="/">
                  INICIO
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/shop/all/all/all/all/all/1">
                  SHOP
                </Link>
              </li>
              <li>
                <button className="nav-link" onClick={goToBottom}>
                  CONTACTO
                </button>
              </li>
              <li>
                <button className="nav-link" onClick={goToBottom}>
                  SUSCRIBIRME
                </button>
              </li>
            </ul>
          </div>
          {/* MENU DESKTOP WIDESCREEN */}

          {/* BUSCADOR USUARIO Y CARRITO */}
          <div className="col col-xs-12 col-sm-6 col-lg-4 d-flex align-items-center px-3 my-2 m-auto justify-content-between position-relative" style={{ height: "auto" }}>
            <form className="d-flex position-relative align-items-center" role="search">
              <input
                className="form-control me-1 w-100 position-relative"
                id="placeholder"
                style={{
                  outline: "none",
                  boxShadow: "none",
                  outlineColor: "orange",
                  borderColor: "#aaaaaa",
                }}
                type="search"
                placeholder="Buscar.."
                aria-label="Search"
                onChange={handleInputChange}
                value={searchValue}
                onBlur={borrarContenido}
              />
              <img src={lupaIcon} alt="lupa" decoding="async" loading="eager" className="shopping-Cart position-absolute my-auto" style={{ width: "17px", height: "17px", marginTop: "8px", marginLeft: "13px", opacity: "70%" }} />
              <div
                className="d-grid bg-white p-0 rounded-1 shadow-sm"
                style={{
                  position: "absolute",
                  zIndex: "9999",
                  width: "270px",
                  maxHeight: "450px",
                  overflowY: "auto",
                  marginTop: "500px",
                }}>
                {searchValue.length > 0 && searchFiltered.map((product) => <Search key={product._id} productKey={product._id} subMarca={product.subMarca} marca={product.marca} mascota={product.mascota} kg={product.kg} edad={product.edad} raza={product.raza} img={product.img} />)}
              </div>
            </form>

            <div className="dropdown">
              <button type="button" className="btn border-0" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={userIcon} alt="usuario" decoding="async" loading="eager" className="shopping-Cart" style={{ width: "22px", height: "27px" }} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end mt-1">
                {verified === false ? (
                  <React.Fragment>
                    <li>
                      <button className="dropdown-item " type="button" onClick={handleRegistrationButtonClickLogin}>
                        INICIAR SESIÓN
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item pt-2" onClick={handleRegistrationButtonClick}>
                        REGISTRARSE
                      </button>
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li>
                      <button
                        onClick={() => {
                          handleShowData();
                          mostrarDatosFacturacion();
                        }}
                        className="btn dropdown-item">
                        MIS DATOS
                      </button>
                    </li>
                    <li>
                      <a className="btn dropdown-item pt-2  " type="button" href="http://localhost:3002/backend/logout" style={{ textDecoration: "none", color: "black" }}>
                        CERRAR SESIÓN
                      </a>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </div>
            <button type="button" className="btn btn-md position-relative border-0  m-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
              <img src={cartIcon} alt="carrito" decoding="async" loading="eager" className="shopping-Cart" style={{ width: "28px", height: "28px" }} />
              {cart.length > 0 ? <span className="position-absolute top-0 start-75 translate-middle badge rounded-5 bg-danger">{cart.length}</span> : null}
            </button>

            {/* BUSCADOR USUARIO Y CARRITO */}
            <>
              <Modal className="m-auto p-0" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Registrarse</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="m-auto text-center p-0 position-relative">
                    <button className="btn btn-warning w-100 p-0 m-0  rounded-2 my-2 text-white shadow-sm" style={{ height: "40px" }}>
                      <a href="http://localhost:3002/backend/auth/google" className="m-0 p-0 d-flex justify-content-center text-white" style={{ width: "auto", textDecoration: "none" }}>
                        <img src={google} alt="google-login" className="shopping-Cart " style={{ width: "25px", height: "25px" }} />
                        <h5 className="m-0 ms-2">Google</h5>
                      </a>
                    </button>
                    <button className="btn btn-warning w-100 p-0 m-0  rounded-2 my-2 text-white shadow-sm" style={{ height: "40px" }}>
                      <a href="http://localhost:3002/backend/auth/facebook" className="m-0 p-0 d-flex justify-content-center text-white" style={{ width: "auto", textDecoration: "none" }}>
                        <img src={facebook} alt="facebook-login" className="shopping-Cart " style={{ width: "25px", height: "25px" }} />
                        <h5 className="m-0 ms-2">Facebook</h5>
                      </a>
                    </button>
                  </div>
                  <div className="d-flex mt-2">
                    <hr style={{ width: "45%", marginRight: "10px" }}></hr>
                    <p>ó</p>
                    <hr style={{ width: "45%", marginLeft: "10px" }}></hr>
                  </div>

                  <Form onSubmit={handleSubmit} method="POST">
                    <Form.Group>
                      <Form.Label>Usuario:</Form.Label>
                      <Form.Control type="email" name="username" placeholder="Ingrese su email" value={usernamee} onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label style={{ marginTop: "10px" }}>Contraseña:</Form.Label>
                      <span
                        className="passwordicon"
                        style={{
                          width: "35px",
                          height: "30px",
                          display: "flex",
                          position: "absolute",
                          right: "30px",
                          bottom: "70px",
                          cursor: "pointer",
                        }}>
                        <>
                          {showPassword === false ? (
                            <img src={eye1} alt="eye" onClick={showPass} style={{ color: "#aaaaaa", margin: "auto", width: "20px", opacity: "50%" }} />
                          ) : (
                            <img src={eye2} alt="eye" onClick={showPass} style={{ color: "#aaaaaa", margin: "auto", width: "20px", opacity: "50%" }} />
                          )}
                        </>
                      </span>
                      <Form.Control type={showPassword === true ? "text" : "password"} name="password" placeholder="Ingrese su contraseña" value={passwordd} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button style={{ marginTop: "12px", borderRadius: "5px" }} variant="warning" type="submit">
                      Registrarse
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </>

            <>
              <Modal className="m-auto p-0" show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                  <Modal.Title>Iniciar sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="m-auto text-center p-0 position-relative">
                    <button className="btn btn-warning w-100 p-0 m-0  rounded-2 my-2 text-white shadow-sm" style={{ height: "40px" }}>
                      <a href="http://localhost:3002/backend/auth/google" className="m-0 p-0 d-flex justify-content-center text-white" style={{ width: "auto", textDecoration: "none" }}>
                        <img src={google} alt="google-login" className="shopping-Cart " style={{ width: "25px", height: "25px" }} />
                        <h5 className="m-0 ms-2">Google</h5>
                      </a>
                    </button>
                    <button className="btn btn-warning w-100 p-0 m-0  rounded-2 my-2 text-white shadow-sm" style={{ height: "40px" }}>
                      <a href="http://localhost:3002/backend/auth/facebook" className="m-0 p-0 d-flex justify-content-center text-white" style={{ width: "auto", textDecoration: "none" }}>
                        <img src={facebook} alt="facebook-login" className="shopping-Cart " style={{ width: "25px", height: "25px" }} />

                        <h5 className="m-0 ms-2">Facebook</h5>
                      </a>
                    </button>
                  </div>
                  <div className="d-flex">
                    <hr style={{ width: "45%", marginRight: "10px" }}></hr>
                    <p>ó</p>
                    <hr style={{ width: "45%", marginLeft: "10px" }}></hr>
                  </div>

                  <Form onSubmit={handleSubmitLogin} method="POST">
                    <Form.Group>
                      <Form.Label>Usuario:</Form.Label>

                      <Form.Control type="email" name="username" placeholder="Ingrese su email" value={usernameeLogin} onChange={(e) => setUsernameLogin(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label style={{ marginTop: "10px" }}>Contraseña:</Form.Label>
                      <span
                        className="passwordicon"
                        style={{
                          width: "35px",
                          height: "30px",
                          display: "flex",
                          position: "absolute",
                          right: "30px",
                          bottom: "70px",
                          cursor: "pointer",
                        }}>
                        <>
                          {showPassword === false ? (
                            <img src={eye1} alt="eye" onClick={showPass} style={{ color: "#aaaaaa", margin: "auto", width: "20px", opacity: "50%" }} />
                          ) : (
                            <img src={eye2} alt="eye" onClick={showPass} style={{ color: "#aaaaaa", margin: "auto", width: "20px", opacity: "50%" }} />
                          )}
                        </>
                      </span>

                      <Form.Control type={showPassword === true ? "text" : "password"} name="password" placeholder="Ingrese su contraseña" value={passworddLogin} onChange={(e) => setPasswordLogin(e.target.value)} required />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                      <Button style={{ marginTop: "13px", borderRadius: "5px" }} variant="warning" type="submit">
                        Iniciar sesión
                      </Button>
                    </div>
                  </Form>
                  <button onClick={handleOpenRecovery} className="position-absolute p-0 border-0 bg-transparent" style={{ fontSize: "11px", right: "20px", bottom: "20px", textDecorationLine: "underline", width: "70px" }}>
                    ¿Olvidaste tu contraseña?
                  </button>
                </Modal.Body>
              </Modal>
            </>

            <>
              <Modal className="m-auto p-0" show={showRecovery} onHide={handleCloseRecovery}>
                <Modal.Header closeButton>
                  <Modal.Title>Recuperar Contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmitRecovery} action="/forgot-password" method="POST">
                    <Form.Group>
                      <Form.Label>Usuario:</Form.Label>

                      <Form.Control type="email" name="username" placeholder="Ingrese su email" value={usernameeRecovery} onChange={(e) => setUsernameRecovery(e.target.value)} required />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                      <Button className="ms-auto" style={{ marginTop: "13px", borderRadius: "5px" }} variant="warning" type="submit">
                        Recuperar Contraseña
                      </Button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal>
            </>

            <>
              <Modal className="m-auto p-0" show={showData} onHide={handleCloseData}>
                <Modal.Header closeButton>
                  <Modal.Title>Datos de facturacion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmitData} action="/data" method="PUT">
                    <div className="d-inline">
                      <Form.Group className="mx-1">
                        <Form.Label className="mx-1">E-mail:</Form.Label>
                        <Form.Control type="text" name="email" placeholder="Ingrese su correo electronico" value={datos.email} onChange={(e) => handleChangeData("email", e.target.value)} required />
                      </Form.Group>

                      <Form.Group className="mx-1">
                        <Form.Label className="mx-1">Nombre:</Form.Label>
                        <Form.Control type="text" name="nombre" placeholder="Ingrese su nombre" value={datos.nombre} onChange={(e) => handleChangeData("nombre", e.target.value)} required />
                      </Form.Group>

                      <Form.Group className="mx-1">
                        <Form.Label className="mx-1">Apellido:</Form.Label>
                        <Form.Control type="text" name="apellido" placeholder="Ingrese su apellido" value={datos.apellido} onChange={(e) => handleChangeData("apellido", e.target.value)} required />
                      </Form.Group>
                    </div>

                    <div className="d-flex">
                      <Form.Group className="mx-1" style={{ width: "70px" }}>
                        <Form.Label className="mx-1" style={{ marginTop: "10px" }}>
                          Telefono:
                        </Form.Label>
                        <Form.Control type="text" name="codArea" placeholder="Sin el 0" value={datos.codArea} onChange={(e) => handleChangeData("codArea", e.target.value)} required style={{ width: "70px" }} />
                      </Form.Group>

                      <h5 className=" mt-auto p-0 me-1">-</h5>
                      <Form.Group className="me-1" style={{ width: "135px" }}>
                        <Form.Label className="mx-1" style={{ marginTop: "27px" }}></Form.Label>
                        <Form.Control type="text" name="telefono" placeholder="Sin el 15" value={datos.telefono} onChange={(e) => handleChangeData("telefono", e.target.value)} required />
                      </Form.Group>

                      <Form.Group className="mx-1">
                        <Form.Label className="mx-1" style={{ marginTop: "10px" }}>
                          Provincia:
                        </Form.Label>
                        <Form.Control type="text" name="provincia" placeholder="Ingrese la provincia" value={datos.provincia} onChange={(e) => handleChangeData("provincia", e.target.value)} required />
                      </Form.Group>
                    </div>

                    <div className="d-flex">
                      <Form.Group className="mx-1">
                        <Form.Label className="mx-1" style={{ marginTop: "10px" }}>
                          Barrio/Localidad:
                        </Form.Label>
                        <Form.Control type="text" name="localidad" placeholder="Ingrese la localidad" value={datos.localidad} onChange={(e) => handleChangeData("localidad", e.target.value)} required />
                      </Form.Group>

                      <Form.Group className="mx-1">
                        <Form.Label className="mx-1" style={{ marginTop: "10px" }}>
                          Codigo Postal:
                        </Form.Label>
                        <Form.Control type="text" name="codigo" placeholder="Ingrese el codigo postal" value={datos.codigo} onChange={(e) => handleChangeData("codigo", e.target.value)} required />
                      </Form.Group>
                    </div>

                    <div className="d-flex">
                      <Form.Group className="mx-1">
                        <Form.Label className="mx-1" style={{ marginTop: "10px" }}>
                          Calle:
                        </Form.Label>
                        <Form.Control type="text" name="calle" placeholder="Ingrese la calle" value={datos.calle} onChange={(e) => handleChangeData("calle", e.target.value)} required />
                      </Form.Group>

                      <Form.Group className="mx-1">
                        <Form.Label className="mx-1" style={{ marginTop: "10px" }}>
                          Altura:
                        </Form.Label>
                        <Form.Control type="text" name="altura" placeholder="Ingrese la altura" value={datos.altura} onChange={(e) => handleChangeData("altura", e.target.value)} required />
                      </Form.Group>
                    </div>

                    <div className="d-flex">
                      <Form.Group className="mx-1">
                        <Form.Label className="mx-1" style={{ marginTop: "10px" }}>
                          Piso: (opcional)
                        </Form.Label>
                        <Form.Control type="text" name="piso" placeholder="Ingrese el piso" value={datos.piso} onChange={(e) => handleChangeData("piso", e.target.value)} />
                      </Form.Group>

                      <Form.Group className="mx-1">
                        <Form.Label className="mx-1" style={{ marginTop: "10px" }}>
                          Depto: (opcional)
                        </Form.Label>
                        <Form.Control type="text" name="departamento" placeholder="Ingrese el departamento" value={datos.departamento} onChange={(e) => handleChangeData("departamento", e.target.value)} />
                      </Form.Group>
                    </div>

                    <Form.Group className="mx-1">
                      <Form.Label className="mx-1" style={{ marginTop: "10px" }}>
                        Informacion adicional: (opcional)
                      </Form.Label>
                      <Form.Control type="text" name="info" placeholder='ej: "Casa de rejas verdes."' value={datos.info} onChange={(e) => handleChangeData("info", e.target.value)} />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                      <Button style={{ marginTop: "13px", borderRadius: "5px" }} variant="warning" type="submit">
                        Guardar
                      </Button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal>
            </>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
