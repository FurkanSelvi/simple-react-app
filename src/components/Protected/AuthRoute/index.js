import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const AuthRoute = ({ token, component: Component, ...rest }) => {

  const redirectPath = localStorage.getItem("redirect") ? localStorage.getItem("redirect") : "/"

  useEffect(() => { if (token) localStorage.removeItem("redirect") }, [token])

  return (
    <Route {...rest} render={(props) => (
      token
        ? <Redirect to={redirectPath} />
        : <Component {...props} />
    )} />
  )
};

AuthRoute.propTypes = {
  token: PropTypes.string
};

const mapStateToProps = store => ({
  token: store.auth.information.token || null,
})

export default connect(mapStateToProps)(AuthRoute);