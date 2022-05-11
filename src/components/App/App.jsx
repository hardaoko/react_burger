import {useEffect} from "react";
import './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  },[dispatch])

  return (
    <div className="App">
      <AppHeader />
        <Main />
    </div>
  );
}

export default App
