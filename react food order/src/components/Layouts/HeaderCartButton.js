import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Card/CartIcon";
import { useContext, useState, useEffect } from "react";
import CartContext from "../../store/CartContext";

const HeaderCartButton = (props) => {
  const [isBtnHeighlated, setIsBtnHeighlated] = useState(false);

  const btnClasses = `${classes.button} ${
    isBtnHeighlated ? `${classes.bump}` : ""
  } `;

  const cartCtx = useContext(CartContext);
  const numberOfItems = cartCtx.items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  useEffect(() => {
    setIsBtnHeighlated(true);
    const timer = setTimeout(() => setIsBtnHeighlated(false), 300);
    return () => clearTimeout(timer);
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.bump}>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
