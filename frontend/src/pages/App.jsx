import React, { useEffect, useState, Suspense, lazy } from "react";
import NavBar from "../components/Header/NavBar";
import "../assets/styles/App.css";
import SectionOrange from "../components/SectionOrange";
import SectionWhite from "../components/SectionWhite";
import Footer from "../components/Footer/Footer";
import AltCarrousel from "../components/AltCarrousel";
import GoTop from "../components/GoTop";
import CatFood from "../components/CatFood";
import percentIcon from "../assets/images/percent-solid.svg";
import boltIcon from "../assets/images/boltt-solid.svg";
import Divisor from "../components/Divisor";
import ModalBanner from "../components/ModalBanner";
import { ShopCircle, ShopCirclee } from "../components/ShopCircle";
import Encargue from "../components/Encargue";
const Cart = lazy(() => import("../components/Cart/Cart"));

const LazyAltCarrousel = React.lazy(() => import("../components/ReactCarousel"));

function App() {
  const [filteredFlash, setFilteredFlash] = useState([]);
  const [filteredPromo, setFilteredPromo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseFlash = await fetch("/backend/offer");
        const jsonDataFlash = await responseFlash.json();
        setFilteredFlash(jsonDataFlash);

        const responsePromo = await fetch("/backend/promo");
        const jsonDataPromo = await responsePromo.json();
        setFilteredPromo(jsonDataPromo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid p-0 m-0 w-100">
      <header>
        <NavBar />
      </header>
      <ModalBanner />
      <AltCarrousel />
      <SectionWhite />
      <Divisor />
      <div className="container">
        <ShopCirclee />
      </div>
      <CatFood />
      <div className="container">
        <ShopCircle />
      </div>
      <Divisor />
      <Encargue />
      <Divisor />
      <SectionOrange title={"¡FLASH SALES!"} content={"¡Aprovecha nuestras ofertas instantaneas, duran solo unos dias!"} icon={<img src={boltIcon} alt="ofertas" className="sectionOrange-icon mx-3" style={{ width: "22px" }} />} />
      <Suspense fallback={<div>Loading...</div>} maxDuration={100}>
        <LazyAltCarrousel data={filteredFlash} />
      </Suspense>
      <Divisor />
      <SectionOrange title={"PROMOS DEL MES"} content={"¡Mira nuestras promociones del mes!"} icon={<img src={percentIcon} className="sectionOrange-icon mx-3" alt="promociones" style={{ width: "22px" }} />} />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyAltCarrousel data={filteredPromo} maxDuration={100} />
      </Suspense>
      {/* <SectionOrange title={"COMBOS"} content={"¡Super combos a precios unicos!"} icon={<i className="fa-solid fa-gift fa-xs mx-3" style={{ color: "#ffffff" }}></i>} />
      <ReactCarousel data={data} /> */}
      <div className="b-example-divider mt-3"></div>
      <GoTop />
      <Footer />
      <Suspense fallback={<div>Loading...</div>}>
        <Cart />
      </Suspense>
    </div>
  );
}

export default App;
