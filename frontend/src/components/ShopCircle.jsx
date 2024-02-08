import React from "react";
import { Link } from "react-router-dom";

export function ShopCircle() {
  return (
    <>
      <hr className="p-0 m-0 w-50 text-warning d-flex m-auto"></hr>
      <Link className="shopCircle align-items-center shadow-sm" to="/shop/all/all/all/all/all/1">
        IR AL SHOP
      </Link>
    </>
  );
}

export function ShopCirclee() {
  return (
    <>
      <Link className="shopCirclee align-items-center shadow-sm" to="/shop/all/all/all/all/all/1">
        IR AL SHOP
      </Link>
      <hr className="p-0 m-0 w-50 text-warning d-flex m-auto"></hr>
    </>
  );
}
