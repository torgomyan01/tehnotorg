import React, { useEffect } from 'react';
import './buy.css';
import { Link, useNavigate } from 'react-router-dom';
import { URL_SITE, userStatuses } from '../../utils/consts';
import ContentSite from '../../features/content/contnet-site';
import logoSite from '../../access/images/logo-site.png';
import { useSelector } from 'react-redux';
import { audio, printUserAddress } from '../../utils/helper';

function BuyPage() {
    const navigate = useNavigate();
    const userInfo = useSelector(
        (state: IStateUser) => state.userInfo.userInfo
    );

    useEffect(() => {
        setTimeout(() => {
            audio.src = 'audios/by-qr-or-card.mp3';
            audio.play();
        }, 2000);
    }, []);

    let successBack = true;
    window.addEventListener('keyup', function (e: any) {
        if (window.location.pathname.includes(URL_SITE.BUY) && successBack) {
            if (e.keyCode === 32) {
                navigate(-1);
                successBack = false;
            }
        }
    });

    return (
        <ContentSite navbar={false} shadow={false}>
            <div
                className="login-block buy pb-5"
                style={{
                    maxWidth: 600,
                    height: 500,
                    margin: '1rem auto'
                }}>
                <div className="d-flex justify-content-between align-content-center">
                    <Link to={URL_SITE.HOME} className="logo">
                        <img src={logoSite} alt="Logo site" />
                    </Link>
                    <div>
                        <div>Терминал: {userInfo?.name}</div>
                        <div>Адрес: {printUserAddress(userInfo)}</div>
                    </div>
                </div>
                <div
                    className="d-flex justify-content-center mb-4"
                    style={{ marginTop: 80 }}>
                    <button
                        className="button-71"
                        role="button"
                        style={{ width: '21rem' }}>
                        <span>1</span>
                        По QR коду
                    </button>
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <button
                        className="button-71"
                        role="button"
                        style={{ width: '21rem' }}>
                        <span>2</span>
                        Банковской картой
                    </button>
                </div>
            </div>
        </ContentSite>
    );
}

export default BuyPage;
