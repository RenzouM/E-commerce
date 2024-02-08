import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/CartContext";
import { useApi } from "../context/ProductsContext";
import { Toaster, toast } from "sonner";
import Shipping from "../services/Shipping";
import "../assets/styles/Productt.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import whatsappIcon from "../assets/images/whatsapp.svg";
import cartIcon from "../assets/images/cart-shopping-solid.svg";
import up from "../assets/images/angle-up-solid.svg";
import down from "../assets/images/angle-down-solid.svg";

function Productt({ enviarMascota }) {
  const { id } = useParams();
  const { data } = useApi();
  const [product, setProduct] = useState();
  const [cant, setCant] = useState(1);
  const { cart, setCart } = useContext(AppContext);
  const [image, setImage] = useState(product?.img);
  const [daysRemaning, setDaysRemaning] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCant(1);
  }, [id]);

  useEffect(() => {
    // Verificamos si 'data' tiene datos antes de continuar
    if (data.length > 0) {
      loadItems();
    }
  }, [data, id]);

  useEffect(() => {
    const remainingDays = getTimePurina();
    setDaysRemaning(remainingDays);
  }, [product]);

  const handleImageClick = (imageUrl) => {
    setImage(imageUrl);
  };

  const loadItems = () => {
    const idEntero = parseInt(id, 10);
    const product = data.find((objeto) => objeto._id === idEntero);
    setProduct(product);
    let image = product?.img;
    setImage(image);
    const mascota = product?.mascota;
    const raza = product?.raza;
    const edad = product?.edad;
    enviarMascota(mascota, raza, edad);
  };

  async function cantitems(sumres) {
    if (sumres === "-" && cant > 1) {
      setCant(cant - 1);
    } else if (sumres === "+") {
      const jsonData = await fetchMax(id);
      if (jsonData > cant) {
        setCant(cant + 1);
      } else {
        toast.error("¡No tenemos suficientes unidades en stock!");
      }
    }
  }

  const fetchMax = async (id) => {
    const url = `/backend/maxStock/${id}`;
    console.log("URL de la solicitud:", url); // Agrega esta línea para verificar la URL
    try {
      const maxStock = await fetch(url);
      const jsonData = await maxStock.json();
      return jsonData;
    } catch (error) {
      console.error("Error al obtener el stock máximo:", error);
      return 0; // Puedes manejar el error según tus necesidades
    }
  };

  const toPesos = (props) => {
    // Convierte el precio a un número
    const precioNum = parseFloat(props);

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
    var idItem = product.id;
    console.log(idItem);
    // Mensaje que deseas enviar
    const message = "¡Hola! Quiero hacer un encargue de este alimento. https://www.peludosarrecifes.com/product/" + idItem;

    // Crea la URL de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Abre la URL en una nueva ventana o pestaña del navegador
    window.open(whatsappUrl, "_blank");
  };

  const getTimePurina = () => {
    let days = 0;
    let dayGenesis = new Date("July 31, 2023 11:45:00"); // lunes 1

    if (product?.marca === "PURINA" || product?.marca === "W.E.F.") {
      days = 7;
      dayGenesis = new Date("August 7, 2023 11:45:00");
    } else if (product?.marca === "VITAL CAN") {
      days = 14;
      dayGenesis = new Date("August 8, 2023 10:45:00");
    } else if (product?.marca === "UNIK") {
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

    if (!product?.stock) {
      devuelve = (
        <div className="border border-1 rounded-2 my-2 m-auto w-100 shadow-sm" style={{ maxHeight: "99999px" }}>
          <div className="border-0 rounded-2  m-0 p-0" style={{ backgroundColor: "orange" }}>
            <p className="border border-0 rounded-2 rounded-bottom-0 m-auto text-white fw-light " style={{ fontSize: "15px", backgroundColor: "#B7B7B7", maxHeight: "99999" }}>
              SIN STOCK
            </p>
            <p className="m-auto text-white fw-light" style={{ fontSize: "13px", backgroundColor: "orange", maxHeight: "99999" }}>
              {product?.marca === "VITAL CAN" || product?.marca === "PURINA" || product?.marca === "UNIK" ? (
                <>
                  ¡ENCARGALO! LLEGA EN: {daysRemaning} {daysRemaning === 1 ? "DÍA" : "DÍAS"}
                </>
              ) : (
                <>¡ENCARGALO!</>
              )}
            </p>
          </div>
          <div className="d-flex justify-content-center p-2">
            <button type="button" onClick={handleEncargarClick} className="btn btn-outline-warning rounded-1 w-100">
              <p className="m-auto" style={{ fontSize: "21px" }}>
                <img src={whatsappIcon} alt="whatsapp" className="whatsappIcon me-2 pb-1" style={{ width: "24px" }} />
                ENCARGAR
              </p>
            </button>
          </div>
        </div>
      );
    } else {
      devuelve = (
        <div className="border border-1 rounded-2 my-2 d-grid shadow-sm">
          <div className="my-auto rounded-top-2 w-100" style={{ backgroundColor: "orange" }}>
            <p className="m-1 text-light" style={{ maxHeight: "99999px", fontSize: "20px" }}>
              INDICA LA CANTIDAD
            </p>
          </div>

          <div className="d-flex justify-content-center">
            <div className="d-flex w-100 justify-content-between text-center m-2 p-0">
              <button type="" className="btn btn-lg btn-outline-secondary border-0" disabled>
                <p className="m-auto" style={{ fontSize: "20px" }}>
                  CANTIDAD:
                </p>
              </button>
              <div className="input-group p-0 m-0" style={{ width: "50%" }}>
                <button className="btn btn-outline-secondary rounded-start-2" onClick={() => cantitems("-")} style={{ width: "34%" }} type="button" id="inputGroupFileAddon04">
                  -
                </button>
                <input type="text" className="form-control m-0 text-center" style={{ width: "32%" }} aria-label="" value={cant} readOnly />
                <button className="btn btn-outline-secondary rounded-end-2" onClick={() => cantitems("+")} style={{ width: "34%" }} type="button" id="inputGroupFileAddon04">
                  +
                </button>
              </div>
            </div>
            <Toaster className="text-center" richColors />
          </div>

          <div className="m-0 p-2 pt-0 d-flex w-100">
            <button type="button" onClick={() => addToCart(product)} className="btn btn-lg btn-block btn-outline-warning rounded-2 w-100">
              <p className="p-0 m-0 d-flex justify-content-center fs-5">
                <img src={cartIcon} alt="cart" className="shopping-Cart me-2" style={{ width: "23px" }} />
                AGREGAR AL CARRITO +
              </p>
            </button>
          </div>
        </div>
      );
    }
    return devuelve;
  }

  const addToCart = (idd) => {
    const existingItem = cart.find((item) => item.productKey === idd._id);
    if (!existingItem) {
      if (cart.length === 0) {
        const newItem = {
          key: idd._id,
          productKey: idd._id,
          marca: idd.marca,
          subMarca: idd.subMarca,
          mascota: idd.mascota,
          raza: idd.raza,
          edad: idd.edad,
          kg: idd.kg,
          precio: idd.precio,
          img: idd.img,
          cant: cant,
        };
        setCart([newItem]);
      } else {
        const newItem = {
          key: idd._id,
          productKey: idd._id,
          marca: idd.marca,
          subMarca: idd.subMarca,
          mascota: idd.mascota,
          raza: idd.raza,
          edad: idd.edad,
          kg: idd.kg,
          precio: idd.precio,
          img: idd.img,
          cant: cant,
        };
        setCart((prevItems) => [...prevItems, newItem]);
      }
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center p-1">
        <div className="row align-items-center text-center m-auto" style={{ width: "100%" }}>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 m-auto m-0 p-0 my-auto d-grid align-items-center" style={{ height: "auto" }}>
            <div className="border rounded-2 shadow-sm" style={{ backgroundColor: "#F5F5F5", height: "auto" }}>
              <h1 className="m-auto mt-3 mb-2 fw-normal">
                {product?.marca} {product?.subMarca && ` - ${product?.subMarca}`}
              </h1>
              <h3 className="m-auto my-3 fw-normal">
                {product?.mascota} {product?.edad} {product?.raza}
              </h3>
              <h4 className="m-auto my-2">x{product?.kg} Kg</h4>
              <hr className="my-3"></hr>
              <h2 className="m-auto my-2">{toPesos(product?.precio)}</h2>
            </div>
            <Encargue />
            <Shipping />
          </div>

          <div className="col-xs-12 col-sm-3 col-md-1 col-lg-2 col-xl-2 col-xxl-2 d-grid m-auto justify-content-center text-center border rounded-1 me-2 d-none d-lg-block order-md-first p-0" style={{ height: "470px" }}>
            <div className="d-grid p-0" style={{ height: "100%" }}>
              <button className="btn mb-auto p-0" style={{ width: "100%", height: "30px", backgroundColor: "#F8F6F4" }}>
                <img src={up} alt={image} decoding="async" loading="eager" className="img-thumbnail border-0 my-auto" style={{ width: "20px", backgroundColor: "transparent" }} />
              </button>
              <button className="border-0 bg-transparent">
                <img onClick={() => handleImageClick(product.img)} src={product?.imgTable ? require(`../assets/images/${product.img}`) : null} className="img-thumbnail p-3" decoding="async" loading="eager" alt="alimento" style={{ maxWidth: "140px", maxHeight: "180px" }} />
              </button>

              <button className="border-0 bg-transparent">
                <img onClick={() => handleImageClick(product.imgTable)} src={product?.imgTable ? require(`../assets/images/${product.imgTable}`) : null} className="img-thumbnail p-3" decoding="async" loading="eager" alt="alimento" style={{ maxWidth: "140px", maxHeight: "180px" }} />
              </button>

              <button className="btn mt-auto w-100 p-0" style={{ width: "100%", height: "30px", backgroundColor: "#F8F6F4" }}>
                <img src={down} alt={image} decoding="async" loading="eager" className="img-thumbnail border-0 my-auto" style={{ width: "20px", backgroundColor: "transparent" }} />
              </button>
            </div>
          </div>

          <div className="col col-sm-12 col-md-5 col-lg-4 col-xl-4 border rounded-1 m-0 p-0 border border-1 d-flex align-items-center justify-content-center order-md-first" style={{ height: "470px" }}>
            <Zoom>
              <img src={image ? require(`../assets/images/${image}`) : null} alt={image} decoding="async" loading="eager" className="img-thumbnail border-0 my-auto" style={{ height: "455px" }} />
            </Zoom>
          </div>
        </div>
      </div>

      <div className="container my-3 p-1" style={{ width: "95%" }}>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button shadow-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                DESCRIPCION DEL PRODUCTO
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body" style={{ maxHeight: "99999px" }}>
                <p style={{ whiteSpace: "pre-line" }}>{product?.description?.replace(/\\n/g, "\n")}</p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed shadow-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                ESPECIFICACIONES
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
              <div className="accordion-body" style={{ maxHeight: "99999px" }}>
                <p style={{ whiteSpace: "pre-line" }}>{product?.description1?.replace(/\\n/g, "\n")}</p>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed shadow-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                INGREDIENTES
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">{product?.description2}</div>
            </div>
          </div>
        </div>

        <hr className="mx-auto"></hr>
      </div>
    </>
  );
}

export default Productt;
