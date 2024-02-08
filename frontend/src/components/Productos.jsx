import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect, useContext } from "react";
import "../assets/styles/Productos.css";
import { AppContext } from "../context/CartContext";
const alimentos = require("../alimentos.json");

function Productos() {
  const { cart, setCart } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  console.log("asd", alimentos);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/backend/api");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  function nextPage() {
    if (page < cantPages - 1) {
      setPage(page + 1);
    }
  }

  function backPage() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  function Encargue({ item }) {
    let devuelve;

    if (item.stock === false) {
      devuelve = (
        <div className="botonescompra mb-2 d-flex gap-2 d-flex justify-content-center px-1">
          <div className="row align-items-center">
            <div className="col-5 p-0 m-auto pe-1">
              <button
                type="button"
                style={{ fontSize: "18px", width: "100%", height: "45px" }}
                className="btn btn-lg btn-block btn-outline-dark py-auto rounded-1 my-auto p-0"
                disabled>
                <div
                  className="m-auto d-flex justify-content-center"
                  style={{ width: "90%" }}>
                  SIN STOCK
                </div>
              </button>
            </div>
            <div className="col-7 p-0 m-auto pe-1">
              <button
                type="button"
                style={{ fontSize: "19px", width: "100%", height: "45px" }}
                className="btn btn-lg btn-block btn-outline-warning rounded-1 my-auto p-0 d-flex">
                <div
                  className="m-auto d-flex justify-content-center"
                  style={{ width: "90%" }}>
                  <i
                    className="fa-brands fa-whatsapp fa-lg pe-1 my-auto"
                    style={{ color: "#00bd2f" }}></i>
                  <p className="my-auto">ENCARGAR</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      devuelve = (
        <div className="botonescompra mb-2 d-flex gap-2 d-flex justify-content-center px-1">
          <div className="row align-items-center">
            <div className="col p-0">
              <button
                type="button"
                onClick={() => addToCart(item)}
                style={{ fontSize: "19px", width: "100%", height: "45px" }}
                className="btn btn-lg btn-block btn-outline-warning rounded-1 my-auto p-0">
                <div
                  className="m-auto d-flex justify-content-center"
                  style={{ width: "90%" }}>
                  <p className="my-auto">
                    <i
                      className="fa-solid fa-cart-shopping fa-md pe-1 my-auto me-1"
                      style={{ color: "#ffa500" }}></i>
                    AGREGAR
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return devuelve;
  }

  const filteredData = data.filter(item => item.oferta === true);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ maxWidth: 1023 });
  const isNetbook = useMediaQuery({ maxWidth: 1366 });
  let cantItems = filteredData.length;

  let cantItemsPage = 1;

  if (isMobile) {
    cantItemsPage = 1;
  } else if (isTablet) {
    cantItemsPage = 2;
  } else if (isNetbook) {
    cantItemsPage = 4;
  } else {
    cantItemsPage = 4;
  }

  let cantPages = Math.ceil(cantItems / cantItemsPage);

  const addToCart = id => {
    const existingItem = cart.find(item => item.productKey === id._id);

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);

    if (!existingItem) {
      if (cart.length === 0) {
        const newItem = {
          key: id._id,
          productKey: id._id,
          subMarca: id.subMarca,
          mascota: id.mascota,
          raza: id.raza,
          edad: id.edad,
          kg: id.kg,
          precio: id.precio,
          img: id.img,
          cant: 1,
        };
        setCart([newItem]);
      } else {
        const newItem = {
          key: id._id,
          productKey: id._id,
          subMarca: id.subMarca,
          mascota: id.mascota,
          raza: id.raza,
          edad: id.edad,
          kg: id.kg,
          precio: id.precio,
          img: id.img,
          cant: 1,
        };
        setCart(prevItems => [...prevItems, newItem]);
      }
    }
  };

  return (
    <div
      className="container m-auto p-0"
      style={{ width: "90%" }}>
      <div
        id="carouselExample"
        className="carousel slide">
        <div className="carousel-inner m-0">
          <div className="carousel-item active d-flex p-0 justify-content-evenly">
            <div className="row align-items-center">
              {filteredData
                .slice(
                  page * cantItemsPage,
                  page * cantItemsPage + cantItemsPage
                )
                .map(dataa => (
                  <div
                    className="col col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 px-2 mx-auto"
                    key={dataa._id}>
                    <div className="card text-center mt-2">
                      <div className="card-header">
                        <h3>{dataa.subMarca}</h3>
                        <h6>
                          {" "}
                          {dataa.mascota} {dataa.edad} {dataa.raza}
                        </h6>
                      </div>
                      <div className="card-body p-0">
                        <div
                          className="tarjeta-agregado-exito w-100"
                          style={{
                            position: "absolute",
                            right: "0px",
                            top: "0px",
                          }}>
                          <div
                            className="tarjeta-agregado-exito w-100"
                            style={{
                              position: "absolute",
                              right: "0px",
                              top: "0px",
                            }}>
                            {showAlert && (
                              <div
                                className="alert alert-light border  w-100 m-auto"
                                role="alert"
                                style={{ height: "480px", marginTop: "0px" }}>
                                <h4 style={{ marginTop: "230px" }}>
                                  ¡Agregado al carrito!
                                </h4>
                                <i
                                  className="fa-solid fa-2xl fa-check"
                                  style={{ color: "#8ce222" }}></i>
                              </div>
                            )}
                          </div>
                        </div>
                        <img
                          className="logotipo ms-0"
                          loading="lazy"
                          decoding="async"
                          src={`../../../../../assets/images/${dataa.logo}`}
                          style={{
                            width: "100px",
                            position: "absolute",
                            left: "0px",
                          }}
                        />

                        <Link to={`/product/${dataa._id}`}>
                          <img
                            className="imagen mt-4"
                            loading="lazy"
                            decoding="async"
                            style={{ width: "170px" }}
                            src={`../../../../../assets/images/${dataa.img}`}
                          />
                        </Link>
                        <h2 className="price">$ {dataa.precio}</h2>
                        <h5>{dataa.kg}</h5>
                        <Encargue item={dataa} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev m-auto"
          onClick={backPage}
          style={{ width: "45px", backgroundColor: "#73777B", height: "100px" }}
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev">
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next m-auto"
          onClick={nextPage}
          style={{ width: "45px", backgroundColor: "#73777B", height: "100px" }}
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next">
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Productos;
