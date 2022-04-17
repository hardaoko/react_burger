import React from "react";
import "./styles.css";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";

export default class App extends React.Component {
  state = {};

  render() {
    return (
      <div className="App">
        <header>
          <AppHeader />
        </header>
        <div className="main">
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </div>
    );
  }
}
