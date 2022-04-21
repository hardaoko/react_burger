import React from "react";
import PropTypes from 'prop-types'
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import Ingredient from "../Ingredient/Ingredient";

const burgerDataType = PropTypes.shape({
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  proteins: PropTypes.number,
  type: PropTypes.string,
  uuid: PropTypes.string,
  __v: PropTypes.number,
  _id: PropTypes.string
})

const BurgerIngredients = props => {
  const [current, setCurrent] = React.useState("one");

  return (
    <div className={styles.container}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients_container} `}>
        <h2 id="bun" className="mb-6 mt-10 text text_type_main-medium">
          Булки
        </h2>
        <ul className={styles.list}>
          {props.burgerData.map(item=> item.type === 'bun' && <Ingredient key={item._id} item={item} />)}
        </ul>
        <h2 id="sauce" className="mb-6 mt-10 text text_type_main-medium">
          Соусы
        </h2>
        <ul className={styles.list}>
          {props.burgerData.map(item=> item.type === 'sauce' && <Ingredient key={item._id} item={item} />)}
        </ul>
        <h2 id="main" className="mb-6 mt-10 text text_type_main-medium">
          Начинки
        </h2>
        <ul className={styles.list}>
          {props.burgerData.map(item=> item.type === 'main' && <Ingredient key={item._id} item={item} />)}
        </ul>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  burgerData: PropTypes.arrayOf(burgerDataType)
};

export default BurgerIngredients;
