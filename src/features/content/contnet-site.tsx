import React from 'react';
import st from './content-site.module.css';
import logoSite from '../../access/images/logo-site.png';
import footerPays from '../../access/images/footer-pays.png';
import vk from '../../access/images/vk.png';
import fb from '../../access/images/fb.png';
import ok from '../../access/images/ok.png';
import { Link } from 'react-router-dom';
import { URL_SITE } from '../../utils/consts';
import { useSelector } from 'react-redux';

interface ThisProps {
    children: any;
    navbar: boolean;
    shadow?: boolean;
}

function ContentSite({ children, navbar, shadow = true }: ThisProps) {
    const userInfo = useSelector(
        (state: IStateUser) => state.userInfo.userInfo
    );

    return (
        <div className={st.siteContent}>
            <div className={st.navSolid} />
            <div className="container">
                {navbar && (
                    <nav className={st.navbar}>
                        <Link to={URL_SITE.HOME} className="logo">
                            <img src={logoSite} alt="Logo site" />
                        </Link>
                        <Link to={URL_SITE.HOME}>
                            <button className="btn def-btn ms-3 ms-sm-5">
                                Главная
                            </button>
                        </Link>
                        <Link to={URL_SITE.ABOUT}>
                            <button className="btn def-btn ms-3 ms-sm-5">
                                О нас
                            </button>
                        </Link>
                        {!userInfo && (
                            <Link to={URL_SITE.LOGIN}>
                                <button className="btn def-btn ms-3 ms-sm-5">
                                    Авторизация
                                </button>
                            </Link>
                        )}

                        {userInfo && (
                            <div className="ms-3 d-flex justify-content-start align-items-center">
                                <i className="fa-sharp fa-solid fa-location-dot c-blue me-2 fs-3" />
                                <div>
                                    <div>
                                        <b>Вы вошли как:</b> {userInfo.name}
                                    </div>
                                    <div>
                                        <b>Ваш Город:</b> {userInfo.country}
                                    </div>
                                </div>
                            </div>
                        )}
                    </nav>
                )}

                <div
                    className={st.content}
                    style={{
                        boxShadow: shadow
                            ? '0 1px 24px rgba(0, 0, 0, 0.8)'
                            : 'unset'
                    }}>
                    {children}
                </div>
            </div>

            <footer className={st.footer}>
                <h1 className="text-center text-white fs-5">
                    2015-2022 @ TehnoTORG - передовой интернет- магазин по
                    подбору цифровой электроники. <br />
                    Все права защищены.Доставка по всей Росссии. <br />
                    <a
                        href="privace-police.pdf"
                        target="_blank"
                        className="c-white">
                        Пользовательское соглашение.
                    </a>{' '}
                    <br />
                </h1>
                {/*<div className="d-flex justify-content-center align-items-center flex-column flex-lg-row mt-4 position-relative">*/}
                {/*    <img src={footerPays} alt="Footer Pays" />*/}
                {/*    <div className={st.footerSoc}>*/}
                {/*        <div className="d-flex justify-content-center align-items-center">*/}
                {/*            <img src={vk} alt="vkontakte" />*/}
                {/*        </div>*/}
                {/*        <div className="d-flex justify-content-center align-items-center mt-2">*/}
                {/*            <img src={fb} alt="fb" className="me-2" />*/}
                {/*            <img src={ok} alt="ok" />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </footer>
        </div>
    );
}

export default ContentSite;
