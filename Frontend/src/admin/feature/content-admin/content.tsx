import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { keyRandom } from '../../../utils/helper';
import {
    Alert,
    AlertColor,
    Avatar,
    Backdrop,
    CircularProgress,
    Snackbar
} from '@mui/material';
import { URL_SITE, userStatuses } from '../../../utils/consts';
import {
    Link,
    useLocation,
    useNavigate,
    useNavigation
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { updateUserInfo } from '../../../app/user';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}));

function AdminContent({
    children,
    pageLoading,
    pageLoadingClose,
    alert,
    alertClose
}: {
    children: any;
    pageLoading: boolean;
    pageLoadingClose: () => void;
    alert: {
        open: boolean;
        message: string;
        status: AlertColor | undefined;
    };
    alertClose: () => void;
}) {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const location = useLocation();
    const theme = useTheme();
    const [open, setOpen] = useState<any>(false);
    const [pageName, setPageName] = useState<string>('Admin');

    const userInfo = useSelector(
        (state: IStateUser) => state.userInfo.userInfo
    );

    const menuAdmin: {
        name: string;
        icon: any;
        url: string;
        success: boolean;
    }[] = [
        {
            name: 'Перейти на сайт',
            icon: <i className="fa-regular fa-sidebar" />,
            url: URL_SITE.HOME,
            success: true
        },
        {
            name: 'Пользователи',
            icon: <i className="fa-solid fa-users" />,
            url: URL_SITE.ADMIN,
            success: userInfo?.status === userStatuses.superUser
        },
        {
            name: 'Создать Пользователя',
            icon: <i className="fa-solid fa-user-plus" />,
            url: URL_SITE.CREATE_USER,
            success: userInfo?.status === userStatuses.superUser
        },
        {
            name: 'Товары',
            icon: <i className="fa-regular fa-square-this-way-up" />,
            url: URL_SITE.VIEW_PRODUCTS,
            success:
                userInfo?.status === userStatuses.terminal ||
                userInfo?.status === userStatuses.superUser
        },
        {
            name: 'Добавить товар',
            icon: <i className="fa-solid fa-circle-plus" />,
            url: URL_SITE.CREATE_PRODUCT,
            success:
                userInfo?.status === userStatuses.terminal ||
                userInfo?.status === userStatuses.superUser
        }
    ];

    useEffect(() => {
        const obj = menuAdmin?.find(
            (e) => e.url && e.url === location.pathname
        );
        if (obj) {
            setPageName(obj.name);
        }
    }, [location]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function Logout(e: any) {
        e.preventDefault();
        removeCookie('user');
        dispatch(updateUserInfo(null));
        navigation(URL_SITE.HOME);
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <MuiAppBar
                    style={{
                        transition: theme.transitions.create(
                            ['margin', 'width'],
                            {
                                easing: theme.transitions.easing.sharp,
                                duration:
                                    theme.transitions.duration.leavingScreen
                            }
                        ),
                        ...(open && {
                            width: `calc(100% - ${drawerWidth}px)`,
                            marginLeft: `${drawerWidth}px`,
                            transition: theme.transitions.create(
                                ['margin', 'width'],
                                {
                                    easing: theme.transitions.easing.easeOut,
                                    duration:
                                        theme.transitions.duration
                                            .enteringScreen
                                }
                            )
                        })
                    }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}>
                            <i className="fa-solid fa-bars" />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {pageName}
                        </Typography>
                    </Toolbar>
                </MuiAppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box'
                        }
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? (
                                <i className="fa-solid fa-chevron-left" />
                            ) : (
                                <i className="fa-solid fa-chevron-right" />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {menuAdmin.map(
                            (text) =>
                                text.success && (
                                    <Link
                                        to={text.url}
                                        key={keyRandom(5)}
                                        style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {text.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={text.name}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                )
                        )}
                        <Link
                            to="#"
                            key={keyRandom(5)}
                            onClick={Logout}
                            style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <i className="fa-regular fa-arrow-right-from-bracket" />
                                    </ListItemIcon>
                                    <ListItemText primary={'Выход'} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <main
                    style={{
                        width: `calc(100% - ${drawerWidth}px)`,
                        flexGrow: 1,
                        padding: theme.spacing(3),
                        transition: theme.transitions.create('margin', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen
                        }),
                        marginLeft: `-${drawerWidth}px`,
                        ...(open && {
                            transition: theme.transitions.create('margin', {
                                easing: theme.transitions.easing.easeOut,
                                duration:
                                    theme.transitions.duration.enteringScreen
                            }),
                            marginLeft: 0
                        })
                    }}>
                    <DrawerHeader />
                    {children}
                </main>
            </Box>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backdropFilter: 'blur(5px)'
                }}
                open={pageLoading}
                onClick={pageLoadingClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={alert.open}
                autoHideDuration={6000}
                onClose={alertClose}>
                <Alert
                    onClose={alertClose}
                    severity={alert.status || 'success'}
                    sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default AdminContent;
