import React from "react";
import "../assets/styles/SectionWhite.css";
import cartIcon from "../assets/images/cart-shopping-solid.svg";
import truckIcon from "../assets/images/truck-fast-solid.svg";
import cardIcon from "../assets/images/credit-card-regular.svg";

function WhiteSection() {
  return (
    <section className="container-fluid p-0 pt-3 d-flex mx-auto" style={{ width: "90%" }}>
      <div className="row m-auto align-items-top " style={{ maxHeight: "99999px", width: "90%" }}>
        <div className="col-xs-12 col-md-4 p-0 m-0">
          <div className="w-100 p-0 m-0 d-flex align-items-top">
            <img src={cartIcon} decoding="async" loading="lazy" alt="cart" className="section-white-icons mb-auto ms-3 me-4 mt-1" style={{ width: "45px", height: "45px" }} />
            <div className="text-secondary">
              <p className=" fs-3">Agregá al carrito.</p>
              <p>Selecciona el articulo y agregalo al carrito.</p>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-md-4 p-0 m-0">
          <div className="w-100 p-0 m-0 d-flex align-items-top">
            <img src={cardIcon} decoding="async" loading="lazy" alt="compra" className="section-white-icons mb-auto ms-3 me-4 mt-1" style={{ width: "45px", height: "45px" }} />
            <div className="text-secondary">
              <p className=" fs-3">Realizá la compra</p>
              <p>Selecciona el tipo de entrega y realizá el pago.</p>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-md-4 p-0 m-0">
          <div className="w-100 p-0 m-0 d-flex align-items-top">
            <img src={truckIcon} alt="envio" decoding="async" loading="lazy" className="section-white-icons mb-auto ms-3 me-4 mt-1" style={{ width: "45px", height: "45px" }} />
            <div className="text-secondary">
              <p className=" fs-3">¡Te lo llevamos!</p>
              <p>¡Listo, tu pedido ya esta en camino!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhiteSection;
