import React, { useRef, useState } from "react";
import catt from "../assets/images/catt.webp";
import dogg from "../assets/images/dogg.webp";
import plato from "../assets/images/plato.webp";

import "../assets/styles/CatFood.css";
import { Link } from "react-router-dom";

function CatFood() {
  const [fadeIn, setFadeIn] = useState(false);
  const catRef = useRef(null);
  const platoRef = useRef(null);

  return (
    <div className="container-fluid d-flex p-0 m-0 my-1" style={{ overflow: "hidden", height: "auto" }}>
      <div className="row p-0 m-0">
        <div className="col-xs-12 col-lg-6 p-0 m-0 d-flex position-relative border border-1 border-warning rounded-1 justify-content-between" style={{ overflow: "hidden", height: "401px" }}>
          <div className="col-6 p-0 d-flex position-relative">
            <img decoding="async" loading="lazy" alt="bowl" className={`left-bowl  ${fadeIn ? "fade-in" : ""}`} src={plato} ref={platoRef} />
          </div>
          <div className="col p-0 position-relative">
            <img className="cat" decoding="async" alt="cat" loading="lazy" src={catt} ref={catRef} />
          </div>
          <div className="link-gatos">
            <Link to="/shop/all/all/Gato/all/all/1" className="linkk-cat">
              <p className="fs-5 mt-1">G</p>
              <p className="fs-5">A</p>
              <p className="fs-5">T</p>
              <p className="fs-5">O</p>
              <p className="fs-5 mb-1">S</p>
            </Link>
          </div>
        </div>

        <div className="col-xs-12 col-lg-6 p-0 m-0 d-flex position-relative border border-1 border-warning rounded-1 justify-content-between" style={{ overflow: "hidden", height: "401px" }}>
          <div className="row p-0 m-0">
            <div className="col p-0 position-relative" style={{ height: "auto" }}>
              <img className="dog" src={dogg} alt="dog" ref={catRef} />
            </div>
            <div className="col-6 p-0 d-flex position-relative">
              <img className={`right-bowl ${fadeIn ? "fade-in" : ""}`} alt="bowl" src={plato} ref={platoRef} />
            </div>
            <div className="link-perros">
              <Link to="/shop/all/all/Perro/all/all/1" className="linkk-dog">
                <p className="fs-6 mt-1">P</p>
                <p className="fs-6">E</p>
                <p className="fs-6">R</p>
                <p className="fs-6">R</p>
                <p className="fs-6">O</p>
                <p className="fs-6 p-0 mb-1">S</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatFood;
