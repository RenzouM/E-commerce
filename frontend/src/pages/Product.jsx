import React, { useEffect, useState, Suspense, lazy } from "react";
import { useApi } from "../context/ProductsContext";
import NavBar from "../components/Header/NavBar";
import "../assets/styles/App.css";
import SectionOrange from "../components/SectionOrange";
import Footer from "../components/Footer/Footer";
import Productt from "../components/Productt";
const LazyAltCarrousel = React.lazy(() => import("../components/ReactCarousel"));
const Cart = lazy(() => import("../components/Cart/Cart"));

function Product() {
  const { data } = useApi();
  const [filteredMascota, setFilteredMascota] = useState([]);
  const [mascota, setMascota] = useState([]);
  const [raza, setRaza] = useState([]);
  const [edad, setEdad] = useState([]);

  useEffect(() => {
    const fetchDataAndFilter = () => {
      try {
        // Filtrar carouseles al cargar los datos
        const filteredFlashData = data.filter((object) => object.mascota === mascota && object.raza === raza && object.edad === edad);
        filteredFlashData.sort((a, b) => a.precio - b.precio);
        setFilteredMascota(filteredFlashData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataAndFilter();
  }, [mascota, raza, edad]);

  const enviarMascotaa = (asd, asdd, asddd) => {
    setMascota(asd);
    setRaza(asdd);
    setEdad(asddd);
  };

  return (
    <div className="container-fluid p-0">
      <header>
        <NavBar />
      </header>
      <Productt enviarMascota={enviarMascotaa} />
      <SectionOrange title={"PRODUCTOS RELACIONADOS"} content={"TAMBIEN TE PUEDE INTERESAR"} />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyAltCarrousel data={filteredMascota} />
      </Suspense>
      <div className="b-example-divider mt-3"></div>
      <Footer />
      <Suspense fallback={<div>Loading...</div>}>
        <Cart />
      </Suspense>
    </div>
  );
}

export default Product;
