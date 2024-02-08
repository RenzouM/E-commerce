import React from "react";
import "../assets/styles/Encargue.css";
import click from "../assets/images/hand-point-up-regular.svg";
import whatsappIcon from "../assets/images/whatsapp.svg";

export default function Encargue() {
  return (
    <section className="d-flex justify-content-center">
      <div className="row">
        <div className="col-xs-12 col-md-6 p-2">
          <div className="d-grid rounded-4 rounded-bottom-0 p-2 shadow-sm bg-warning text-center">
            <h2 className="encargue fw-normal">¿BUSCAS UN ALIMENTO</h2>
            <h2 className="encargue fw-normal">ESPECIFICO?</h2>
          </div>

          <div className="d-grid rounded-4 py-3 border-top-0 rounded-top-0 align-items-center shadow " style={{ height: "150px" }}>
            <h2 className="encarguee text-center">¡CONSULTANOS!</h2>
            <a href="https://wa.me/5492478407219?text=Hola, quisiera saber si tenes el alimento" className="text-center" target="_blank">
              <button className="btn btn-outline-warning encargueee position-relative" style={{ height: "auto", fontSize: "18px", backgroundColor: "transparent" }}>
                {" "}
                <img src={whatsappIcon} alt="whatsapp" className="whatsappIcon m-2" style={{ width: "30px" }} />
                Whatsapp
                <img className="clickk" src={click} alt="click-whatsapp" style={{ width: "45px", height: "45px", position: "absolute", left: "85%", top: "30px" }} />
              </button>
            </a>
          </div>
        </div>

        <div className="col-xs-12 col-md-6 p-2">
          <div className="d-grid rounded-4 rounded-bottom-0 p-2 shadow-sm bg-warning text-center">
            <h2 className="encargue fw-normal">¿CUAL ES EL COSTO DE</h2>
            <h2 className="encargue fw-normal">ENVÍO?</h2>
          </div>

          <div className="d-grid rounded-4 py-2 border-top-0 rounded-top-0 align-items-center shadow" style={{ height: "150px" }}>
            <h2 className="encarguee text-center">¡GRATIS!</h2>
            <h3 className="encarguee text-center">
              En compras mayores a <br></br>$ 3.000
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
