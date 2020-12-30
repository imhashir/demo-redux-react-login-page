import React from "react";
import { StaticContext } from "react-router";
import {Route, Redirect, RouteProps, RouteComponentProps} from "react-router-dom";

interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean
  isVerifying: boolean
}

const ProtectedRoute = ({
  component,
  isAuthenticated,
  isVerifying,
  ...rest
}: ProtectedRouteProps) => {
  const ChildComponent = component as React.ComponentClass<RouteComponentProps<any, StaticContext, unknown>, any>;
  return <Route
    {...rest}
    render={props =>
      isVerifying ? (
        <div />
      ) : isAuthenticated ? (
        <ChildComponent {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
};

export default ProtectedRoute;
