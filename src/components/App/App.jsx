import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Login from "../../pages/Login/Login";
import Main from "../../pages/Main/Main";
import Registration from "../../pages/Registration/Registration";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import OrdersList from "../../pages/OrdersList/OrdersList";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" exact={true}>
            <Main />
          </Route>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <Route path="/register" exact={true}>
            <Registration />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPassword />
          </Route>
          <Route path="/profile" exact={true}>
            <Login />
          </Route>
          <Route path="/ingredients/:id" exact={true}>
            <Login />
          </Route>
          <Route path="/orders-list" exact={true}>
            <OrdersList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
