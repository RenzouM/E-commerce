import React, { useState } from "react";
import { useParams } from "react-router-dom";
import img from "../assets/images/peludos-pet-shop.webp";
import { Toaster, toast } from "sonner";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [passwordd, setPasswordd] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === passwordd) {
      try {
        const response = await fetch(`/reset-password/${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        });

        if (response.ok) {
          toast.success("Contraseña cambiada exitosamente.¡Ahora puedes iniciar sesión!.");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Las contraseñas no coinciden.");
    }
    setPassword("");
    setPasswordd("");
  };

  return (
    <section className="d-flex align-items-center justify-content-center" style={{ height: "100vh", background: "#FAFAFA" }}>
      <div className="border rounded-4 p-3 shadow text-center bg-white">
        <h5>RESTABLECER CONTRASEÑA</h5>
        <img src={img} className="d-flex mx-auto mt-3" style={{ width: "120px" }} />
        <form className="d-grid mt-3" onSubmit={handleSubmit}>
          <input className="my-3 rounded-3" type="password" id="password" value={password} placeholder="Nueva Contraseña" onChange={(e) => setPassword(e.target.value)} required style={{ height: "40px", borderColor: "grey" }} />
          <input className="mb-3 rounded-3" type="password" id="passwordd" value={passwordd} placeholder="Repetir Contraseña" onChange={(e) => setPasswordd(e.target.value)} required style={{ height: "40px" }} />
          <button className="rounded-3 bg-warning border-warning text-white" type="submit">
            CAMBIAR CONTRASEÑA
          </button>
        </form>
      </div>
      <Toaster position="bottom-center" richColors />
    </section>
  );
};

export default ResetPasswordPage;
