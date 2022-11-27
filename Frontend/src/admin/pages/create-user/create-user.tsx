import React, { useCallback, useEffect, useState } from 'react';
import './create-user.css';
import {
    Alert,
    AlertColor,
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from '@mui/material';
import AdminContent from '../../feature/content-admin/content';
import {
    alertMessages,
    defAlert,
    months,
    userStatuses
} from '../../../utils/consts';
import { keyRandom, years } from '../../../utils/helper';
import { countries } from '../../../utils/all-counries';
import { RegisterUser, RegisterUserAdmin } from '../../../pages/register/api';
import { day, defVal } from '../../../pages/register/register';

function CreateUser() {
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [alert, setAlert] = useState<{
        open: boolean;
        message: string;
        status: AlertColor | undefined;
    }>(defAlert);

    function CloseAlert() {
        setAlert(defAlert);
    }
    function closeLoading() {
        setLoadingPage(false);
    }
    useEffect(() => {
        setLoadingPage(false);
    }, []);

    const [login, setLogin] = useState(defVal);
    const [catUser, setCatUser] = useState('');
    const [password, setPassword] = useState(defVal);
    const [name, setName] = useState(defVal);
    const [days, setDays] = useState(defVal);
    const [month, setMonth] = useState(defVal);
    const [year, setYear] = useState(defVal);
    const [country, setCountry] = useState(defVal);
    const [email, setEmail] = useState(defVal);
    const [numberTel, setNumberTel] = useState(defVal);

    const [countryCode, setCountryCode] = useState<{
        code: string;
        label: string;
        phone: string;
    } | null>({
        code: 'RU',
        label: 'Russian Federation',
        phone: '7'
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState<boolean>(false);

    const registerUser = useCallback(
        (e: any) => {
            e.preventDefault();
            const _login = checkVal(login);
            const _password = checkVal(password);
            const _name = checkVal(name);
            const _days = checkVal(days);
            const _month = checkVal(month);
            const _year = checkVal(year);
            const _country = checkVal(country);
            const _email = checkVal(email);
            const _numberTel = checkVal(numberTel);
            setLogin(_login);
            setPassword(_password);
            setName(_name);
            setDays(_days);
            setMonth(_month);
            setYear(_year);
            setCountry(_country);
            setEmail(_email);
            setNumberTel(_numberTel);

            const errors = [
                _login.err,
                _password.err,
                _name.err,
                _days.err,
                _month.err,
                _year.err,
                _country.err,
                _email.err,
                _numberTel.err
            ];

            if (errors.some((err) => err)) {
                return false;
            } else {
                setLoading(true);
                setErrors({});
                RegisterUserAdmin({
                    status: catUser,
                    name: _name.val,
                    username: _login.val,
                    password: _password.val,
                    country: _country.val,
                    email: _email.val,
                    birthday: `${_days.val} ${_month.val} ${_year.val}`,
                    phone_number: `+${countryCode?.phone} ${numberTel.val}`
                })
                    .then((res) => {
                        if (res.data === 1) {
                            setAlert({
                                open: true,
                                message: alertMessages.successCreatedUser,
                                status: 'success'
                            });
                        }
                        setLoading(false);
                    })
                    .catch((err) => {
                        setErrors(err.response.data.errors);
                        setLoading(false);
                    });
            }
        },
        [login, password, name, days, month, year, country, email, numberTel]
    );

    function checkVal({ val, err }: { val: string; err: boolean }) {
        return { val, err: !val };
    }

    return (
        <AdminContent
            pageLoading={loadingPage}
            pageLoadingClose={closeLoading}
            alert={alert}
            alertClose={CloseAlert}>
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="mb-3">
                        {errors &&
                            Object.values(errors).map((e: any) => {
                                return e.map((messages: string) => {
                                    return (
                                        <Alert
                                            key={keyRandom(5)}
                                            severity="error">
                                            {messages}
                                        </Alert>
                                    );
                                });
                            })}
                    </div>
                    <form action="#" onSubmit={registerUser}>
                        <div className="mt-3 row">
                            <div className="col-6">
                                <FormControl
                                    className="w-100"
                                    variant="outlined">
                                    <InputLabel>Логин</InputLabel>
                                    <OutlinedInput
                                        type="text"
                                        error={login.err}
                                        label="Логин"
                                        value={login.val}
                                        onChange={(e) =>
                                            setLogin({
                                                val: e.target.value,
                                                err: false
                                            })
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className="col-6">
                                <FormControl
                                    className="w-100"
                                    variant="outlined">
                                    <InputLabel>Пароль</InputLabel>
                                    <OutlinedInput
                                        type="password"
                                        error={password.err}
                                        label="Пароль"
                                        value={password.val}
                                        onChange={(e) =>
                                            setPassword({
                                                val: e.target.value,
                                                err: false
                                            })
                                        }
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="mt-3">
                            <FormControl className="w-100" variant="outlined">
                                <InputLabel>ФИО</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    error={name.err}
                                    label="ФИО"
                                    value={name.val}
                                    onChange={(e) =>
                                        setName({
                                            val: e.target.value,
                                            err: false
                                        })
                                    }
                                />
                            </FormControl>
                        </div>
                        <div className="mt-3 d-flex justify-content-between align-items-center">
                            <FormControl style={{ width: 200 }}>
                                <InputLabel>День</InputLabel>
                                <Select
                                    label="День"
                                    style={{ borderRadius: '5px 0 0 5px' }}
                                    value={days.val}
                                    error={days.err}
                                    onChange={(e) =>
                                        setDays({
                                            val: e.target.value,
                                            err: false
                                        })
                                    }>
                                    {day.map((e, index) => (
                                        <MenuItem
                                            key={keyRandom(5)}
                                            value={index + 1}>
                                            {index + 1}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Месяц</InputLabel>
                                <Select
                                    style={{ borderRadius: '0' }}
                                    value={month.val}
                                    error={month.err}
                                    label="Месяц"
                                    onChange={(e) =>
                                        setMonth({
                                            val: e.target.value,
                                            err: false
                                        })
                                    }>
                                    {months.map((e) => (
                                        <MenuItem key={keyRandom(5)} value={e}>
                                            {e}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Год</InputLabel>
                                <Select
                                    style={{ borderRadius: '0 5px 5px 0' }}
                                    value={year.val}
                                    error={year.err}
                                    label="year"
                                    onChange={(e) =>
                                        setYear({
                                            val: e.target.value,
                                            err: false
                                        })
                                    }>
                                    {years(30).map((e) => (
                                        <MenuItem key={keyRandom(5)} value={e}>
                                            {e}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="mt-3">
                            <div className="row">
                                <div className="col-6">
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Город</InputLabel>
                                        <OutlinedInput
                                            type="text"
                                            label="Город"
                                            value={country.val}
                                            error={country.err}
                                            onChange={(e) =>
                                                setCountry({
                                                    val: e.target.value,
                                                    err: false
                                                })
                                            }
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-6">
                                    <FormControl fullWidth>
                                        <InputLabel>
                                            Выбрать категория пользователь
                                        </InputLabel>
                                        <Select
                                            value={catUser}
                                            label="Выбрать категория пользователь"
                                            onChange={(e) =>
                                                setCatUser(e.target.value)
                                            }>
                                            <MenuItem value={userStatuses.user}>
                                                Простой пользователь
                                            </MenuItem>
                                            <MenuItem
                                                value={userStatuses.terminal}>
                                                Терминал пользователя
                                            </MenuItem>
                                            <MenuItem
                                                value={userStatuses.superUser}>
                                                Супер пользователь
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            {catUser === userStatuses.terminal ? (
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Адрес</InputLabel>
                                    <OutlinedInput
                                        type="text"
                                        label="address"
                                        value={email.val}
                                        error={email.err}
                                        onChange={(e) =>
                                            setEmail({
                                                val: e.target.value,
                                                err: false
                                            })
                                        }
                                    />
                                </FormControl>
                            ) : (
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>E-Mail</InputLabel>
                                    <OutlinedInput
                                        type="email"
                                        label="E-Mail"
                                        value={email.val}
                                        error={email.err}
                                        onChange={(e) =>
                                            setEmail({
                                                val: e.target.value,
                                                err: false
                                            })
                                        }
                                    />
                                </FormControl>
                            )}
                        </div>
                        <div className="mt-3 d-flex justify-content-start align-items-center">
                            <Autocomplete
                                style={{ width: 200 }}
                                options={countries}
                                autoHighlight
                                value={countryCode}
                                getOptionLabel={(option) => `+${option.phone}`}
                                sx={{
                                    // border: "1px solid blue",
                                    '& .MuiOutlinedInput-root': {
                                        // border: "1px solid yellow",
                                        borderRadius: '5px 0 0 5px'
                                    }
                                }}
                                renderOption={(props, option) => (
                                    <Box
                                        {...props}
                                        component="li"
                                        key={keyRandom(5)}
                                        sx={{
                                            '& > img': { mr: 2, flexShrink: 0 }
                                        }}>
                                        <img
                                            loading="lazy"
                                            width="20"
                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                            alt=""
                                        />
                                        +{option.phone}
                                    </Box>
                                )}
                                onChange={(e, value) => setCountryCode(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Выбрать код"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password' // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Номер Телефона
                                </InputLabel>
                                <OutlinedInput
                                    type="number"
                                    label="Номер Телефона"
                                    value={numberTel.val}
                                    error={numberTel.err}
                                    onChange={(e) =>
                                        setNumberTel({
                                            val: e.target.value,
                                            err: false
                                        })
                                    }
                                    style={{ borderRadius: '0 5px 5px 0' }}
                                />
                            </FormControl>
                        </div>
                        <div className="mt-4 d-flex justify-content-end">
                            <Button type="submit" variant="contained">
                                Создать
                                {loading && (
                                    <CircularProgress
                                        size={20}
                                        color="inherit"
                                        className="ms-2 mt-1"
                                    />
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminContent>
    );
}

export default CreateUser;
