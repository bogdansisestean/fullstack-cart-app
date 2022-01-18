import "./ProductScreen.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

//Actions

import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  console.log("params", params);
  console.log("navigate", navigate);

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && params.id !== product._id) {
      dispatch(getProductDetails(params.id));
    }
  }, [dispatch, product, params, productDetails]);

  const priceChangeHandler = (e) => setQty(e.target.value);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    navigate("/cart", { replace: true });
  };

  console.log("productdetails", productDetails);
  return (
    <div className="productscreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <React.Fragment>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={product.imageUrl} alt={product.Name} />
            </div>
            <div className="left__info">
              <p className="left__name">{product.name}</p>
              <p>Price: {product.price}</p>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price: <span>${product.price}</span>
              </p>
              <p>
                Status:
                <span>{product.count > 0 ? "In stock" : "Out of stock"}</span>
              </p>
              <p>
                Qty
                <select value={qty} onChange={priceChangeHandler}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Add to cart
                </button>
              </p>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ProductScreen;
