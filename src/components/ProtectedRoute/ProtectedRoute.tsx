import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { FC } from "react";
import { useMySelector } from "../../utils/types";

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth } = useMySelector((store) => store.profile);
  const location = useLocation();

  return (
    <Route
      {...rest}
      //@ts-ignore
      render={() =>
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



