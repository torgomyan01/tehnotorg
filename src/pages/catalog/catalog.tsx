import React, { useEffect, useState } from 'react';
import ContentSite from '../../features/content/contnet-site';
import './catalog.css';
import {
    changeIndex,
    keyRandom,
    NextSlide,
    startSliderWorking
} from '../../utils/helper';
import { classes } from '../../utils/consts';
import SliderItem from './slider-item';
import { GetProducts } from './api';
import { useSelector } from 'react-redux';

function CatalogPage() {
    const userInfo = useSelector(
        (state: IStateUser) => state.userInfo.userInfo
    );
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        if (userInfo?.country) {
            startSliderWorking();
            changeIndex(0);

            GetProducts(userInfo.country, userInfo.id)
                .then(({ data }) => {
                    console.log(data);
                    setProducts(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [userInfo]);

    useEffect(() => {
        startSliderWorking();
        changeIndex(0);
    }, [products]);

    return (
        <ContentSite navbar={true}>
            <div className="slider-block">
                <button
                    className="btn btn-sliders"
                    onClick={() => NextSlide(classes.prev)}>
                    <i className="fa-regular fa-chevron-left" />
                </button>
                <div className="slider-body">
                    {products.map((e: IProduct, index) => {
                        return (
                            <SliderItem
                                key={keyRandom(5)}
                                item={e}
                                _index={index + 1}
                            />
                        );
                    })}
                </div>
                <button
                    className="btn btn-sliders"
                    onClick={() => NextSlide(classes.next)}>
                    <i className="fa-regular fa-chevron-right" />
                </button>
            </div>
        </ContentSite>
    );
}

export default CatalogPage;
