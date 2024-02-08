import { React, useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("TEST-1de4bf5d-c86b-423a-a37f-fbf055d04ad5", { locale: "es-AR" });

function Payment(props) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const createPreference = async () => {
    const pref = props.cart;

    const preferenceResult = pref.map((objeto) => ({
      id: objeto.key,
      description: objeto.raza ? `${objeto.marca} - ${objeto.mascota} ${objeto.edad} ${objeto.raza} x${objeto.kg}kg` : `${objeto.marca} - ${objeto.mascota} ${objeto.edad} x${objeto.kg}kg`,
      price: Number(objeto.precio),
      quantity: Number(objeto.cant),
    }));

    try {
      // Configura la URL de notificación en la preferencia
      const notificationUrl = "https://0a9d-186-136-5-6.ngrok-free.app/mp_notification"; // Reemplaza con la URL de notificación correcta
      const preference = {
        notification_url: notificationUrl, // Agrega la URL de notificación aquí
        items: preferenceResult,
      };

      // Realiza la solicitud para crear la preferencia con la URL de notificación
      const response = await fetch("/backend/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preference),
      });

      const { id } = await response.json();
      return id;
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuy = async () => {
    console.log("Botón de compra presionado");
    const id = await createPreference();
    setPreferenceId(id);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    handleBuy();
  }, [props.buttonBuy]);

  return (
    <>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
      <div className="spinner-border text-warning position-absolute" role="status" style={{ top: "150px", left: "184px", zIndex: "-1" }}></div>
    </>
  );
}

export default Payment;
