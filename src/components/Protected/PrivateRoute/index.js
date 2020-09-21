import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = (props) => {
  const { path, token, location, component: Component, ...rest } = props

  useEffect(() => checkRedirect(), [])

  const checkRedirect = () => {
    if (!token && path) localStorage.setItem("redirect", location.pathname)
  }

  return (
    <Route {...rest} render={(renderProps) => (
      token
        ? <Component {...renderProps} />
        : <Redirect to="/login"
        />
    )} />
  )
};

PrivateRoute.propTypes = {
  token: PropTypes.string
};

const mapStateToProps = store => ({
  token: store.auth.information.token || null
})

export default connect(mapStateToProps)(PrivateRoute);