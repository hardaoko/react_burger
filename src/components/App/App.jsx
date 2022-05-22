import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions";
import "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Login from "../../pages/Login/Login";
import Main from "../../pages/Main/Main";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      <Login />
      <Main />
    </div>
  );
};

export default App;
