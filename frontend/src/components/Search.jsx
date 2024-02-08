import React from "react";
import { Link } from "react-router-dom";

function Search(props) {
  return (
    <Link to={`/product/${props.productKey}`} style={{ textDecoration: "none" }}>
      <div className="d-flex p-0 px-2 py-1 m-0 border border-1 rounded-1 bg-white">
        <div className="d-flex px-1">
          <img className="img-thumbnail" src={require(`../assets/images/${props.img}`)} style={{ width: "42px" }} />
        </div>
        <div className="searchbar d-grid p-0 m-0 px-1 text-black">
          <div className="d-flex p-0 m-0 me-auto">
            <h6 className="m-auto">{props.marca}</h6>
            <h6 className="ms-1 m-auto">{props.subMarca}</h6>
          </div>
          <div className="d-flex p-0 m-0 me-auto text-black">
            <p className="p-0 m-auto">{props.mascota}</p>
            <p className="col ms-1 m-auto">{props.edad}</p>
          </div>
          <div className="d-flex p-0 m-0 me-auto text-secondary">
            <p className="m-auto text-grey">{props.raza}</p>
            <p className="ms-1 m-auto">x{props.kg} kg</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Search;
