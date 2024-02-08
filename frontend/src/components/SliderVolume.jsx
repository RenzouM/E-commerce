import React, { useState, useEfect } from "react";
import { VolumeDown, Slider, VolumeUp, Stack } from "@mui/material"; // Asegúrate de importar Stack también
import Form from "react-bootstrap/Form";

function MyComponent({ updateParentMin, updateParentMax }) {
  const [minValue, setMinValue] = useState(0); // Estado para el valor del Slider
  const [maxValue, setMaxValue] = useState(30000); // Estado para el valor del Slider

  const sendMinValue = (event) => {
    setMinValue(event.target.value * 300);

    updateParentMin(minValue);
  };
  const sendMaxValue = (event) => {
    setMaxValue(event.target.value * 300);

    updateParentMax(maxValue);
  };

  return (
    <>
      <Form.Label className="custom-range d-flex text-center justify-content-center">
        Precio Minimo:
        <span>{minValue}</span>
      </Form.Label>
      <Slider
        defaultValue={0}
        aria-label="Default"
        onMouseUp={(event) => event.preventDefault()} // Evitar que se cierre al soltar el clic
        style={{ width: "80%", margin: "auto", display: "flex", color: "orange" }}
        onChange={sendMinValue}
      />

      <Form.Label className="custom-range d-flex text-center justify-content-center">
        Precio Maximo:
        <span>{maxValue}</span>
      </Form.Label>
      <Slider
        defaultValue={100}
        aria-label="Default"
        onMouseUp={(event) => event.preventDefault()} // Evitar que se cierre al soltar el clic
        style={{ width: "80%", margin: "auto", display: "flex", color: "orange" }}
        onChange={sendMaxValue}
      />
    </>
  );
}

export default MyComponent;
