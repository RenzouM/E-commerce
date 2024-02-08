import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/styles/Pagination.css";

function Pagination(props) {
  const { onPageChange, cantItems, cantItemsPage } = props;
  const cantPages = Math.trunc(cantItems / cantItemsPage) + 1;
  const { page, edad, raza, mascota, medicado, offer } = useParams();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1); // Estado para la página activa

  useEffect(() => {
    const currentPageFromUrl = parseInt(page) || 1;
    setActivePage(currentPageFromUrl); // Establece la página activa desde el parámetro "page"
  }, [page]);

  const handlePageClick = (selected) => {
    const selectedPage = selected + 1;
    onPageChange(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/shop/${edad}/${raza}/${mascota}/${medicado}/${offer}/${selectedPage}`);
  };

  return (
    <nav className="d-flex m-0 r-0 p-0" aria-label="Page navigation example" style={{ width: "100%", height: "50px" }}>
      <div className="row p-0 m-0 align-items-center">
        <div className="col-auto p-0 m-0 ms-auto">
          <ul className="pagination justify-content-end p-0 d-flex my-auto">
            <ReactPaginate
              pageCount={cantPages}
              pageClassName="page"
              pageRangeDisplayed={1}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => handlePageClick(selected)}
              containerClassName="pagination"
              activeClassName="activee"
              breakLabel="..."
              breakClassName="break"
              previousLabel="Anterior"
              previousClassName="custom-prev"
              nextLabel="Siguiente"
              nextClassName="custom-next"
              forcePage={activePage - 1} // Establece la página activa
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Pagination;
