import React from 'react';
import './home.css';
import ContentSite from '../../features/content/contnet-site';
import logo from '../../access/images/logo-site.png';
import { Link } from 'react-router-dom';
import { URL_SITE, userStatuses, userTypes } from '../../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { updateUserInfo } from '../../app/user';

function Home() {
    const dispatch = useDispatch();
    const userInfo = useSelector(
        (state: IStateUser) => state.userInfo.userInfo
    );
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    function Logout() {
        removeCookie('user');
        dispatch(updateUserInfo(null));
    }

    return (
        <ContentSite navbar={false}>
            <div className="d-flex ps-3 position-absolute">
                <img src={logo} alt="Logo site" />
            </div>

            <div className="home-content">
                {userInfo ? (
                    <div className="d-flex justify-content-center mt-5">
                        <button
                            className="btn def-btn rounded-4"
                            onClick={Logout}
                            style={{ width: 200 }}>
                            Выход
                        </button>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center mt-5">
                        <Link to={URL_SITE.LOGIN}>
                            <button
                                className="btn def-btn rounded-4"
                                style={{ width: 200 }}>
                                Авторизация
                            </button>
                        </Link>
                    </div>
                )}

                {userInfo && userInfo?.status !== userStatuses.user && (
                    <div className="d-flex justify-content-center mt-3">
                        <Link to={URL_SITE.ADMIN}>
                            <button
                                className="btn def-btn rounded-4"
                                style={{ width: 200 }}>
                                Админ
                            </button>
                        </Link>
                    </div>
                )}

                {userInfo && (
                    <div className="d-flex justify-content-center mt-3">
                        <Link to={URL_SITE.CATALOG}>
                            <button
                                className="btn def-btn rounded-4"
                                style={{ width: 200 }}>
                                Каталог
                            </button>
                        </Link>
                    </div>
                )}

                <div className="d-flex justify-content-center mt-3">
                    <Link to={URL_SITE.ABOUT}>
                        <button
                            className="btn def-btn rounded-4"
                            style={{ width: 200 }}>
                            О нас
                        </button>
                    </Link>
                </div>
            </div>
        </ContentSite>
    );
}

export default Home;
