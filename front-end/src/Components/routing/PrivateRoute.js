import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserStore } from "../../Context/appStore";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useUserStore();
  const { isAuthenticated, loading } = state.auth;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
