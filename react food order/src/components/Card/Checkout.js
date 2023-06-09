import classes from "./Checkout.module.css";

import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";

const isSixCharLong = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [isFormValid, setIsFormValid] = useState({
    name: true,
    street: true,
    portalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const portalCodeInputRef = useRef();
  const streetInputRef = useRef();

  const checkoutSumbitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPortalCode = portalCodeInputRef.current.value;
    const enteredcity = cityInputRef.current.value;

    const isValidName = !isEmpty(enteredName);
    const isValidStreet = !isEmpty(enteredStreet);
    const isValidCity = !isEmpty(enteredcity);
    const isValidPortalCode = isSixCharLong(enteredPortalCode);

    setIsFormValid({
      name: isValidName,
      city: isValidCity,
      street: isValidStreet,
      portalCode: isValidPortalCode,
    });

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredcity,
      portalCode: enteredPortalCode,
    });
  };

  const nameControlClasses = isFormValid.name
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const streetControlClasses = isFormValid.street
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const portalCodeControlClasses = isFormValid.portalCode
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const cityControlClasses = isFormValid.city
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={checkoutSumbitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input id="name" type="text" ref={nameInputRef} />
      </div>
      {!isFormValid.name && <p>Enter Valid Name</p>}
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetInputRef} />
      </div>
      {!isFormValid.street && <p>Enter Valid Street</p>}
      <div className={portalCodeControlClasses}>
        <label htmlFor="code">Portal Code</label>
        <input id="code" type="text" ref={portalCodeInputRef} />
      </div>
      {!isFormValid.portalCode && <p>Enter Valid PortalCode.(6 char long)</p>}
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityInputRef} />
      </div>
      {!isFormValid.city && <p>Enter Valid city</p>}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCloseCart}>
          close
        </button>
        <button type="sumbit" className={classes.submit}>
          confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
