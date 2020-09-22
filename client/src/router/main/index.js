import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home, ProtectedHome } from "../../containers/Dashboard";
import { TablePage } from "../../containers/TablePage";
import { PrivateRoute, ProtectedRoute } from "../../components/Protected";

const MainBoard = props => {
  const { } = props;

  return (
    <Switch>
      <PrivateRoute exact path={'/'} component={Home} />
      <PrivateRoute exact path={'/table'} component={TablePage} />
      <ProtectedRoute exact requirements={["protectedHome"]} path={'/protected-home'} component={ProtectedHome} />
    </Switch>
  );
};

export default MainBoard;
