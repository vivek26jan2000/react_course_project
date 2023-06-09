import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const orderConfirmHandler = async (userData) => {
    // console.log(userData);
    setIsSubmiting(true);

    await fetch(
      "https://react-meals-fab74-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setIsSubmiting(false);
    setIsSubmitted(true);
    cartCtx.clearItem();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </Fragment>
  );

  const cartModalAction = (
    <Fragment>
      {!isCheckout && modalActions}
      {isCheckout && (
        <Checkout
          onCloseCart={props.onCloseCart}
          onConfirm={orderConfirmHandler}
        />
      )}
    </Fragment>
  );

  const submittingAction = <p>Submiting Your Order...</p>;
  const submittedAction = (
    <Fragment>
      <p>Your Order Submitted Successfully!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isSubmiting && !isSubmitted && cartModalAction}
      {isSubmiting && !isSubmitted && submittingAction}
      {isSubmitted && !isSubmiting && submittedAction}
    </Modal>
  );
};

export default Cart;
