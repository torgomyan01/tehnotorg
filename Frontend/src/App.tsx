import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/home';
import { URL_SITE, userStatuses, userTypes } from './utils/consts';
import LoginPage from './pages/login/login';
import About from './pages/about/about';
import RegisterPage from './pages/register/register';
import CatalogPage from './pages/catalog/catalog';
import CatalogForTerminal from './pages/catalog-for-terminal/catalog-for-terminal';
import BuyPage from './pages/buy/buy';
import Product from './pages/product-page/product';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from './app/user';
import AdminHome from './admin/pages/home/admin-home';
import CreateProduct from './admin/pages/create-product/create-product';
import CreateUser from './admin/pages/create-user/create-user';
import Products from './admin/pages/products/products';
import PageNotFound from './pages/404/404';

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const userInfo = useSelector(
        (state: IStateUser) => state.userInfo.userInfo
    );
    const [cookies] = useCookies(['user']);
    useEffect(() => {
        if (cookies.user) {
            dispatch(updateUserInfo(cookies.user));
        }
    }, [cookies]);

    return (
        <div>
            <Routes>
                {Object.values(URL_SITE).some((url) =>
                    location.pathname.includes(url)
                ) ? (
                    <>
                        <Route path={URL_SITE.HOME} element={<Home />} />
                        <Route path={URL_SITE.LOGIN} element={<LoginPage />} />
                        <Route path={URL_SITE.ABOUT} element={<About />} />
                        <Route
                            path={URL_SITE.REGISTER}
                            element={<RegisterPage />}
                        />
                        <Route
                            path={URL_SITE.CATALOG}
                            element={
                                userInfo?.status === userTypes.user ? (
                                    <CatalogPage />
                                ) : (
                                    <CatalogForTerminal />
                                )
                            }
                        />
                        <Route
                            path={`${URL_SITE.PRODUCT}/:id`}
                            element={<Product />}
                        />
                        <Route path={URL_SITE.BUY} element={<BuyPage />} />

                        {cookies.user &&
                        userInfo?.status !== userStatuses.user ? (
                            <>
                                <Route
                                    path={URL_SITE.ADMIN}
                                    element={<AdminHome />}
                                />
                                <Route
                                    path={URL_SITE.CREATE_PRODUCT}
                                    element={<CreateProduct />}
                                />
                                <Route
                                    path={URL_SITE.CREATE_USER}
                                    element={<CreateUser />}
                                />
                                <Route
                                    path={URL_SITE.VIEW_PRODUCTS}
                                    element={<Products />}
                                />
                            </>
                        ) : (
                            <Route path="*" element={<PageNotFound />} />
                        )}
                    </>
                ) : (
                    <Route path="*" element={<PageNotFound />} />
                )}
            </Routes>
        </div>
    );
}

export default App;
