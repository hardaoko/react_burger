import {useEffect, useState} from "react";
import './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import { BurgerContext } from "../../utils/BurgerContext";

const App = () => {
  const [burgerData, setBurgerData] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try{
        const res = await fetch("https://norma.nomoreparties.space/api/ingredients");
        if (res.ok) {
          const data = await res.json();
          if (data && data.success === true) {
            setBurgerData(data.data)
            setIsLoaded(true)
          } else {
            throw new Error("Data error");
          }
        } else {
          throw new Error("Response is not ok");
        }
      }
      catch(e){
        console.log(e)
        setError(e)
      }
    }
    getData()
  },[])

  return (
    <div className="App">
      <AppHeader />
      <BurgerContext.Provider value={burgerData}>
        <Main error={error} isLoaded={isLoaded} burgerData={burgerData} />
      </BurgerContext.Provider>
    </div>
  );
}

export default App
