import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth } = useSelector((store: any) => store.profile);
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



