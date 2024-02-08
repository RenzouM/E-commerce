import { React, useState } from "react";
import truckIcon from "../assets/images/truck-fast-solid.svg";

function Shipping() {
  const [zipCode, setZipCode] = useState("");

  const fetchDataa = (zipCode) => {
    if (zipCode === "2740") {
      return <h4>El costo de envio es GRATIS en Arrecifes</h4>;
    } else {
      return <h4>Por el momento solo estamos realizando envios en la localidad de Arrecifes.</h4>;
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("/backend/calculate-shipping", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ param1 }),
  //     });

  //     const data = await response.json();
  //     setShippingCost(data.shippingCost);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="container border border-1 rounded-2 p-0 d-grid shadow-sm">
      <div className="border-0 rounded-top-2 my-auto w-100" style={{ backgroundColor: "orange" }}>
        <p className="m-1 text-light" style={{ maxHeight: "99999px", fontSize: "20px" }}>
          CALCULÁ EL COSTO DE ENVIO
        </p>
      </div>

      <div className="div d-flex justify-content-center py-3 p-0">
        <div className="row align-items-center ">
          <div className="col text-center p-0">
            <div className="d-flex justify-content-center m-auto text-center" style={{ width: "80%" }}>
              <input
                type="text"
                className="form-control m-auto"
                placeholder="Tu código postal:"
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ height: "45px" }}
                value={zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}></input>
            </div>
          </div>

          <div className="col text-center p-0">
            <button className="btn btn-outline-warning rounded-2" style={{ width: "80%", fontSize: "20px" }} data-bs-toggle="modal" data-bs-target="#exampleModal0012">
              CALCULAR
            </button>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal0012" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ zIndex: "99999999" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <img src={truckIcon} className="section-white-icons mb-auto ms-3 me-4 mt-1" />
                ¡Envios gratis en Arrecifes!
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">Por el momento solo estamos realizando envíos en la localidad de Arrecifes.</div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
