import React, { useState, useEffect, useRef } from "react";
import { setAuthInfo } from "../../../redux/auth/actions";
import { useSelector, useDispatch } from 'react-redux';
import { toastr } from "react-redux-toastr";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Layout from '../Layout'
import { useStyles } from '../data'
import Loading from "../../../components/Loading";

const Login = (props, context) => {
  const { t } = context;
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector(store => store.auth.users);
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)

  const onChangeForm = (e) => {
    const { name, value } = e.target;

    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) {
      setErrors(e => ({ ...e, [name]: '' }))
    }
  }

  const validate = () => {
    let anyErr = false;
    if (!form.username) {
      setErrors(e => ({ ...e, username: 'Kullanıcı Adı Girilmeli' }))
      anyErr = true;
    }
    if (!form.password) {
      setErrors(e => ({ ...e, password: 'Şifre Girilmeli' }))
      anyErr = true;
    }

    return anyErr;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      setLoading(false);
      return;
    } else {
      const check = users.filter(u => u.username === form.username && u.password === form.password);
      if (check.length) {
        dispatch(setAuthInfo(check[0]));
      } else {
        setLoading(false);
        toastr.error('Kontrol ediniz!', 'Kullanıcı adı ya da şifre hatalı lütfen kontrol ediniz!');
      }
    }
  }

  return <Layout onSubmit={onSubmit}>
    <Loading loading={loading}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        defaultValue={form.username}
        id="username"
        onChange={onChangeForm}
        label={t('username')}
        name="username"
        autoComplete="username"
        error={!!errors.username}
        helperText={errors.username}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        defaultValue={form.password}
        onChange={onChangeForm}
        name="password"
        label={t('password')}
        type="password"
        id="password"
        error={!!errors.password}
        helperText={errors.password}
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        onClick={onSubmit}
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {t('login')}
      </Button>
    </Loading>
  </Layout>
};

Login.contextTypes = {
  t: PropTypes.func.isRequired
};

export default withRouter(Login);
