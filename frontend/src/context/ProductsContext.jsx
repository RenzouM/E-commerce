import React, { createContext, useContext, useState, useEffect } from "react";

// Crea un nuevo contexto
const ApiContext = createContext();

// Crea un componente proveedor que envolverá toda tu aplicación
export function ApiProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para realizar una llamada a la API
  const fetchData = async () => {
    try {
      const response = await fetch("/backend/api");
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener datos de la API", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Proporciona el estado y las funciones necesarias a través del contexto
  const contextValue = {
    data,
    loading,
    fetchData,
  };

  return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>;
}

// Función personalizada para usar el contexto en componentes
export function useApi() {
  return useContext(ApiContext);
}
