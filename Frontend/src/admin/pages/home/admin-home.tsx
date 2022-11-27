import React, { useCallback, useEffect, useState } from 'react';
import AdminContent from '../../feature/content-admin/content';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from '@mui/material';
import { keyRandom } from '../../../utils/helper';
import { ChangeUserInfo, GetUsers, RemoveUser } from './admin-home-api';
import moment from 'moment';
import 'moment/locale/ru';
import { alertMessages, defAlert, userStatuses } from '../../../utils/consts';
moment.locale('ru');

const tableCount = 10;

function AdminHome() {
    const [pagination, setPagination] = useState(1);
    const [users, setUsers] = useState<IUserInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getUsers().then((res) => {
            console.log(res);
        });
    }, []);

    async function getUsers() {
        GetUsers()
            .then(({ data }) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    function closeLoading() {
        setLoading(false);
    }

    const [selectedUserForChange, setSelectedUserForChange] =
        useState<null | IUserInfo>(null);
    const [changeUserInfo, setChangeUserInfo] = useState<boolean>(false);
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState(defAlert);

    function CloseAlert() {
        setAlert(defAlert);
    }

    function openModalForChange(userInfo: IUserInfo) {
        setChangeUserInfo(true);
        setSelectedUserForChange(userInfo);
    }

    function changeUserInfoInputs(val: string, key: string) {
        const oldInfo: any = { ...selectedUserForChange };
        oldInfo[key] = val;
        setSelectedUserForChange(oldInfo);
    }

    const saveInfoUser = useCallback(() => {
        if (selectedUserForChange) {
            setSaveLoading(true);
            ChangeUserInfo({
                id: selectedUserForChange?.id,
                name: selectedUserForChange?.name,
                email_or_address: selectedUserForChange?.email_or_address,
                username: selectedUserForChange?.username,
                country: selectedUserForChange?.country,
                status: selectedUserForChange?.status,
                birthday: selectedUserForChange?.birthday,
                phone_number: selectedUserForChange?.phone_number
            })
                .then(({ data }) => {
                    setSaveLoading(false);
                    if (data) {
                        const oldUsers = [...users].map((user: IUserInfo) => {
                            if (user.id === selectedUserForChange.id) {
                                user.name = selectedUserForChange.name;
                                user.email_or_address =
                                    selectedUserForChange.email_or_address;
                                user.username = selectedUserForChange.username;
                                user.status = selectedUserForChange.status;
                                user.country = selectedUserForChange.country;
                                user.birthday = selectedUserForChange.birthday;
                                user.phone_number =
                                    selectedUserForChange.phone_number;
                            }
                            return user;
                        });
                        setUsers(oldUsers);
                        setChangeUserInfo(false);
                        setAlert({
                            open: true,
                            message: alertMessages.userInfoSaved
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setSaveLoading(false);
                });
        }
    }, [selectedUserForChange]);

    function _removeUser(id: string | number) {
        RemoveUser({
            id
        }).then(({ data }) => {
            if (data) {
                const oldUsers = [...users].filter(
                    (user: IUserInfo) => user.id !== id
                );
                setUsers(oldUsers);
                setChangeUserInfo(false);
                setAlert({
                    open: true,
                    message: alertMessages.userRemoved
                });
            }
        });
    }

    return (
        <AdminContent
            pageLoading={loading}
            pageLoadingClose={closeLoading}
            alert={alert}
            alertClose={CloseAlert}>
            {users.length ? (
                <>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer component={Paper}>
                            <Table
                                stickyHeader
                                sx={{ minWidth: 1200 }}
                                aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <b>Имя</b>
                                        </TableCell>
                                        <TableCell>
                                            <b>Логин</b>
                                        </TableCell>
                                        <TableCell>
                                            <b>Город</b>
                                        </TableCell>
                                        <TableCell>
                                            <b>E-Mail</b>
                                        </TableCell>
                                        <TableCell>
                                            <b>Дата рождения</b>
                                        </TableCell>
                                        <TableCell>
                                            <b>Статус</b>
                                        </TableCell>
                                        <TableCell>
                                            <b>Телефон</b>
                                        </TableCell>
                                        <TableCell>
                                            <b>Дата регистрации</b>
                                        </TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((row, index) => {
                                        if (
                                            index >=
                                                pagination * tableCount - 10 &&
                                            index <= pagination * tableCount
                                        ) {
                                            return (
                                                <TableRow
                                                    key={keyRandom(5)}
                                                    sx={{
                                                        '&:last-child td, &:last-child th':
                                                            {
                                                                border: 0
                                                            }
                                                    }}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row">
                                                        {row.username}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row">
                                                        {row.country}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row">
                                                        {row.email_or_address}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row">
                                                        {row.birthday}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row">
                                                        {row.status}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row">
                                                        {row.phone_number}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row">
                                                        {moment(
                                                            row.created_at
                                                        ).format('LL')}
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        scope="row">
                                                        <Tooltip
                                                            title="Изменить информацию пользователя"
                                                            placement="top">
                                                            <IconButton
                                                                color="primary"
                                                                style={{
                                                                    fontSize: 18
                                                                }}
                                                                onClick={() =>
                                                                    openModalForChange(
                                                                        row
                                                                    )
                                                                }
                                                                aria-label="upload picture"
                                                                component="button">
                                                                <i className="fa-regular fa-user-pen" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip
                                                            title={`Удалить пользователь ${row.name}`}
                                                            placement="top">
                                                            <IconButton
                                                                color="primary"
                                                                style={{
                                                                    fontSize: 18
                                                                }}
                                                                onClick={() =>
                                                                    _removeUser(
                                                                        row.id
                                                                    )
                                                                }
                                                                aria-label="upload picture"
                                                                component="button">
                                                                <i className="fa-solid fa-trash" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <Pagination
                            count={Math.floor(users.length / 10)}
                            color="secondary"
                            page={pagination}
                            onChange={(e, page) => setPagination(page)}
                        />
                    </div>
                </>
            ) : (
                <h1 className="text-center">No Users</h1>
            )}

            <Dialog
                open={changeUserInfo}
                onClose={() => setChangeUserInfo(false)}
                aria-labelledby="change-user-information"
                aria-describedby="change-user-information-text">
                <DialogTitle id="change-user-information">
                    Изменить информацию {selectedUserForChange?.name}
                </DialogTitle>
                <DialogContent>
                    <div className="row py-3">
                        <div className="col-6">
                            <TextField
                                label="Имя"
                                value={selectedUserForChange?.name}
                                variant="outlined"
                                fullWidth
                                onChange={(e) =>
                                    changeUserInfoInputs(e.target.value, 'name')
                                }
                            />
                        </div>
                        <div className="col-6">
                            <TextField
                                label="Логин"
                                value={selectedUserForChange?.username}
                                variant="outlined"
                                onChange={(e) =>
                                    changeUserInfoInputs(
                                        e.target.value,
                                        'username'
                                    )
                                }
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col-6">
                            <TextField
                                label="Город"
                                value={selectedUserForChange?.country}
                                variant="outlined"
                                fullWidth
                                onChange={(e) =>
                                    changeUserInfoInputs(
                                        e.target.value,
                                        'country'
                                    )
                                }
                            />
                        </div>
                        <div className="col-6">
                            <TextField
                                label="E-Mail"
                                value={selectedUserForChange?.email_or_address}
                                variant="outlined"
                                fullWidth
                                onChange={(e) =>
                                    changeUserInfoInputs(
                                        e.target.value,
                                        'email'
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col-6">
                            <TextField
                                label="Дата рождения"
                                value={selectedUserForChange?.birthday}
                                variant="outlined"
                                fullWidth
                                onChange={(e) =>
                                    changeUserInfoInputs(
                                        e.target.value,
                                        'birthday'
                                    )
                                }
                            />
                        </div>
                        <div className="col-6">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Статус
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedUserForChange?.status}
                                    label="Age"
                                    onChange={(e) =>
                                        changeUserInfoInputs(
                                            e.target.value,
                                            'status'
                                        )
                                    }>
                                    <MenuItem value={userStatuses.user}>
                                        User
                                    </MenuItem>
                                    <MenuItem value={userStatuses.terminal}>
                                        Terminal
                                    </MenuItem>
                                    <MenuItem value={userStatuses.superUser}>
                                        Super Admin
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col-12">
                            <TextField
                                label="Телефон"
                                value={selectedUserForChange?.phone_number}
                                variant="outlined"
                                fullWidth
                                onChange={(e) =>
                                    changeUserInfoInputs(
                                        e.target.value,
                                        'phone_number'
                                    )
                                }
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setChangeUserInfo(false)}>
                        Закрыт
                    </Button>
                    <Button onClick={saveInfoUser} variant="contained">
                        Сохранить информацию
                        {saveLoading && (
                            <CircularProgress className="ms-2" size={20} />
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </AdminContent>
    );
}

export default AdminHome;
