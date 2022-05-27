import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Main from "../../pages/Main/Main";
import Registration from "../../pages/Registration/Registration";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import OrdersList from "../../pages/OrdersList/OrdersList";
import Profile from "../../pages/Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { MODAL_CLOSE } from "../../services/actions/ingredients";
import { useDispatch } from "react-redux";
import OrdersHistory from "../../pages/OrdersHistory/OrdersHistory";

function ModalSwitch() {
  let location = useLocation();
  let background = location.state && location.state.background;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClose = () => {
    dispatch({ type: MODAL_CLOSE });
    history.push("/");
  };

  return (
    <div>
      <Switch location={background || location}>
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
          <IngredientDetails title="Детали ингредиента" />
        </Route>
        <Route path="/orders-list" exact={true}>
          <OrdersList />
        </Route>
        <Route path="/profile/orders" exact={true}>
          <OrdersHistory />
        </Route>
      </Switch>

      {/* Show the modal when a background page is set */}
      {background && (
        <Route path="/ingredients/:id" exact={true}>
          <Modal onClose={handleClose} title="Детали ингредиента">
            <IngredientDetails title="" />
          </Modal>
        </Route>
      )}
    </div>
  );
}

export default ModalSwitch;
