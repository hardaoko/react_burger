import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const { isAuth } = useSelector((store) => store.profile);
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          // Если пользователя нет в хранилище, происходит переадресация на роут /login
          <Redirect
            to={{ pathname: "/login", state: { from: location } }}
            exact={true}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
