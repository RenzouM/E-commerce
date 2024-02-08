import { Carousel } from "react-bootstrap";
import blackdog from "../assets/images/blackdog.webp";
import catt from "../assets/images/cat-2.webp";
import cat from "../assets/images/cat.webp";
import pasto from "../assets/images/pasto.webp";
import "../assets/styles/AltCarrousell.css";
import modo from "../assets/images/modo.webp";
import dni from "../assets/images/cuenta-dni.webp";

function AltCarrousel() {
  return (
    <Carousel interval={700000}>
      <Carousel.Item>
        <div className="carrousell-container position-relative">
          <div className="row align-items-top p-0 m-0 text-center position-relative">
            <p className="slogan">LA DIFERENCIA</p>
            <p
              className="slogan-2"
              style={{
                marginTop: "-20px",
                color: "orange",
                wordSpacing: "5px",
                letterSpacing: "4px",
                zIndex: "-1",
              }}>
              ES PARA TU MASCOTA
            </p>
            <div
              className="d-flex w-100 justify-content-center"
              style={{ height: "25px" }}>
              <hr
                className="mb-auto"
                style={{
                  width: "22%",
                  color: "orange",
                  marginTop: "-5px",
                }}></hr>
            </div>
            <p className="slogan-3">
              Brindale felicidad y bienestar<br></br>a tu mejor amigo
            </p>
          </div>
          <div
            className="row p-0 m-0 position-absolute"
            style={{ bottom: "0px", width: "100%", height: "100%" }}>
            <div className="col-6 p-0 m-0 mt-auto d-flex position-relative">
              <img
                decoding="async"
                loading="lazy"
                src={blackdog}
                className="leftimg"
                alt="dog"
              />
            </div>
            <div className="col-6 p-0 m-0 mt-auto d-flex justify-content-end position-relative">
              <img
                decoding="async"
                loading="lazy"
                src={cat}
                className="rightimg "
                alt="cat"
              />
            </div>
          </div>
          <div className="d-flex w-100 p-0 m-0 position-absolute bottom-0">
            <img
              decoding="async"
              loading="lazy"
              src={pasto}
              alt="pasto"
              style={{
                width: "870px",
                position: "absolute",
                zIndex: "-100",
                left: "0px",
                bottom: "-25px",
              }}
            />
            <img
              decoding="async"
              loading="lazy"
              src={pasto}
              alt="pasto"
              style={{
                width: "870px",
                position: "absolute",
                zIndex: "-100",
                right: "500px",
                bottom: "-25px",
              }}
            />
            <img
              decoding="async"
              loading="lazy"
              src={pasto}
              alt="pasto"
              style={{
                width: "870px",
                position: "absolute",
                zIndex: "-100",
                right: "0px",
                bottom: "-25px",
              }}
            />
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carrousell-container">
          <div className="col d-flex justify-content-evenly">
            <div
              className="d-grid justify-content-center p-0 m-0 rounded-bottom-3 shadow"
              style={{
                height: "300px",
                width: "44%",
                maxWidth: "250px",
                minWidth: "150px",
              }}>
              <img
                decoding="async"
                loading="eager"
                src={dni}
                className="mt-2"
                alt="cuenta-dni"
                style={{ width: "80%", margin: "auto" }}
              />
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
            <div
              className="d-grid justify-content-center p-0 m-0  rounded-bottom-3 shadow"
              style={{
                height: "300px",
                width: "44%",
                maxWidth: "250px",
                minWidth: "150px",
              }}>
              <img
                decoding="async"
                loading="eager"
                src={modo}
                className="mt-2"
                alt="modo"
                style={{ width: "80%", margin: "auto" }}
              />
              <div className="p-0 m-0 mt-3 text-center mx-2">
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
          <div className="d-flex position-relative justify-content-center w-100 mt-2">
            <p className="text-secondary z-3">
              <em>¡Solo en nuestra tienda fisica!</em>
            </p>
          </div>
        </div>

        <div className="d-flex w-100 justify-content-center">
          <img
            decoding="async"
            loading="eager"
            src={catt}
            className="position-absolute"
            alt="cat-2"
            style={{
              width: "100%",
              bottom: "-20px",
              maxWidth: "900px",
              minWidth: "450px",
              zIndex: "-10",
            }}
          />
        </div>
        <div className="d-flex w-100 p-0 m-0 position-absolute bottom-0">
          <img
            src={pasto}
            alt="pasto"
            style={{
              width: "870px",
              position: "absolute",
              zIndex: "100",
              left: "0px",
              bottom: "-145px",
            }}
          />
          <img
            src={pasto}
            alt="pasto"
            style={{
              width: "870px",
              position: "absolute",
              zIndex: "100",
              right: "170px",
              bottom: "-145px",
            }}
          />
          <img
            src={pasto}
            alt="pasto"
            style={{
              width: "870px",
              position: "absolute",
              zIndex: "100",
              right: "0px",
              bottom: "-145px",
            }}
          />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default AltCarrousel;
