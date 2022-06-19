import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";
import { IRouteProps } from "../../utils/types";

export const ProtectedRoute: FC<IRouteProps> = ({ children, ...rest }) => {
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



