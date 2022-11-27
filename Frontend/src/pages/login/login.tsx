import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    CircularProgress,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from '@mui/material';
import ContentSite from '../../features/content/contnet-site';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { alertMessages, URL_SITE } from '../../utils/consts';
import './login.css';
import { LoginUser } from './api';
import { useCookies } from 'react-cookie';

function LoginPage() {
    const navigation = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);
    const [userName, setUserName] = useState('');
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false
    });
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (cookies.user) {
            navigation(URL_SITE.HOME);
        }
    }, [cookies]);

    const [errorLogin, setErrorLogin] = useState<string | null>(null);

    const startLogin = useCallback(
        (e: any) => {
            e.preventDefault();
            setLoading(true);
            LoginUser({
                username: userName,
                password: values.password
            })
                .then(({ data }) => {
                    if (data) {
                        setCookie('user', JSON.stringify(data), { path: '/' });
                        setErrorLogin(null);
                    } else {
                        setErrorLogin(alertMessages.errorLoginUser);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                    setErrorLogin(alertMessages.errorLoginUser);
                });
        },
        [userName, values]
    );

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    return (
        <ContentSite navbar={true}>
            <div className="login-block">
                <Link to={URL_SITE.HOME}>
                    <div className="close">
                        <i className="fa-solid fa-xmark c-black" />
                    </div>
                </Link>
                <form action="#" onSubmit={startLogin}>
                    <div className="login-block-content">
                        <div className="fs-5">
                            <Link to={URL_SITE.HOME}>
                                <span className="btn bgc-grey-gradient py-0 me-2">
                                    <i className="fa-sharp fa-solid fa-arrow-left" />
                                </span>
                            </Link>
                            Войти с паролем
                        </div>
                        {errorLogin && (
                            <div className="mt-3">
                                <Alert severity="error">{errorLogin}</Alert>
                            </div>
                        )}
                        <div className="mt-4">
                            <FormControl className="w-100" variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Логин
                                </InputLabel>
                                <OutlinedInput
                                    type="text"
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end">
                                                <i className="fa-light fa-circle-question" />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </div>
                        <div className="mt-4">
                            <FormControl className="w-100" variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">
                                    пароль
                                </InputLabel>
                                <OutlinedInput
                                    type={
                                        values.showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end">
                                                {values.showPassword ? (
                                                    <i className="fa-solid fa-eye-slash fs-5" />
                                                ) : (
                                                    <i className="fa-sharp fa-solid fa-eye fs-5" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </div>
                        <div className="mt-3">
                            <NavLink to={URL_SITE.REGISTER} className="c-blue">
                                Зарегестрироваться
                            </NavLink>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn def-btn w-100 py-3 rounded-4"
                            disabled={!(userName && values.password)}>
                            Войти
                            {loading && (
                                <CircularProgress
                                    size={20}
                                    color="inherit"
                                    className="ms-2"
                                    style={{
                                        top: 3,
                                        position: 'relative'
                                    }}
                                />
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </ContentSite>
    );
}

export default LoginPage;
