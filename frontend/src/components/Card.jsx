import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Card.css";
import boltIcon from "../assets/images/bolt-solid.svg";
import cartIcon from "../assets/images/cart-shopping-solid.svg";
import whatsappIcon from "../assets/images/whatsapp.svg";
import checkIcon from "../assets/images/square-check-regular.svg";

function Card(props) {
  const [showAlert, setShowAlert] = useState(false);
  const [daysRemaning, setDaysRemaning] = useState("");

  const addToCart = () => {
    props.addToCart(props);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1350);
  };

  const toPesos = (props) => {
    // Convierte el precio a un número
    const precioNum = parseFloat(props.precio);

    // Verifica si el precio es un número válido
    if (isNaN(precioNum)) {
      return "Precio inválido";
    }

    // Formatea el precio como moneda en pesos argentinos sin decimales ni separador de miles
    const valorEnPesos = precioNum.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return valorEnPesos;
  };

  const handleEncargarClick = () => {
    // Número de teléfono al que deseas enviar el mensaje
    const phoneNumber = "+5492478407219";
    var idItem = props.productKey;
    console.log(idItem);
    // Mensaje que deseas enviar
    const message = "¡Hola! Quiero hacer un encargue de este alimento. https://www.peludosarrecifes.com/product/" + idItem;

    // Crea la URL de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Abre la URL en una nueva ventana o pestaña del navegador
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const remainingDays = getTimePurina();
    setDaysRemaning(remainingDays);
  }, []);

  const getTimePurina = () => {
    let days = 0;
    let dayGenesis = new Date("July 31, 2023 11:45:00"); // lunes 1

    if (props.marca === "PURINA" || props.marca === "W.E.F.") {
      days = 7;
      dayGenesis = new Date("August 8, 2023 11:45:00");
    } else if (props.marca === "VITAL CAN") {
      days = 14;
      dayGenesis = new Date("August 9, 2023 10:45:00");
    } else if (props.marca === "UNIK") {
      days = 14;
      dayGenesis = new Date("July 27, 2023 11:45:00");
    }

    const today = new Date();
    const miliSecPerDay = 86400000;
    const timeLapsedMilisec = today.getTime() - dayGenesis.getTime();
    const numberWeeks = Math.floor(timeLapsedMilisec / (miliSecPerDay * days));
    const lapsedDays = numberWeeks * days;
    const daysRemaning = Math.floor(days - (timeLapsedMilisec - lapsedDays * miliSecPerDay) / miliSecPerDay);
    return daysRemaning;
  };

  function Encargue() {
    let devuelve;

    if (props.stock === false) {
      devuelve = (
        <button type="button p-0" onClick={handleEncargarClick} className="btn btn-lg btn-block btn-outline-dark p-0 m-0 rounded-1 w-100 d-grid" style={{ height: "50px", borderColor: "grey" }}>
          <div className="p-0" style={{ height: "12px" }}>
            <p className="border-0 rounded-top-1" style={{ backgroundColor: "#B7B7B7", color: "white", height: "15px", fontSize: "10px", fontWeight: "500" }}>
              SIN STOCK
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center w-100 m-0 p-0 px-2" style={{ height: "40px" }}>
            <p className="m-auto d-flex d-flex align-items-center " style={{ fontSize: "10px" }}>
              <img src={whatsappIcon} alt="whatsapp" className="whatsappIcon me-1 mb-1" style={{ width: "24px" }} />
              {props.marca === "VITAL CAN" || props.marca === "PURINA" || props.marca === "UNIK" ? (
                <>
                  ¡ENCARGALO! LLEGA EN: {daysRemaning} {daysRemaning === 1 ? "DÍA" : "DÍAS"}
                </>
              ) : (
                <>¡ENCARGALO!</>
              )}
            </p>
          </div>
        </button>
      );
    } else {
      devuelve = (
        <button type="button" onClick={() => addToCart(props)} className="btn btn-lg btn-block btn-outline-warning p-0 m-0 rounded-1 agregaCart w-100" style={{ fontSize: "14px", alignItems: "center", height: "50px" }}>
          <div className="d-flex justify-content-center align-items-center w-100 m-0 px-2">
            <p className="m-auto d-flex text-center justify-content-center">
              <img src={cartIcon} alt="carrito" className="shopping-Cart me-2" style={{ width: "22px", marginBottom: "2px" }} />
              AGREGAR AL CARRITO
            </p>
          </div>
        </button>
      );
    }
    return devuelve;
  }

  return (
    <div className="d-flex justify-content-center col col-xs-6 col-sm-4 col-md-4 col-lg-4 col-xl-3 col-xxl-3 m-0 p-0 my-1 px-1 mt-1">
      <div className="card text-center mt-0 p-1 rounded-2 w-100 shadow-sm">
        <div className="tarjeta-agregado-exito m-0 w-100 p-0 position-relative left-0 top-0">
          {showAlert && (
            <div className="alert alert-light mx-auto p-0 m-0 w-100 position-absolute" role="alert" style={{ height: "190px", zIndex: "5000" }}>
              <h5 className="pt-3">¡Agregado al carrito!</h5>
              <img src={checkIcon} alt="validacion" className="whatsappIcon mx-auto" style={{ width: "100px" }} />
            </div>
          )}
        </div>
        <div className="card-body p-0 position-relative align-items-top">
          <>
            {props.offer === "flash" ? (
              <div className="bolt-Icon m-1">
                <p className="fw-bold m-auto" style={{ fontSize: "13px" }}>
                  FLASH
                </p>
                <img src={boltIcon} alt="oferta" style={{ width: "19px" }} />
              </div>
            ) : null}
          </>
          <>
            {" "}
            {props.offer === "descuento" ? (
              <>
                <div className="position-absolute d-grid rounded-3 text-white" style={{ width: "45px", top: "0px", right: "0px", color: "white", fontSize: "15px", backgroundColor: "orange" }}>
                  <p className="fw-light p-0 m-auto">-5 %</p>
                  <p className="fw-light p-0 m-auto">OFF</p>
                </div>
              </>
            ) : null}
          </>

          <Link to={`/product/${props.productKey}`}>
            <img decoding="async" loading="eager" alt={props.img} className="img-fluid border-0 my-2" style={{ height: "178px", width: "auto" }} tag={props.img} src={require(`../assets/images/${props.img}`)} />
          </Link>

          <div className="card-header d-inline p-0 m-0">
            <hr className="py-1 m-0 w-100"></hr>
            <dl>
              <dt>
                <div className="p-0 ps-1 m-0 text-start" style={{ fontFamily: "Roboto" }}>
                  {props.subMarca ? (
                    <>
                      <h5>
                        {props.marca} - {props.subMarca}
                      </h5>
                    </>
                  ) : (
                    <h5>{props.marca}</h5>
                  )}
                </div>
              </dt>
              <dd>
                <h6 className="ps-1 m-0 text-secondary text-start fw-normal">
                  {props.edad === "Accesorios" || props.edad === "Juguetes" || props.edad === "Salud" ? (
                    props.mascota
                  ) : (
                    <>
                      {props.mascota} {props.edad}
                    </>
                  )}

                  <br></br>
                  {props.raza}
                </h6>
              </dd>
              <dd>
                {props.edad !== "Accesorios" || props.edad !== "Juguetes" || props.edad !== "Salud" ? (
                  <em>
                    <h6 className="ps-1" style={{ fontSize: "14px", position: "relative", alignItems: "start", display: "flex", margin: "auto" }}>
                      x {props.kg} Kg
                    </h6>
                  </em>
                ) : null}

                <h3 className="ps-1 fw-normal" style={{ fontSize: "20px", alignItems: "center", display: "flex", margin: "0" }}>
                  {toPesos(props)}
                </h3>
              </dd>
            </dl>
          </div>
        </div>
        <Encargue />
      </div>
    </div>
  );
}

export default Card;
