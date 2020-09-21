import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReduxToastr from "react-redux-toastr";
import { Container } from "../containers/Dashboard";
import { Login, Register } from "../containers/Auth";
import { AuthRoute, PrivateRoute } from "../components/Protected";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { connect } from "react-redux";
import ErrorCatch from "../ErrorCatch";

const AppRoutes = props => {
  const { } = props;
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <ErrorCatch>
        <>
          <Switch>
            <AuthRoute name="login" path={"/login"} component={Login} />
            <AuthRoute name="register" path={"/register"} component={Register} />
            <PrivateRoute name="dashboard" path={"/"} component={Container} />
          </Switch>
          <ReduxToastr
            timeOut={6000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
        </>
      </ErrorCatch>
    </BrowserRouter>
  );
};

const mapStateToProps = store => ({
  information: store.auth.information || {}
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRoutes);
