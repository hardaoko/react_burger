import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const { isAuth } = useSelector((store) => store.profile);

  return (
    <Route
      {...rest}
      render={() =>
        isAuth ? (
          children
        ) : (
          // Если пользователя нет в хранилище, происходит переадресация на роут /login
          <Redirect to="/login" exact={true} />
        )
      }
    />
  );
}

export default ProtectedRoute;
