
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Location } from "react-router";
import Login from "../../pages/Login/Login";
import Main from "../../pages/Main/Main";
import Registration from "../../pages/Registration/Registration";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import Profile from "../../pages/Profile/Profile";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { MODAL_CLOSE } from "../../services/actions/ingredients";
import { useDispatch } from "react-redux";
import OrderFeed from "../../pages/OrderFeed/OrderFeed";
import OrderInfo from "../OrderInfo/OrderInfo";

function ModalSwitch() {
  type ExtendedLocation = Location & {
    state: {
      background:
      { pathname: string, search: string, hash: string, state: undefined };
    };
  };

  function isLocationWithState(location: Location): location is ExtendedLocation {
    return (
      typeof location.state === 'object' && location.state !== null && 'background' in location.state
    );
  }

  let location = useLocation();

  let background = isLocationWithState(location) ? location.state.background : null;

  const dispatch = useDispatch();
  const history = useHistory();
  const handleClose = () => {
    dispatch({ type: MODAL_CLOSE });
    history.push("/");
  };

  const handleCloseOrderInfo = () => {
    dispatch({ type: MODAL_CLOSE });
    history.push(background);
  };

  return (
    <div>
      <Switch location={background || location}>

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Registration />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <Route path="/ingredients/:id">
          <IngredientDetails title="Детали ингредиента" />
        </Route>
        <Route path="/orders-feed/:id">
          <OrderInfo />
        </Route>
        <Route path="/orders-feed">
          <OrderFeed />
        </Route>

        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <Route path="/">
          <Main />
        </Route>
      </Switch>

      {/* Show the modal when a background page is set */}
      {background != null && (
        <Switch>
          <Route path="/ingredients/:id">
            <Modal onClose={handleClose} title="Детали ингредиента">
              <IngredientDetails title="" />
            </Modal>
          </Route>
          <Route path="/orders-feed/:id">
            <Modal onClose={handleCloseOrderInfo} >
              <OrderInfo />
            </Modal>
          </Route>
          <Route path="/profile/orders/:id">
            <Modal onClose={handleCloseOrderInfo} >
              <OrderInfo />
            </Modal>
          </Route>
        </Switch>
        )
      }
    </div>
  );
}

export default ModalSwitch;
