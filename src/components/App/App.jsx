import {useEffect, useState} from "react";
import './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import { BurgerContext } from "../../utils/BurgerContext";
import { baseUrl } from "../../utils/constants";

export function checkResponse(response) {
  if (!response.ok) {
      throw new Error("response is not ok");
  }
}

const App = () => {
  const [burgerData, setBurgerData] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try{
        const url = baseUrl + "ingredients"
        const res = await fetch(url);
        checkResponse(res)
        const data = await res.json();
        if (data && data.success === true) {
          setBurgerData(data.data)
          setIsLoaded(true)
        } else {
          throw new Error("Data error");
        }

      }
      catch(e){
        console.log('Ошибка', e)
        setError(true)
      }
    }
    getData()
  },[])

  return (
    <div className="App">
      <AppHeader />
      <BurgerContext.Provider value={burgerData}>
        <Main error={error} isLoaded={isLoaded} />
      </BurgerContext.Provider>
    </div>
  );
}

export default App
