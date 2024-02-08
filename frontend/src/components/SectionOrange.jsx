import React from "react";
import "../assets/styles/SectionOrange.css";

function SectionOrange(props) {
  return (
    <section className="container-fluid p-0 m-0 orange-section shadow d-grid p-2" style={{ height: "125px" }}>
      <h2 className="p-0 m-0 my-auto text-light text-center">{props.title}</h2>
      {props.icon && (
        <div className="p-0 d-flex justify-content-center">
          {props.icon}
          {props.icon}
        </div>
      )}

      <h6 className="p-0 m-0 my-auto text-light text-center">{props.content}</h6>
    </section>
  );
}

export default SectionOrange;
