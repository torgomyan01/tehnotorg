import React, { useEffect, useState } from 'react';
import ContentSite from '../../features/content/contnet-site';
import './catalog-for-terminal.css';
import { URL_SITE, userStatuses } from '../../utils/consts';
import logoSite from '../../access/images/logo-site.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ImgBlock from './img-block';
import { audio, keyRandom, printUserAddress } from '../../utils/helper';
import { useSelector } from 'react-redux';
import { SearchProduct, GetProductsTerminal } from './terminal-cataloc-api';
import { Backdrop, CircularProgress } from '@mui/material';

// const products = Array.from({ length: 20 }).map((e, index) => {
//     return {
//         url: `https://source.unsplash.com/random/600x400?sig=${index + 1}`,
//         codeProduct: Math.floor(Math.random() * 999),
//         price: Math.floor(Math.random() * 10000)
//     };
// });

const IndexTypes = {
    plus: 'plus',
    minus: 'minus'
};

function CatalogForTerminal() {
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = useSelector(
        (state: IStateUser) => state.userInfo.userInfo
    );
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [index, detIndex] = useState<number>(0);

    useEffect(() => {
        if (location.pathname.includes(URL_SITE.CATALOG)) {
            audio.src = 'audios/write-code-product.mp3';
            audio.play();
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        getProductsApi();
    }, [userInfo]);

    function getProductsApi() {
        if (userInfo?.country) {
            GetProductsTerminal(userInfo.country, userInfo.id)
                .then(({ data }) => {
                    setProducts(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }

    function changeIndex(status: string) {
        if (status === IndexTypes.plus) {
            if (index < products.length) {
                detIndex(index + 2);
            }
        } else {
            if (index > 0) {
                detIndex(index - 2);
            }
        }
    }

    function ChangeInput(e: any) {
        const code = e.target.value;
        if (+code) {
            SearchProduct(code)
                .then(({ data }: { data: IProduct[] }) => {
                    if (data.length) {
                        setTimeout(() => {
                            audio.src = 'audios/go-next.mp3';
                            audio.play();
                        }, 1000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        localStorage.setItem('searchValue', code);
        if (e.key !== 'Enter') {
            if (
                (e.key !== 'Backspace' &&
                    !isNaN(code[code.length - 1]) &&
                    e.key === '0') ||
                e.key === '1' ||
                e.key === '2' ||
                e.key === '3' ||
                e.key === '4' ||
                e.key === '5' ||
                e.key === '6' ||
                e.key === '7' ||
                e.key === '8' ||
                e.key === '9'
            ) {
                audio.src = `audios/audio-${code[code.length - 1]}.mp3`;
                audio.play();
            }
            if (e.key === 'Backspace') {
                audio.src = 'audios/delete.mp3';
                audio.play();
            }
        }
        if (code === '') {
            getProductsApi();
        }
    }

    function getProducts(e: any) {
        e.preventDefault();
        audio.src = 'audios/audio-enter.mp3';
        audio.play();

        const value = e.target.searchInput.value;
        if (+value) {
            setLoading(true);
            SearchProduct(value)
                .then(({ data }: { data: IProduct[] }) => {
                    if (data.length) {
                        navigate(
                            `${URL_SITE.PRODUCT}/${data[0].productInfo.id}`
                        );
                    } else {
                        setProducts(data);
                        setTimeout(() => {
                            audio.src = 'audios/no-searching-product.mp3';
                            audio.play();
                        }, 1000);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        } else {
            SearchProduct(value)
                .then(({ data }) => {
                    setProducts(data);
                    if (!data.length) {
                        setTimeout(() => {
                            audio.src = 'audios/no-searching-product.mp3';
                            audio.play();
                        }, 1000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <ContentSite navbar={false} shadow={false}>
            <div className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={URL_SITE.HOME} className="logo">
                        <img src={logoSite} alt="Logo site" />
                    </Link>
                    <button className="btn btn-primary h-auto d-none d-md-block">
                        <i className="fa-light fa-square-list me-2" />
                        Каталог
                    </button>
                    <div>
                        <div>Терминал: {userInfo?.name}</div>
                        <div>Адрес: {printUserAddress(userInfo)}</div>
                    </div>
                </div>
                <form
                    action="#"
                    onSubmit={getProducts}
                    className="search-block mt-4">
                    <input
                        type="text"
                        autoFocus={true}
                        name="searchInput"
                        onKeyUp={ChangeInput}
                        defaultValue={localStorage.getItem('searchValue') || ''}
                        placeholder="Введите код товара и нажмите поиск"
                    />
                    <button type="submit" className="btn">
                        <i className="fa-solid fa-magnifying-glass" />
                    </button>
                </form>
                <div className="d-flex justify-content-center align-items-center my-3">
                    <button
                        className="btn border-0"
                        disabled={index <= 0}
                        style={{
                            transform: 'rotate(-90deg)',
                            opacity: products.length
                        }}>
                        <i
                            className="fa-solid fa-angles-right text-primary fs-1"
                            onClick={() => changeIndex(IndexTypes.minus)}
                        />
                    </button>
                </div>
                <div className="row mt-4">
                    {products.length ? (
                        products.map((e, _index) => {
                            if (_index >= index && _index <= index + 3) {
                                return <ImgBlock key={keyRandom(5)} info={e} />;
                            }
                        })
                    ) : (
                        <h1 className="text-center">
                            Товар не найден, повторите ввод кода товара
                        </h1>
                    )}
                </div>
                <div className="d-flex justify-content-center align-items-center my-3">
                    <button
                        className="btn border-0"
                        style={{
                            transform: 'rotate(90deg)',
                            opacity: products.length
                        }}
                        onClick={() => changeIndex(IndexTypes.plus)}
                        disabled={index > products.length - 5}>
                        <i className="fa-solid fa-angles-right text-primary fs-1" />
                    </button>
                </div>
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

export default CatalogForTerminal;
