import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/styles/Slick.css";
import CardCarousel from "./ReactCarouselData";

function ReactCarousel(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 120,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1238,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 997,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  return (
    <div className="container p-0 mt-4 m-auto" style={{ width: "95%", height: "auto" }}>
      <Slider {...settings}>
        {props.data.map((dataa) => (
          <CardCarousel
            key={dataa._id}
            productKey={dataa._id}
            marca={dataa.marca}
            subMarca={dataa.subMarca}
            mascota={dataa.mascota}
            edad={dataa.edad}
            raza={dataa.raza}
            kg={dataa.kg}
            stock={dataa.stock}
            precio={dataa.precio}
            img={dataa.img}
            offer={dataa.offer}
            descuento={dataa.descuento}
            porcDescuento={dataa.logo}
          />
        ))}
      </Slider>
    </div>
  );
}
export default React.memo(ReactCarousel);
