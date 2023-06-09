import classes from "./AvailableMeals.module.css";
import MealItem from "./mealItem/MealItem";
import Card from "../UI/Card";
import { useState, useEffect } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://react-meals-fab74-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error(
          "something went wrong!. Enable to fectch data please try again!"
        );
      }

      const responseData = await response.json();
      // console.log(responseData);

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
        });
      }
      // console.log(loadedMeals);

      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchData().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
      console.log(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.loading}>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p className={classes.loading}>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      name={meal.name}
      price={meal.price}
      description={meal.description}
      key={meal.id}
      id={meal.id}
    />
  ));

  // console.log(mealsList);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
