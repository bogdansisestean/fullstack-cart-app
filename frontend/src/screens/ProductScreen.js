import "./ProductScreen.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions

import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const ProductScreen = ({ match, history }) => {
  console.log("match", match);

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, product, match, productDetails]);

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
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </p>
              <p>
                <button type="button">Add to cart</button>
              </p>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ProductScreen;
