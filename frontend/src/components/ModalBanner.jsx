import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import modo from "../assets/images/modo.webp";
import dni from "../assets/images/cuenta-dni.webp";

function ModalBanner() {
  const [show, setShow] = useState(Math.random() <= 0.27);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={show} className="p-0 m-0" backdrop="static" keyboard={false} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="w-100">
          <h3 className="text-center">¡Bienvenido a nuestra tienda!</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: "380px" }}>
        <p className="text-center">¡Aprovechá tambien los siguientes descuentos en nuestra tienda física!</p>
        <div className="col d-flex justify-content-between">
          <div className="d-grid justify-content-center p-0 m-0 rounded-3 shadow" style={{ height: "auto", width: "48%", maxWidth: "250px", minWidth: "100px" }}>
            <img decoding="async" loading="lazy" src={dni} className="mt-2" alt="cuenta-dni" style={{ width: "85%", margin: "auto" }} />
            <div className="p-0 m-0 text-center mt-2 mx-2">
              <p className="text-secondary text-center">
                <strong>PAGÁ CON DNI:</strong>
              </p>
              <dl>
                <em>
                  Miércoles y Jueves<br></br> de Octubre.
                </em>
                <dt>Decuento:</dt>
                <dd>30%</dd>
                <dt>Tope de reintegro:</dt>
                <dd>$ 2.500</dd>
              </dl>
            </div>
          </div>
          <div className="d-grid justify-content-center p-0 m-0  rounded-3 shadow" style={{ height: "auto", width: "48%", maxWidth: "250px", minWidth: "100px" }}>
            <img decoding="async" loading="lazy" src={modo} className="mt-2" alt="modo" style={{ width: "85%", margin: "auto" }} />
            <div className="p-0 m-0 mt-2 text-center mx-2">
              <p className="text-secondary text-center">
                <strong>PAGÁ CON MODO:</strong>
              </p>
              <dl>
                <em>
                  Lunes a Viernes<br></br> de Octubre.
                </em>
                <dt>Decuento:</dt>
                <dd>20%</dd>
                <dt>Tope de reintegro:</dt>
                <dd>$ 500</dd>
              </dl>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalBanner;
