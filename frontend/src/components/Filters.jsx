import React, { useState, useEffect } from "react";
import "../assets/styles/Filtro.css";
import MyComponent from "../components/SliderVolume";

function Filtro({ sendMinPrice, sendMaxPrice, orderPricee, onStockk }) {
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(25000);

  const updateParentMin = (updateMin) => {
    setPrecioMin(updateMin);
  };

  const updateParentMax = (updateMax) => {
    setPrecioMax(updateMax);
  };

  useEffect(() => {
    sendMinPrice(precioMin);
    sendMaxPrice(precioMax);
  }, [precioMin, precioMax]);

  const orderPrice = (event) => {
    orderPricee(event);
  };
  const onStock = (event) => {
    onStockk(event);
  };

  return (
    <section className="container-fluid p-0 m-0 shadow-sm rounded-top-2 position-relative" style={{ backgroundColor: "#ffa500", height: "55px" }}>
      <div className="envios container-fluid bg-warning  text-center rounded-top-2" style={{ height: "18px" }}>
        <p style={{ fontSize: "10px", fontWeight: "100", color: "white", letterSpacing: "0px" }}>
          <strong>ENVÍO GRATIS EN COMPRAS ONLINE, SOLO EN ARRECIFES.</strong>
        </p>
      </div>
      <div className="container p-0 bg-transparent">
        <div className="filtro">
          <div className="dropp dropdown">
            <button className="filter dropdown-toggle text-white bg-transparent" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Filtrar
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-end">
              <MyComponent updateParentMin={updateParentMin} updateParentMax={updateParentMax} />
            </ul>
          </div>

          <div className="dropp dropdown">
            <button className="order dropdown-toggle text-white p-0  bg-transparent" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Ordenar
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-end p-0 mt-1">
              <li>
                <button onClick={() => onStock(true)} className="dropdown-item hooover" href="#">
                  En stock
                </button>
              </li>
              <li>
                <button onClick={() => onStock(false)} className="dropdown-item hooover" href="#">
                  Sin stock
                </button>
              </li>
              <li>
                <button onClick={() => orderPrice(1)} className="dropdown-item hooover" href="#">
                  De: Menor a mayor
                </button>
              </li>
              <li>
                <button onClick={() => orderPrice(2)} className="dropdown-item hooover" href="#">
                  De: Mayor a menor
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Filtro;
