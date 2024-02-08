import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const AppContext = createContext();

// Crear el proveedor del contexto
export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Función asincrónica para cargar el carrito desde la cookie
    async function loadCartFromCookie() {
      const cookieValue = getCookie("cartPeludosPetShop");

      try {
        const cartData = cookieValue && cookieValue !== "undefined" ? JSON.parse(cookieValue) : [];

        // Aquí debes realizar una solicitud a la base de datos para verificar la disponibilidad
        // de cada elemento del carrito antes de establecerlo en el estado.
        const updatedCart = await checkAvailabilityInDatabase(cartData);

        // Establecer el carrito en el estado después de verificar la disponibilidad
        setCart(updatedCart);
      } catch (error) {
        console.error("Error parsing cart cookie:", error);
        setCart([]); // En caso de error, establecer un carrito vacío
      }
    }

    loadCartFromCookie();
  }, []);

  function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        const cookieValue = cookie.substring(cookieName.length, cookie.length);
        if (cookieValue) {
          return cookieValue;
        }
      }
    }
    return null;
  }

  // Simula una función para verificar la disponibilidad en la base de datos
  async function checkAvailabilityInDatabase(cartData) {
    try {
      const response = await fetch("/backend/verificarDisponibilidad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: cartData }),
      });

      if (!response.ok) {
        throw new Error("Error al verificar disponibilidad en el backend");
      }

      const updatedCart = await response.json();
      return updatedCart;
    } catch (error) {
      console.error("Error al verificar disponibilidad en el backend:", error);
      return cartData;
    }
  }

  function setCookie(name, value, daysToExpire, paths = ["/"]) {
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + daysToExpire);
    const expires = "expires=" + expiresDate.toUTCString();
    const pathString = paths.map((path) => `path=${path}`).join("; ");
    document.cookie = `${name}=${value}; ${expires}; ${pathString}`;
  }

  useEffect(() => {
    setCookie("cartPeludosPetShop", JSON.stringify(cart), 15, ["/"]);
  }, [cart]);

  return <AppContext.Provider value={{ cart, setCart }}>{children}</AppContext.Provider>;
};
