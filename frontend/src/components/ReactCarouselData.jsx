import React, { useContext, useState, memo } from "react";
import { AppContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import boltIcon from "../assets/images/bolt-solid.svg";
import whatsappIcon from "../assets/images/whatsapp.svg";
import cartIcon from "../assets/images/cart-shopping-solid.svg";
import checkIcon from "../assets/images/square-check-regular.svg";
import "../assets/styles/Card.css";

function CardCarousel(props) {
  const { cart, setCart } = useContext(AppContext);
  const [showAlert, setShowAlert] = useState(false);

  const addToCart = (id) => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);

    const existingItem = cart.find((item) => item.productKey === id.productKey);

    if (!existingItem) {
      const newItem = {
        key: id.productKey,
        productKey: id.productKey,
        tipo: id.tipo,
        marca: id.marca,
        subMarca: id.subMarca,
        mascota: id.mascota,
        edad: id.edad,
        raza: id.raza,
        kg: id.kg,
        precio: id.precio,
        stock: id.stock,
        img: id.img,
        img1: id.img1,
        offer: id.offer,
        porcDescuento: id.porcDescuento,
        imgCombo: id.imgCombo,
        description: id.description,
        description1: id.description1,
        description2: id.description2,
        alto: id.alto,
        ancho: id.ancho,
        profundo: id.profundo,
        cant: 1,
      };
      setCart((prevItems) => [...prevItems, newItem]);
    }
  };

  const precioFormatOptions = {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  const toPesos = (props) => {
    const precioNum = parseFloat(props.precio);
    if (isNaN(precioNum)) {
      return "Precio inválido";
    }
    const valorEnPesos = precioNum.toLocaleString("es-AR", precioFormatOptions);
    return valorEnPesos;
  };

  const handleEncargarClick = () => {
    // Número de teléfono al que deseas enviar el mensaje
    const phoneNumber = "+5492478407219";
    let idItem = props.productKey;
    console.log(idItem);
    // Mensaje que deseas enviar
    const message = "¡Hola! Quiero hacer un encargue de este alimento. https://www.peludosarrecifes.com/product/" + idItem;

    // Crea la URL de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Abre la URL en una nueva ventana o pestaña del navegador
    window.open(whatsappUrl, "_blank");
  };

  function Encargue({ item }) {
    return (
      <div className="botonescompra mb-1 d-flex gap-1 d-flex justify-content-center px-1">
        {item.stock === false ? (
          <>
            <button type="button" style={{ minWidth: "53px", width: "40%", height: "45px" }} className="btn btn-lg btn-block btn-outline-dark py-auto rounded-3 my-auto p-0" disabled>
              <div className="m-auto d-flex justify-content-center align-items-center" style={{ width: "90%" }}>
                <p className="m-auto" style={{ fontSize: "15px" }}>
                  SIN STOCK
                </p>
              </div>
            </button>
            <button onClick={handleEncargarClick} type="button" style={{ minWidth: "110px", width: "100%", height: "45px" }} className="btn btn-lg btn-block btn-outline-warning rounded-3 my-auto p-0 d-flex">
              <div className="m-auto d-flex justify-content-evenly">
                <img src={whatsappIcon} alt="whatsapp" className="whatsappIcon me-1" style={{ width: "23px" }} />
                <h6 className="my-auto" style={{ fontSize: "16px" }}>
                  ENCARGAR
                </h6>
              </div>
            </button>
          </>
        ) : (
          <button type="button" onClick={() => addToCart(props)} style={{ fontSize: "19px", width: "100%", height: "45px" }} className="btn btn-lg btn-block btn-outline-warning agregaCart rounded-3 my-auto p-0">
            <div className="m-auto d-flex justify-content-center">
              <img src={cartIcon} alt="cart" className="shopping-Cart mx-1" style={{ width: "23px" }} />
              <h6 className="my-auto p-0 m-0" style={{ fontSize: "17px" }}>
                AGREGAR AL CARRITO
              </h6>
            </div>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="card-carousel text-center m-auto position-relative" style={{ height: "auto" }}>
      <div className="card-header-carousel justify-content-center d-grid pt-1 position-relative" style={{ height: "100px" }}>
        <h2 className="fw-normal">{props.subMarca ? props.subMarca : props.marca}</h2>
        <h6 className="fw-light">
          {" "}
          {props.mascota} {props.edad}
        </h6>
        <h6 className="fw-light">{props.raza ? props.raza : ""}</h6>
      </div>

      <div className="card-body-carousel">
        {showAlert && (
          <div className="alert alert-light position-absolute py-5 w-100" role="alert" style={{ zIndex: "99999", height: "100%", width: "auto" }}>
            <h4 className="pt-5">¡Agregado al carrito!</h4>
            <img src={checkIcon} className="whatsappIcon mx-auto" style={{ width: "120px" }} />
          </div>
        )}
        {props.offer === "flash" ? (
          <div className="position-absolute" style={{ top: "10px", right: "10px", fontSize: "18px" }}>
            <p className="fw-bold m-auto" style={{ fontSize: "13px", color: "yellow" }}>
              FLASH
            </p>
            <img className="bolt-Iconn" alt="flash" src={boltIcon} style={{ width: "20px" }} />
          </div>
        ) : null}{" "}
        {props.offer === "descuento" ? (
          <div className="position-absolute rounded-2 text-center" style={{ width: "50px", height: "50px", top: "10px", right: "10px", color: "white", fontSize: "18px", backgroundColor: "orange" }}>
            <p className="fw-light p-0 m-auto">-5 %</p>
            <p className="fw-light p-0 m-auto">OFF</p>
          </div>
        ) : null}
        <Link to={`/product/${props.productKey}`} className="d-flex justify-content-center m-auto">
          <img className="p-2 mt-3" decoding="async" loading="lazy" style={{ width: "auto", height: "300px" }} src={require(`../assets/images/${props.img}`)} alt={props.img} />
          <div className="tarjeta-agregado-exito w-100" style={{ position: "absolute", right: "0px", top: "0px", zIndex: "999999" }}></div>
        </Link>
        <em>
          <h5>{props.kg} Kg</h5>
        </em>
        <h2 className="price fw-normal">{toPesos(props)}</h2>
      </div>
      <Encargue item={props} />
    </div>
  );
}

export default memo(CardCarousel);
