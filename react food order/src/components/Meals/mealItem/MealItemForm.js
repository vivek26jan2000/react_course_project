import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  // console.log(props.id);
  // console.log(props.onAddCart);
  const amountInput = useRef();
  const [isValidInputAmount, setIsValueInputAmount] = useState(true);

  const amountInputHandler = (e) => {
    e.preventDefault();
    const inputAmountNumber = +amountInput.current.value;

    if (
      inputAmountNumber < 1 ||
      inputAmountNumber > 5 ||
      amountInput.current.value.trim().length === 0
    ) {
      setIsValueInputAmount(false);
      return;
    }
    props.onAddCart(inputAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={amountInputHandler}>
      <Input
        label="Amount"
        ref={amountInput}
        input={{
          type: "number",
          id: `amount${props.id}`,
          max: "5",
          min: "1",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isValidInputAmount && <p>please provide valid input</p>}
    </form>
  );
};

export default MealItemForm;
