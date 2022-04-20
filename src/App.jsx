import {useEffect, useState} from "react";
import "./styles.css";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";

const App = () => {
  const [data, setData] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://norma.nomoreparties.space/api/ingredients");
      const data = await res.json();
      await setData(data.data)
      setIsLoaded(true)
    }
    getData()
  },[])

  return (
    <div className="App">
      <header>
        <AppHeader />
      </header>
      {
        isLoaded &&
        <div className="main">
          <BurgerIngredients burgerData={data}/>
          <BurgerConstructor burgerData={data}/>
        </div>
      }
    </div>
  );
}

export default App
