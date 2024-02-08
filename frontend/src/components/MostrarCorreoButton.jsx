import React from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";

function MostrarCorreoButton() {
  const correo = "peludosarrecifes@gmail.com";

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip id="tooltip-correo" style={{ fontSize: "14px" }}>
          {correo}
        </Tooltip>
      }>
      <Button className="bg-transparent text-body-secondary border-0 m-0 p-0">Email</Button>
    </OverlayTrigger>
  );
}

export default MostrarCorreoButton;
