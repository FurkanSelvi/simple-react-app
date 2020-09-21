import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../data'
import { withRouter } from 'react-router';
import PropTypes from "prop-types";
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from "redux-i18n";

const Copyright = (props, context) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        React App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Layout = (props, context) => {
  const { t } = context;
  const { children, location, onSubmit } = props;
  const isLoginPage = location.pathname === '/login'
  const classes = useStyles();
  const lang = useSelector(store => store.i18nState.lang);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setLanguage(e.target.value))
  };

  return (
    <Container component="main" maxWidth="xs">
      <RadioGroup row aria-label="lang" name="lang" value={lang} onChange={handleChange}>
        <FormControlLabel value="tr" control={<Radio />} label="TR" />
        <FormControlLabel value="en" control={<Radio />} label="EN" />
      </RadioGroup>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t(isLoginPage ? 'login' : 'register')}
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          {children}
          <Grid container>
            <Grid item>
              <Link href={isLoginPage ? '/register' : '/login'} variant="body2">
                {t(isLoginPage ? 'noAccount' : 'haveAccount')}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

Layout.contextTypes = {
  t: PropTypes.func.isRequired
};

export default withRouter(Layout);