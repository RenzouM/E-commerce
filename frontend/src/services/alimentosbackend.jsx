import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import { AppContext } from "../context/CartContext";

function YourComponent(props) {
  const navigate = useNavigate();
  const { page, edad, raza, mascota, medicado, offer } = useParams();
  const { cart, setCart } = useContext(AppContext);
  const [data, setData] = useState(props.data);
  const [stock, setStock] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    mascota: "all",
    edad: "all",
    raza: "all",
    medicado: "all",
    offer: "all",
    precioMin: 0,
    precioMax: 100000,
  });

  const addToCart = (id) => {
    const existingItem = cart.find((item) => item.productKey === id.productKey);

    if (!existingItem) {
      if (cart.length === 0) {
        const newItem = {
          key: id.productKey,
          productKey: id.productKey,
          marca: id.marca,
          subMarca: id.subMarca,
          mascota: id.mascota,
          raza: id.raza,
          edad: id.edad,
          kg: id.kg,
          precio: id.precio,
          img: id.img,
          cant: 1,
        };
        setCart([newItem]);
      } else {
        const newItem = {
          key: id.productKey,
          productKey: id.productKey,
          marca: id.marca,
          subMarca: id.subMarca,
          mascota: id.mascota,
          raza: id.raza,
          edad: id.edad,
          kg: id.kg,
          precio: id.precio,
          img: id.img,
          cant: 1,
        };
        setCart((prevItems) => [...prevItems, newItem]);
      }
    }
  };

  const filterProducts = () => {
    return data.filter((product) => {
      return (
        product.precio >= filters.precioMin &&
        product.precio <= filters.precioMax &&
        (filters.edad === "all" || product.edad === filters.edad) &&
        (filters.raza === "all" || product.raza === "T. las Razas" || (product.raza && product.raza.includes(filters.raza))) &&
        (filters.mascota === "all" || product.mascota === filters.mascota) &&
        (filters.medicado === "all" || product.edad.includes(filters.medicado)) &&
        (filters.offer === "all" || product.offer === filters.offer) &&
        (stock !== "" && stock === true ? product.stock === true : true) &&
        (stock !== "" && stock === false ? product.stock === false : true)
      );
    });
  };

  var filteredProducts = filterProducts();

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    setData(props.data);
    setStock(props.stock);
    navigate(`/shop/${edad}/${raza}/${mascota}/${medicado}/${offer}/${page}`);
  }, [props.change]);

  useEffect(() => {
    setData(props.data);
    if (props.order === 1) {
      setData(filteredProducts.sort((a, b) => a.precio - b.precio));
    } else {
      setData(filteredProducts.sort((a, b) => b.precio - a.precio));
    }
  }, [props.orderChange]);

  useEffect(() => {
    const minPriceNumber = parseInt(props.MinPrice, 10);
    setFilters((prevFilter) => ({
      ...prevFilter,
      precioMin: minPriceNumber,
    }));
  }, [props.MinPrice]);

  useEffect(() => {
    const maxPriceNumber = parseInt(props.MaxPrice, 10);
    setFilters((prevFilter) => ({
      ...prevFilter,
      precioMax: maxPriceNumber,
    }));
  }, [props.MaxPrice]);

  useEffect(() => {
    setData(props.data);
    setStock("");
    setFilters((prevFilter) => ({
      ...prevFilter,
      mascota: mascota,
      edad: edad,
      raza: raza,
      medicado: medicado,
      offer: offer,
    }));
  }, [edad, raza, mascota, medicado, offer]);

  useEffect(() => {
    const currentPage = parseInt(page) || 1;
    setCurrentPage(currentPage);
  }, [page]);

  // useEffect(() => {
  //   setData(props.data.filter((object) => object.flash === true));
  // }, [props.offer]);

  let cantItemsPage = 16;
  let cantItems = filteredProducts.length;
  let cantPages = Math.trunc(cantItems / cantItemsPage);

  //Pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/shop/${pageNumber}`);
  };

  const handlePageChangeNext = () => {
    if (currentPage < cantPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      navigate(`/shop/${nextPage}`);
    }
  };

  const handlePageChangeBack = () => {
    if (currentPage > -1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      navigate(`/shop/${prevPage}`);
    }
  };
  //Pagination

  return (
    <div className="d-flex justify-content-center align-items-top p-0 m-0" style={{ height: "auto", width: "100%" }}>
      <div className="row h-50" style={{ width: "100%" }}>
        <Pagination page={currentPage} cantItems={cantItems} cantItemsPage={cantItemsPage} onPageChange={handlePageChange} onPageChangeNext={handlePageChangeNext} onPageChangeBack={handlePageChangeBack} />
        <div className="p-0 d-flex justify-content-center align-items-center my-3" style={{ height: "1px" }}>
          <hr className="d-flex position-relative" style={{ alignItems: "center", width: "94%" }}></hr>
        </div>

        {filteredProducts.slice((currentPage - 1) * cantItemsPage, currentPage * cantItemsPage).map((item) => (
          <Card
            key={item._id}
            productKey={item._id}
            marca={item.marca}
            subMarca={item.subMarca}
            tipo={item.tipo}
            mascota={item.mascota}
            edad={item.edad}
            raza={item.raza}
            kg={item.kg}
            precio={item.precio}
            stock={item.stock}
            img={item.img}
            offer={item.offer}
            porcDescuento={item.porcDescuento}
            addToCart={addToCart}
          />
        ))}

        <div className="p-0 d-flex justify-content-center align-items-center my-3" style={{ height: "10px" }}>
          <hr className="d-flex position-relative" style={{ alignItems: "center", width: "94%" }}></hr>
        </div>

        <Pagination className="d-flex mt-auto float-bottom" page={currentPage} cantItems={cantItems} cantItemsPage={cantItemsPage} onPageChange={handlePageChange} onPageChangeNext={handlePageChangeNext} onPageChangeBack={handlePageChangeBack} />
      </div>
    </div>
  );
}

export default YourComponent;
