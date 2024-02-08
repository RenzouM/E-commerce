import { useState, useEffect } from "react";
import arrowIcon from "../assets/images/chevron-up-solid.svg";

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowButton(scrollTop > 0);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className="btn btn-outline-warning"
        onClick={scrollToTop}
        style={{
          position: "fixed",
          right: "3%",
          bottom: "20px",
          visibility: showButton ? "visible" : "hidden",
        }}>
        <img src={arrowIcon} className="shopping-Cart " style={{ width: "20px" }} />
      </div>
    </>
  );
}

export default ScrollToTopButton;
