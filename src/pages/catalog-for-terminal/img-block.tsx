import React, { useState } from 'react';
import { Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { URL_SITE } from '../../utils/consts';
import { getImgPath } from '../../utils/helper';

interface IProps {
    info: IProduct;
}

function ImgBlock({ info }: IProps) {
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    return (
        <div className="col-6 mb-5">
            <Link to={`${URL_SITE.PRODUCT}/${info.productInfo.id}`}>
                <div>
                    <div className="img-block-catalog-terminal">
                        <img
                            src={getImgPath(info.images[0]?.url)}
                            alt=""
                            className={imageLoading ? '' : 'd-none'}
                            onLoad={() => {
                                setImageLoading(true);
                            }}
                        />
                        {!imageLoading && (
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height="100%"
                            />
                        )}
                    </div>
                    <div className="mt-3">
                        <div className="c-black">
                            <b>Код товара:</b>{' '}
                            <span className="c-red fw-bold">
                                {info.productInfo.id}
                            </span>
                        </div>
                        <div className="c-black">
                            <b className="c-black">Наименование:</b>{' '}
                            {info.productInfo.name}
                        </div>
                        <div>
                            <b className="c-black">Цена:</b>{' '}
                            <span className="c-green fw-bold">
                                {info.address[0]?.price}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ImgBlock;
