import React, { useEffect } from "react";
import "../../assets/styles/Footer.css";
import data from "../../assets/images/datafiscal.webp";
import MostrarCorreoButton from "../MostrarCorreoButton";
import { Toaster, toast } from "sonner";

function Footer() {
  const year = new Date().getFullYear();

  const suscribed = () => {
    toast.success("¡Te has suscribido exitosamente!");
  };

  // Función para enviar el formulario y mostrar el modal en caso de éxito
  function enviarFormulario(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    const email = document.getElementById("newsletter1").value;

    try {
      fetch("/backend/suscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => response.json())
        .then((dataa) => {
          console.log(dataa);

          if (dataa.success) {
            // La suscripción se realizó con éxito, muestra el modal
            suscribed();
            document.getElementById("newsletter1").value = "";
          } else {
            // La suscripción no se realizó con éxito, muestra un mensaje de error
            alert("Error al suscribirse. Inténtalo de nuevo más tarde.");
          }
        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
          alert("Error al enviar el formulario. Inténtalo de nuevo más tarde.");
        });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error al enviar el formulario. Inténtalo de nuevo más tarde.");
    }
  }

  return (
    <div className="container m-auto p-0 pt-5" style={{ height: "auto" }}>
      <footer className="mx-auto p-0 w-100">
        <div className="row mx-auto p-0">
          <div className="col-6 col-md-2 mb-3">
            <h5>Nuestras redes</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href={`https://wa.me/${+5492478407219}?text=${encodeURIComponent("Hola!")}`} target="_blank" className="nav-link p-0 text-body-secondary">
                  Whatsapp
                </a>
              </li>

              <li className="nav-item mb-2">
                <a href="https://www.instagram.com/peludos.arrecifes/?hl=es" target="_blank" className="nav-link p-0 text-body-secondary">
                  Instagram
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="https://www.facebook.com/PeludosPetShopArrecifess/" target="_blank" className="nav-link p-0 text-body-secondary">
                  Facebook
                </a>
              </li>
              <li className="nav-item mb-2">
                <MostrarCorreoButton />
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Medios de pago</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <div className="nav-link p-0 text-body-secondary">Efectivo</div>
              </li>
              <li className="nav-item mb-2">
                <div className="nav-link p-0 text-body-secondary">Tarjeta</div>
              </li>
              <li className="nav-item mb-2">
                <div className="nav-link p-0 text-body-secondary">Transferencia</div>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>FAQs</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <button type="button" className="btn bg-transparent border-0 p-0 m-0 text-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Envíos
                </button>
              </li>
              <li className="nav-item mb-2">
                <button type="button" className="btn bg-transparent border-0 p-0 m-0 text-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                  Devoluciones
                </button>
              </li>

              <li>
                <img src={data} alt="qr-code" style={{ width: "40px", height: "55px", position: "relative", paddingBot: "10px" }}></img>
              </li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3 order-xs-1">
            <form id="subscribeForm" onSubmit={enviarFormulario}>
              <p className="fs-4">Subscribite a nuestro newsletter</p>
              <p>Recibe semanalmente nuestras promociones y más.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2 ">
                <label htmlFor="newsletter1" className="visually-hidden">
                  Email address
                </label>
                <input id="newsletter1" type="email" name="email" className="form-control" placeholder="Correo electronico" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" />
                <button className="btn btn-primary" type="submit">
                  Suscribirme
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p style={{ marginLeft: "11px" }}>© {year} Peludos PetShop. Todos los derechos reservados.</p>
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ zIndex: "999990" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Política de Envíos:
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Gracias por confiar en nuestro servicio de envíos. A continuación, te presentamos nuestra política para garantizar una experiencia de compra satisfactoria:
                <br></br>
                <br></br>
                1-Envíos y Entregas:<br></br>
                Realizamos envíos únicamente dentro de la ciudad de Arrecifes, asegurando que tu pedido llegue de forma rápida y segura a tu domicilio. Nuestro objetivo es agilizar el proceso de entrega para que puedas disfrutar de tus productos lo antes posible.<br></br>
                <br></br>
                2-Excepciones:<br></br>
                Por el momento, solo realizamos envíos dentro de la ciudad de Arrecifes. Lamentamos no poder ofrecer envíos fuera de esta área, pero trabajamos constantemente para expandir nuestras opciones de entrega en el futuro.
                <br></br>
                <br></br>
                Agradecemos tu comprensión y apoyo a nuestra política de envíos. Nuestro objetivo es ofrecerte la mejor experiencia de compra posible y asegurarnos de que tus productos lleguen en perfectas condiciones. Si tienes alguna duda adicional, no dudes en contactarnos. ¡Gracias por
                elegirnos!
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ zIndex: "999990" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Política de Devoluciones:
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Gracias por confiar en nuestro servicio de envíos. A continuación, te presentamos nuestra política para garantizar una experiencia de compra satisfactoria:
                <br></br>
                <br></br>
                1-Devoluciones:<br></br>
                Aceptamos devoluciones exclusivamente en el caso de que tu pedido llegue con daños en la bolsa o el paquete. Si al recibir tu compra notas que la bolsa está rota, te pedimos que nos contactes inmediatamente para gestionar la devolución y el reemplazo del producto afectado.<br></br>
                <br></br>
                2-Condiciones de Devolución:<br></br>
                Para procesar una devolución, es importante que nos informes sobre el estado de la bolsa y el producto dentro de las 24 horas posteriores a la entrega. Nuestro equipo de atención al cliente te guiará en el proceso y coordinará la recolección del artículo dañado.
                <br></br>
                <br></br>
                3-Atención al Cliente:<br></br>
                Estamos comprometidos a brindarte un excelente servicio y atención. Si tienes alguna pregunta o necesitas asistencia, no dudes en comunicarte con nuestro equipo de atención al cliente. Estaremos encantados de ayudarte en cualquier consulta relacionada con tus envíos.
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Toaster className="text-center" richColors />
    </div>
  );
}

export default Footer;
