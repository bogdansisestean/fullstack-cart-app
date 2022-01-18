import React from "react";
import "./CartItem.css";
import { Link } from "react-router-dom";
import { removeFromCart } from "../redux/actions/cartActions";

const CartItem = (props) => {

   const removeFromCartHandler = () => {
    props.removeHandler(props.item.product);
  };

  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img src={props.item.imageUrl} alt={props.item.name} />
      </div>
      <Link to={`/product/${props.item.product}`} className="cartitem__name">
        <p>{props.item.name}</p>
      </Link>
      <p className="cartitem__price">${props.item.price}</p>
      <select
        className="cartItem__select"
        value={props.item.qty}
        onChange={(e) =>
          props.qtyChangeHandler(props.item.product, e.target.value)
        }
      >
        {[...Array(props.item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button className="cartItem__deleteBtn" onClick={removeFromCartHandler}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
