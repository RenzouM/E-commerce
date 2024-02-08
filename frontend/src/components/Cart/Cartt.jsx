import React from "react";
import { Link } from "react-router-dom";
import trashIcon from "../../assets/images/trash-can-regular.svg";

function Cartt(props) {
  const cantItems = (masomenos) => {
    props.cantItems(props.productKey, props.cant, masomenos);
  };

  const deleteItem = () => {
    props.deleteItem(props.productKey);
  };

  const handleProductClick = () => {
    window.location.href = `/product/${props.productKey}`;
  };

  const toPesos = (props) => {
    // Convierte el precio a un número
    const precioNum = parseFloat(props.precio.replace(/[^0-9.-]+/g, ""));

    // Verifica si el precio es un número válido
    if (isNaN(precioNum)) {
      return "Precio inválido";
    }

    // Calcula el precio total multiplicando por la cantidad
    const precioTotal = precioNum * props.cant;

    // Formatea el precio total como moneda en pesos argentinos sin decimales ni separador de miles
    const valorEnPesos = precioTotal.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return valorEnPesos;
  };

  return (
    <div className="row align-items-center my-1 m-auto">
      <div className="col-12 d-flex p-0 text-center border border-1 rounded-2 mt-1 align-items-top">
        <Link to="#" onClick={handleProductClick}>
          <img src={props.img} className="img-thumbnail m-2" loading="lazy" decoding="async" style={{ maxHeight: "135px", width: "78px" }} />
        </Link>
        <div className="col d-grid">
          <h5 className="p-0 m-auto"> {props.subMarca ? `${props.marca} - ${props.subMarca}` : props.marca}</h5>

          <h6 className="p-0 m-auto fw-normal">
            {props.mascota} {props.edad} {props.raza}
          </h6>
          <h6 className="p-0 m-auto">{props.kg} KG </h6>

          <div className="col d-grid">
            <div className="col-8 d-flex text-center m-auto p-0">
              <div className="input-group p-0 m-0">
                <button className="btn btn-outline-secondary rounded-start-3" onClick={() => cantItems("-")} style={{ width: "30%" }} type="button" id="inputGroupFileAddon04">
                  -
                </button>
                <input type="text" className="form-control mx-0 text-center" style={{ width: "40%" }} aria-label="" value={props.cant} readOnly />
                <button className="btn btn-outline-secondary rounded-end-3" onClick={() => cantItems("+")} style={{ width: "30%" }} type="button" id="inputGroupFileAddon04">
                  +
                </button>
              </div>
            </div>
            <h6 className="p-0 m-1 d-flex justify-content-center align-items-center">{toPesos(props)}</h6>
          </div>
        </div>

        <div className="d-flex p-0 m-0" style={{ height: "30px" }}>
          <button className="btn m-0 p-0 border-0" onClick={() => deleteItem()}>
            <img src={trashIcon} className="trash-icon me-3 mt-2" style={{ width: "20px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cartt;
