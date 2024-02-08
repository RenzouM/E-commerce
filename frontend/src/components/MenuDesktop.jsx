import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/MenuDesktop.css";
import dogIcon from "../assets/images/dog-solid.svg";
import catIcon from "../assets/images/cat-solid.svg";
import barIcon from "../assets/images/bars-solid.svg";
import tagIcon from "../assets/images/tag-solid.svg";
import storeIcon from "../assets/images/store-solid.svg";
import atras from "../assets/images/arrow-bar-left.svg";

function Menu() {
  //Filtro menu
  const navigate = useNavigate();
  const handleFilter = (edad, raza, mascota, medicado, offer) => {
    navigate(`/shop/${edad}/${raza}/${mascota}/${medicado}/${offer}/1`);
    window.scrollTo(0, 0);
  };
  //Filtro menu

  return (
    <section className="text-center m-0 p-0 d-none d-lg-block border-1 border rounded-3 shadow-sm" style={{ width: "210px", height: "800px" }}>
      <Link to="http://192.168.0.182:3000/" className="d-flex justify-content-start text-secondary ms-2 p-2" style={{ textDecoration: "none" }}>
        <img src={atras} className="colorback me-1 my-auto" alt="atras" style={{ width: "20px", height: "20px" }} /> Volver al inicio
      </Link>
      <div className="left-menu m-auto" style={{ width: "90%" }}>
        <div className="m-0 p-0 d-flex" style={{ height: "50px" }}>
          <p className="rounded-1  fw-light fs-3 mx-auto text-start text-warning" style={{ backgroundColor: "transparent", color: "orange", width: "200px" }}>
            <img src={storeIcon} alt="shop" className="shopping-Cart mx-2 mb-2" style={{ width: "25px" }} />
            SHOP
          </p>
        </div>

        <div className="d-flex justify-content-center" style={{ width: "100%", borderTop: "1px", borderBottom: "0px", borderWidth: "1px", borderStyle: "dashed", borderColor: "#b8b8b8" }}></div>

        <ul className="list-group text-start p-0" style={{ marginTop: "20px" }}>
          <h5 className="p-0 text-secondary" style={{ color: "grey", width: "200px", margin: "0px 0px 1px 0px" }}>
            <img src={barIcon} alt="categorias" className="bar-descount-iconn mx-2 mb-1" style={{ width: "18px" }} />
            CATEGORIAS
          </h5>
          <li>
            <button className="list-group-item dropdown-toggle border-0 m-0  text-secondary text-start w-100" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
              ALIMENTOS
            </button>
          </li>
          <div className="row p-0 m-auto">
            <div className="col p-0">
              <div className="collapse multi-collapse mb-1 " id="multiCollapseExample1" style={{ width: "200px" }}>
                <button className="modal-line-desktop mt-1 m-0 border text-center rounded-top-2 dropdown-toggle" style={{ width: "90%" }} data-bs-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample2">
                  <img src={dogIcon} className="shopping-Cart mx-2" style={{ width: "20px" }} />
                  PERRO
                </button>

                <div className="collapse multi-collapse border  mt-0 p-0 rounded-bottom-2" id="multiCollapseExample2" style={{ width: "90%" }}>
                  <div className="dropend">
                    <button type="button" className="modal-line-desktop dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      CACHORRO
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("Cachorro", "Raza Pequeña", "Perro", "all", "all")}>
                          Raza Pequeña
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("Cachorro", "Me", "Perro", "all", "all")}>
                          Raza Mediana
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("Cachorro", "Gr", "Perro", "all", "all")}>
                          Raza Grande
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="dropend">
                    <button type="button" className="modal-line-desktop dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      ADULTO
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("Adulto", "Raza Pequeña", "Perro", "all", "all")}>
                          Raza Pequeña
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("Adulto", "Me", "Perro", "all", "all")}>
                          Raza Mediana
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("Adulto", "Gr", "Perro", "all", "all")}>
                          Raza Grande
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="dropend">
                    <button type="button" className="modal-line-desktop dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      ADULTO MAYOR
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("Adulto Mayor", "Raza Pequeña", "Perro", "all", "all")}>
                          Raza Pequeña
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("Adulto Mayor", "Me", "Perro", "all", "all")}>
                          Raza Mediana
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("Adulto Mayor", "Gr", "Perro", "all")}>
                          Raza Grande
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="dropend">
                    <button type="button" className="modal-line-desktop dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      ESPECIALES
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Perro", "Cardiaco", "all")}>
                          CARDÍACO
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Perro", "Dermico", "all")}>
                          DÉRMICO
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Perro", "Diabetico", "all")}>
                          DIABETICO
                        </button>
                      </li>

                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Perro", "Gastro", "all")}>
                          GASTROENTÉRICO
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Perro", "Obesidad", "all")}>
                          OBESIDAD
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Perro", "Renal", "all")}>
                          RENAL
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Perro", "Urinario", "all")}>
                          URINARIO
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="modal-line-desktop mt-1 m-0 border text-center rounded-top-2 dropdown-toggle" style={{ width: "90%" }} data-bs-toggle="collapse" href="#multiCollapseExample3" role="button" aria-expanded="false" aria-controls="multiCollapseExample3">
                  <img src={catIcon} className="shopping-Cart mx-2" style={{ width: "20px" }} />
                  GATO
                </div>

                <div className="collapse multi-collapse border rounded-bottom-2 mt-0 m-0 p-0 text-center" id="multiCollapseExample3" style={{ width: "90%" }}>
                  <button className="modal-line-desktop" type="button" onClick={() => handleFilter("Cachorro", "all", "Gato", "all", "all")} style={{ textDecoration: "none", color: "black", border: "none", background: "none" }}>
                    CACHORRO
                  </button>
                  <button className="modal-line-desktop" type="button" onClick={() => handleFilter("Adulto", "all", "Gato", "all", "all")} style={{ textDecoration: "none", color: "black", border: "none", background: "none" }}>
                    ADULTO
                  </button>
                  <button className="modal-line-desktop" type="button" onClick={() => handleFilter("Adulto Mayor", "all", "Gato", "all", "all")} style={{ textDecoration: "none", color: "black", border: "none", background: "none" }}>
                    ADULTO MAYOR
                  </button>
                  <div className="dropend">
                    <button type="button" className="modal-line-desktop dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      ESPECIALES
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Gato", "Cardiaco", "all")}>
                          CARDÍACO
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Gato", "Dermico", "all")}>
                          DÉRMICO
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Gato", "Diabetico", "all")}>
                          DIABETICO
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Gato", "Gastro", "all")}>
                          GASTROENTÉRICO
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Gato", "Obesidad", "all")}>
                          OBESIDAD
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Gato", "Renal", "all")}>
                          RENAL
                        </button>
                      </li>
                      <li>
                        <button className="buttonDesktopMenuDropDrop" onClick={() => handleFilter("all", "all", "Gato", "Urinario", "all")}>
                          URINARIO
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
        <ul className="list-group text-center p-0 text-center ">
          <li>
            <button onClick={() => handleFilter("Accesorios", "all", "all", "all", "all")} className="list-group-item border-0 text-start text-secondary w-100">
              ACCESORIOS
            </button>
          </li>
          <li>
            <button onClick={() => handleFilter("Juguetes", "all", "all", "all", "all")} className="list-group-item border-0 text-start text-secondary w-100">
              JUGUETES
            </button>
          </li>
          <li>
            <button onClick={() => handleFilter("Salud", "all", "all", "all", "all")} className="list-group-item border-0 text-start text-secondary w-100">
              HIGIENE Y SALUD
            </button>
          </li>
        </ul>
        <hr style={{ width: "100%", opacity: "5%" }}></hr>

        <ul className="list-group text-start p-0 m-0 text-center position-relative">
          <h5 className="m-0 p-0  text-start text-secondary" style={{ width: "200px" }}>
            <img src={tagIcon} alt="descuentos" className="bar-descount-iconn mx-2 mb-1" style={{ width: "20px" }} />
            DESCUENTOS
          </h5>
          <li>
            <button onClick={() => handleFilter("all", "all", "all", "all", "flash")} className="list-group-item border-0 text-start text-secondary w-100">
              FLASH SALES
            </button>
          </li>
          <li>
            <button onClick={() => handleFilter("all", "all", "all", "all", "descuento")} className="list-group-item border-0 text-start text-secondary w-100">
              OFERTAS DEL MES
            </button>
          </li>
          {/* <li>
          <button className="list-group-item rounded-1">COMBOS</button>
        </li> */}
        </ul>
      </div>
    </section>
  );
}

export default Menu;
