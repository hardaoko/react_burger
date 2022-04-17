import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { useState } from "react";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState("one");
  return (
    <div className={styles.container}>
      <h1></h1>
      <div style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          One
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Three
        </Tab>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {};

export default BurgerIngredients;
