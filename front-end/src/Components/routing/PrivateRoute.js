import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserStore } from "../../Context/appStore";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, dispatch] = useUserStore();
  const { isAuthenticated, loading } = state.auth;
  return (
    <Route
      {...rest}
      render={props =>
        !state.auth.isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
