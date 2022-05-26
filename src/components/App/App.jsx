import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Login from "../../pages/Login/Login";
import Main from "../../pages/Main/Main";
import Registration from "../../pages/Registration/Registration";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import OrdersList from "../../pages/OrdersList/OrdersList";
import Profile from "../../pages/Profile/Profile";
import { getUserData } from "../../services/actions/profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store.profile);

  useEffect(() => {
    dispatch(getUserData(accessToken));
    dispatch(getIngredients());
  }, [dispatch, accessToken]);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
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
            <ProtectedRoute path="/profile" exact={true}>
              <Profile />
            </ProtectedRoute>
            <Route path="/ingredients/:id" exact={true}>
              <Login />
            </Route>
            <Route path="/orders-list" exact={true}>
              <OrdersList />
            </Route>
          </Switch>
        </Router>
      </DndProvider>
    </div>
  );
};

export default App;
