import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const ProtectedRoute = ({ userPermissions, token, requirements, component: Component, ...rest }) => {
  const isAllowed = requirements.some(key => userPermissions.includes(key))
  return (
    <Route {...rest} render={(props) => (
      (isAllowed && token)
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )
};

const mapStateToProps = store => ({
  token: store.auth.information.token,
  userPermissions: store.auth.information.userPermissions || []
})

export default connect(mapStateToProps)(ProtectedRoute);