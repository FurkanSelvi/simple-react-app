import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home, ProtectedHome } from "../../containers/Dashboard";
import { ProtectedRoute } from "../../components/Protected";

const MainBoard = props => {
  const { } = props;

  return (
    <Switch>
      <Route exact path={'/'} component={Home} />
      <ProtectedRoute exact requirements={["protectedHome"]} path={'/protected-home'} component={ProtectedHome} />
    </Switch>
  );
};

export default MainBoard;
