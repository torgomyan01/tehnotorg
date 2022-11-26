import React, { useEffect, useRef, useState } from 'react';
import './product.css';
import ContentSite from '../../features/content/contnet-site';
import {
    audio,
    getImgPath,
    keyRandom,
    printUserAddress
} from '../../utils/helper';

import { Backdrop, Button, CircularProgress } from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { URL_SITE, userStatuses } from '../../utils/consts';
import logoSite from '../../access/images/logo-site.png';
import { useSelector } from 'react-redux';
import { GetProduct } from './priduct-page-api';
import defaultImage from '../../access/images/default-image.png';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function Product() {
    const userInfo = useSelector(
        (state: IStateUser) => state.userInfo.userInfo
    );
    const { id }: any = useParams();
    const navigate = useNavigate();
    const local = useLocation();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [viewerPhoto, setViewerPhoto] = useState<string>(defaultImage);

    function changeImg(url: string) {
        setViewerPhoto(url);
    }

    const intervalSlider = setInterval(() => {
        if (product) {
            const index = [...product.images].findIndex(
                (img) => img.url === viewerPhoto
            );
            if (product.images[index + 1]) {
                setViewerPhoto(product.images[index + 1].url);
            } else {
                setViewerPhoto(product.images[0].url);
            }
            clearInterval(intervalSlider);
        }
    }, 5000);

    useEffect(() => {
        Voice();
        goToBack();
    }, []);

    useEffect(() => {
        setLoading(true);
        GetProduct(id)
            .then(({ data }: { data: IProduct }) => {
                setProduct(data);
                setViewerPhoto(data.images[0].url || defaultImage);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, [id]);

    let count = 1;
    function Voice() {
        let timeout: any;
        document.onmousemove = function () {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                if (local.pathname.includes(URL_SITE.PRODUCT)) {
                    if (count <= 5) {
                        audio.src = 'audios/select-your-check.mp3';
                        audio.play();
                        count++;
                    } else {
                        navigate(URL_SITE.CATALOG);
                        count = 1;
                        document.onmousemove = (ev) => {
                            console.log('old page');
                        };
                    }
                }
            }, 60000);
        };
    }
    const productBody = useRef<any>(null);

    function goToBack() {
        window.addEventListener('keyup', function (e: any) {
            if (window.location.pathname.includes(URL_SITE.PRODUCT)) {
                if (e.key === 'Backspace') {
                    navigate(URL_SITE.CATALOG);
                }
                if (e.key === 'Enter') {
                    navigate(URL_SITE.BUY);
                }
            }
        });
    }

    return (
        <ContentSite navbar={false}>
            <div className="d-flex justify-content-between align-items-center p-3">
                <Link to={URL_SITE.HOME} className="logo">
                    <img src={logoSite} alt="Logo site" />
                </Link>
                <div>
                    <div>Терминал: {userInfo?.name}</div>
                    <div>Адрес: {printUserAddress(userInfo)}</div>
                </div>
            </div>
            <div className="row p-3" ref={productBody}>
                <div className="col-12 col-md-7 d-flex justify-content-between align-items-start flex-column flex-md-row flex-column-reverse flex-md-row">
                    <div className="d-flex justify-content-start align-items-start flex-row flex-md-column im-block-product">
                        {product?.images.map((e) => {
                            return (
                                <img
                                    key={keyRandom(5)}
                                    src={getImgPath(e.url)}
                                    width={100}
                                    onClick={() => changeImg(e.url)}
                                    alt="Product1"
                                    className={`mb-0 mb-md-2 me-2 me-md-0 cursor-pointer ${
                                        viewerPhoto === e.url
                                            ? 'active-product-img'
                                            : ''
                                    }`}
                                />
                            );
                        })}
                    </div>
                    <div className="max-img-block">
                        <Zoom>
                            <img
                                alt={product?.productInfo.name}
                                src={getImgPath(viewerPhoto) || defaultImage}
                                style={{ objectFit: 'contain' }}
                                height="500"
                            />
                        </Zoom>
                    </div>
                </div>
                <div className="col-12 col-md-5">
                    <h3 className="mt-3 mt-md-0">
                        Код товара:{' '}
                        <span className="c-red">{product?.productInfo.id}</span>
                    </h3>

                    <p>Наименование товара: {product?.productInfo.name}</p>

                    <p>
                        Цена:{' '}
                        <span className="c-green fw-bold">
                            {product?.address[0]?.price}
                        </span>
                    </p>

                    <div className="d-flex justify-content-start align-items-center mt-4">
                        <Link to={URL_SITE.BUY}>
                            <Button variant="contained" color="warning">
                                <i className="fa-solid fa-cart-shopping me-2" />
                                Подтвердить
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mt-3 p-3">
                <div className="fw-bold">Описание:</div>
                <p>{product?.productInfo.description}</p>
            </div>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backdropFilter: 'blur(5px)'
                }}
                open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </ContentSite>
    );
}

export default Product;
