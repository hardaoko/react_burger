import {useEffect, useState} from "react";
import styles from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

const App = () => {
  const [data, setData] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try{
        const res = await fetch("https://norma.nomoreparties.space/api/ingredients");
        const data = await res.json();
        await setData(data.data)
        setIsLoaded(true)
      }
      catch(e){
        setError(e)
      }
    }
    getData()
  },[])

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        {
          error === '' ?
          isLoaded &&
          <>
            <BurgerIngredients burgerData={data}/>
            <BurgerConstructor burgerData={data}/>
          </> :
          <span className={`${styles.error} text text_type_main-default text_color_inactive`}>Ошибка при загрузке данных</span>
        }
      </main>
    </div>
  );
}

export default App
