import React, { useEffect, useState, useContext, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/CartContext";
import { useApi } from "../context/ProductsContext";
import NavBar from "../components/Header/NavBar";
import "../assets/styles/App.css";
import Footer from "../components/Footer/Footer";
import YourComponent from "../services/alimentosbackend";
import Filtro from "../components/Filters";
import Menu from "../components/MenuDesktop";
import GoTop from "../components/GoTop";
import Divisor from "../components/Divisor";
const Cart = lazy(() => import("../components/Cart/Cart"));

function Productoss() {
  const { cart, setCart } = useContext(AppContext);
  const { page } = useParams();
  const { data } = useApi();
  const [MinPrice, setMinPrice] = useState(0);
  const [MaxPrice, setMaxPrice] = useState(25000);
  const [orderPrice, setOrderPrice] = useState();
  const [orderChange, setOrderChange] = useState();
  const [stock, setStock] = useState();
  const [change, setChange] = useState();
  const [offer, setOffer] = useState();

  useEffect(() => {
    // fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("/backend/api");
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //     updateProductPrices(jsonData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const receiveDataFromChild = (jsonData) => {
  //   setData(jsonData);
  // };

  const updateProductPrices = (updatedPrices) => {
    const updatedCart = cart.map((item) => {
      const updatedPrice = updatedPrices.find((priceItem) => priceItem._id === item.key);
      if (updatedPrice) {
        return { ...item, precio: updatedPrice.precio };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const sendMinPrice = (precioMin) => {
    setMinPrice(precioMin);
  };
  const sendMaxPrice = (precioMax) => {
    setMaxPrice(precioMax);
  };

  const orderPricee = (order) => {
    setOrderPrice(order);
    setOrderChange(Math.random());
  };

  const onStockk = (stock) => {
    setStock(stock);
    setChange(Math.random());
  };

  const handleFlashh = () => {
    setOffer(Math.random());
  };

  const handleDesc = () => {
    setOffer(Math.random());
    setOffer("desc");
  };

  return (
    <div className="container-fluid p-0 m-0">
      <header>
        <NavBar />
      </header>
      <Filtro sendMinPrice={sendMinPrice} sendMaxPrice={sendMaxPrice} orderPricee={orderPricee} onStockk={onStockk} />
      <div className="container d-flex mt-1 mx-auto p-0 m-0 w-100" style={{ height: "auto" }}>
        <Menu handleFlashh={handleFlashh} handleDesc={handleDesc} />
        <YourComponent offer={offer} MinPrice={MinPrice} MaxPrice={MaxPrice} data={data} page={page} order={orderPrice} stock={stock} change={change} orderChange={orderChange} />
      </div>
      <Divisor />
      {/* <SectionOrange title={"ACCESORIOS"} content={"¡Dale un gusto a tu mascota!"} icon={<i className="fa-regular fa-xs mx-2 fa-gem" style={{ color: "#ffffff" }}></i>} /> */}
      {/* <ReactCarousel
        data={data} />
      <div className="b-example-divider my-3"></div> */}
      <GoTop />
      <div className="b-example-divider mt-3"></div>

      <Footer />
      <Suspense fallback={<div>Loading...</div>}>
        <Cart />
      </Suspense>
    </div>
  );
}

export default Productoss;
