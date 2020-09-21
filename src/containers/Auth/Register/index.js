import React, { useState, useEffect, useRef } from "react";
import { setAuthInfo, addUser } from "../../../redux/auth/actions";
import { useSelector, useDispatch } from 'react-redux';
import { toastr } from "react-redux-toastr";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Layout from "../Layout";
import { useStyles } from '../data'
import Loading from "../../../components/Loading";
import { SelectValue } from "../../../components/SelectValue";
import { generateToken } from "../../../helpers/utils";

const checkEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const Register = (props, context) => {
  const { t } = context;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: '', password: '', email: '', city: null, town: null })
  const [errors, setErrors] = useState({ username: '', password: '', email: '' })
  const [loading, setLoading] = useState(false);

  const { renderSelect: renderCity, selectedValue: selectedCity } = SelectValue(context, {
    fetchUrl: '/v1/cities',
    baseURL: 'https://il-ilce-rest-api.herokuapp.com',
    noParent: true,
    defValue: [form.city],
    divStyle: {paddingBottom: 10},
    label: 'il',
    mapper: e => ({
      value: e.id,
      label: e.name,
    }),
  });

  const { renderSelect: renderTown, selectedValue: selectedTown } = SelectValue(context, {
    fetchUrl: `/v1/cities/${form.city}/towns`,
    baseURL: 'https://il-ilce-rest-api.herokuapp.com',
    params: {
      data: { city: form.city },
      required: ['city'],
    },
    defValue: [form.town],
    label: 'İlçe',
    mapper: e => ({
      value: e._id,
      label: e.name,
    }),
  });


  //https://il-ilce-rest-api.herokuapp.com/v1/cities
  //https://il-ilce-rest-api.herokuapp.com/v1/cities/00772b2fb92df11ee3a090ab53c4e2ae/towns
  const onChangeForm = (e) => {
    const { name, value } = e.target;

    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) {
      setErrors(e => ({ ...e, [name]: '' }))
    }
  }


  const validEmail = () => {
    let anyErr = false;
    if (!form.email || !checkEmail(form.email)) {
      const errEmail = !form.email ? 'Eposta Girilmeli' : 'Geçerli bir eposta adresi girilmeli';
      setErrors(e => ({ ...e, email: errEmail }))
      anyErr = true;
    }
    return anyErr;
  }

  const validate = () => {
    let anyErr = false;
    if (!form.username) {
      setErrors(e => ({ ...e, username: 'Kullanıcı Adı Girilmeli' }))
      anyErr = true;
    }
    if (!form.password || form.length < 5) {
      const err = !form.password ? 'Şifre Girilmeli' : 'Şifre en az 5 karakter olmalı';
      setErrors(e => ({ ...e, password: err }))
      anyErr = true;
    }
    anyErr = validEmail();

    return anyErr;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      setLoading(false);
      return;
    } else {
      const user = { ...form, token: generateToken() };
      dispatch(addUser(user));
      dispatch(setAuthInfo(user));
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
        autoFocus
        error={!!errors.username}
        helperText={errors.username}
      />
      {renderCity()}
      {renderTown()}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        defaultValue={form.email}
        onChange={onChangeForm}
        id="email"
        onBlur={() => { validEmail() }}
        label={t('email')}
        name="email"
        autoComplete="email"
        error={!!errors.email}
        helperText={errors.email}
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
        autoComplete="current-password"
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={onSubmit}
      >
        {t('register')}
      </Button>
    </Loading>
  </Layout >;
};

Register.contextTypes = {
  t: PropTypes.func.isRequired
};

export default withRouter(Register);
