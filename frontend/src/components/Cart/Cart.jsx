import { React, useState, useContext, useEffect, lazy, Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import "../../assets/styles/Cart.css";
import { AppContext } from "../../context/CartContext";
import Payment from "../../services/Payment";
import cartIcon from "../../assets/images/cart-shopping-solid.svg";
import register from "../../assets/images/register.webp";
import arrecifess from "../../assets/images/arrecifes.webp";
import { Toaster, toast } from "sonner";
const Cartt = lazy(() => import("../Cart/Cartt"));

function Cart() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { cart, setCart } = useContext(AppContext);
  const [buttonBuy, setButtonBuy] = useState(0);
  const [validateBuy, setValidateBuy] = useState(0);
  const [arrecifes, setArrecifes] = useState(false);

  const toPesos = (props) => {
    // Convierte el precio a un número
    const precioNum = parseFloat(props);

    // Verifica si el precio es un número válido
    if (isNaN(precioNum)) {
      return "Precio inválido";
    }

    // Formatea el precio como moneda en pesos argentinos sin decimales ni separador de miles
    const valorEnPesos = precioNum.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return valorEnPesos;
  };

  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = item.precio * item.cant;
    return total + itemPrice;
  }, 0);

  const cleanCart = () => {
    setCart([]);
  };

  const deleteItem = (productKey) => {
    const newCart = cart.filter((item) => item.key !== productKey);
    setCart(newCart);
  };

  const cantItems = async (productKey, cant, masomenos) => {
    const updatedCart = await Promise.all(
      cart.map(async (item) => {
        if (item.key === productKey) {
          if (masomenos === "-" && cant > 1) {
            return { ...item, cant: cant - 1 };
          } else if (masomenos === "+") {
            const jsonData = await fetchMax(productKey);
            if (jsonData > cant) {
              return { ...item, cant: cant + 1 };
            } else {
              toast.error("¡No tenemos suficientes unidades en stock!");
            }
          }
        }
        return item;
      })
    );

    setCart(updatedCart);
  };

  const fetchMax = async (productKey) => {
    const url = `/backend/maxStock/${productKey}`;
    console.log("URL de la solicitud:", url); // Agrega esta línea para verificar la URL
    try {
      const maxStock = await fetch(url);
      const jsonData = await maxStock.json();
      return jsonData;
    } catch (error) {
      console.error("Error al obtener el stock máximo:", error);
      return 0; // Puedes manejar el error según tus necesidades
    }
  };

  useEffect(() => {
    setButtonn();
    fetchDataFacturacion();
  }, []);

  const setButtonn = async () => {
    try {
      const response = await fetch("/backend/registered");
      const jsonData = await response.json();
      if (jsonData === true) {
        setValidateBuy(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const backCart = () => {
    if (buttonBuy === 1) {
      setButtonBuy(0);
    }
  };

  const setButton = () => {
    if (validateBuy === 1 && arrecifes === true) {
      setButtonBuy(1);
    }
  };

  const validateCupon = () => {
    toast.error("¡El cupón ingresado es invalido! Intentelo nuevamente.");
  };

  async function fetchDataFacturacion() {
    try {
      const response = await fetch("/backend/datosfacturacion");

      if (response.status === 401) {
        return;
      }

      if (response.ok) {
        const datosFacturacion = await response.json();
        if (datosFacturacion && datosFacturacion.codigo === "2740") {
          setArrecifes(true);
        }
      } else {
        // Si la respuesta no es 401 ni está bien (por ejemplo, 404), puedes manejarlo según sea necesario.
        console.error("Ocurrió un error al obtener datos de facturación:", response.statusText);
        // Puedes mostrar el mensaje de error en la interfaz de usuario si es necesario.
      }
    } catch (error) {
      // Manejo de otros errores
      console.error("Ocurrió un error al obtener datos de facturación:", error);
      // Puedes mostrar el mensaje de error en la interfaz de usuario si es necesario.
    }
  }

  return (
    <div className={`offcanvas offcanvas-end ${isMobile ? "mobile-style" : "desktop-style"}`} data-bs-scroll="false" tabIndex="-1" id="offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" style={{ zIndex: "10000" }}>
      <div className="offcanvas-header cart">
        <h6 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
          CARRITO DE COMPRAS
        </h6>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={backCart}></button>
      </div>
      <div className="offcanvas-body mt-0 py-2 px-2">
        {cart?.length !== 0 && buttonBuy === 0 ? (
          <button className="rounded-2 text-white border-warning p-0 m-0 d-flex justify-content-center  mb-2 w-100" onClick={cleanCart} style={{ backgroundColor: "orange", color: "white", height: "30px" }}>
            <p className="m-auto">VACIAR EL CARRITO</p>
          </button>
        ) : null}
        {cart?.length === 0 ? (
          <>
            <div className="d-flex m-auto mt-5" style={{ height: "200px" }}>
              <img src={cartIcon} className="cart-cart" style={{ width: "200px", margin: "auto", opacity: "80%" }} />
            </div>
            <p className="text-center mb-4 mt-2">¡Tu carrito esta vacio!</p>
            <hr className="d-flex w-75 m-auto"></hr>
          </>
        ) : (
          <>
            {buttonBuy === 0 ? (
              <>
                {cart?.map((cartItem) => (
                  <Suspense fallback={<div>Loading...</div>} key={cartItem.key}>
                    <Cartt
                      key={cartItem.key}
                      productKey={cartItem.key}
                      marca={cartItem.marca}
                      subMarca={cartItem.subMarca}
                      mascota={cartItem.mascota}
                      edad={cartItem.edad}
                      raza={cartItem.raza}
                      kg={cartItem.kg}
                      precio={cartItem.precio}
                      img={require(`../../assets/images/${cartItem.img}`)}
                      deleteItem={deleteItem}
                      cant={cartItem.cant}
                      cantItems={cantItems}
                    />
                  </Suspense>
                ))}
                <hr></hr>
                <section className="total p-3 border border-warning rounded-2">
                  <div className="d-flex justify-content-evenly align-items-center">
                    <h5 className="my-auto" style={{ width: "30%" }}>
                      Cupón de descuento:
                    </h5>
                    <input className="border-warning rounded-2 border-1" placeholder="#PETSHOP1" style={{ width: "30%" }}></input>{" "}
                    <button className="botoncupon rounded-2 text-white border-warning shadow-sm" onClick={validateCupon} style={{ width: "30%", backgroundColor: "orange" }}>
                      APLICAR
                    </button>
                  </div>
                  <Toaster className="text-center" richColors />
                </section>

                <div className="d-flex justify-content-between align-items-center p-2" style={{ fontSize: "24px" }}>
                  <p className="text-start my-auto">Total:</p>
                  <p className="my-auto">{toPesos(totalPrice)}</p>
                </div>
                <div className="d-flex w-100 p-0 m-0">
                  <button
                    type="button"
                    className="rounded-2 text-white border-warning  m-auto w-100 shadow-sm"
                    onClick={setButton}
                    data-bs-toggle={arrecifes === true && validateBuy === 1 ? null : "modal"}
                    data-bs-target={arrecifes !== true && validateBuy === 1 ? "#exampleModal200" : validateBuy === 0 ? "#exampleModal001" : null}
                    style={{ backgroundColor: "orange", height: "45px", fontSize: "20px" }}>
                    COMPRAR
                  </button>
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-center p-0 m-0 mt-3" style={{ height: "170px" }}>
                <div className=" d-grid p-3 m-0 border border-1 rounded-2 shadow-sm" style={{ width: "100%" }}>
                  <h6 className="text-center text-secondary border border-0 mt-1 m-auto" style={{ backgroundColor: "transparent" }}>
                    Metodos de pago:
                  </h6>
                  <div className="d-flex justify-content-center p-0 m-0 text-center mb-2">
                    <Payment cart={cart} buttonBuy={buttonBuy} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="modal fade" id="exampleModal001" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ zIndex: "99999999" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Usuario no registrado.
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">¡Debes estar registrado para poder realizar la compra!</div>

            <div className="d-flex justify-content-center my-3">
              <img src={register} style={{ width: "300px" }} />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal200" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ zIndex: "99999999" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                ¡Completa los datos de envio!
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">¡Debes completar los datos!</div>

            <div className="d-flex justify-content-center my-3">
              <img src={arrecifess} style={{ width: "300px" }} />
            </div>

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

export default Cart;
