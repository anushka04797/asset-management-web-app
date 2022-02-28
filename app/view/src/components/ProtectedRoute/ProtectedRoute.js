import React from "react";
import { Redirect, Route } from "react-router-dom";
import { TOKEN } from "../../config";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = sessionStorage.getItem(TOKEN)?true:false;
  return (
    <>
        <Route
        {...restOfProps}
        render={(props) =>
            isAuthenticated ? <Component {...props} /> : <Redirect to="/login"/>
        }
        />
    </>
  );
}

export default ProtectedRoute;
