import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AlertColor, Button, Paper, TextField } from '@mui/material';
import { getImgPath, keyRandom } from '../../../utils/helper';
import AdminContent from '../../feature/content-admin/content';
import { alertMessages, defAlert } from '../../../utils/consts';
import './create-product.css';
import { CreateProducts } from './api';

export const ProductInfoBlock = ({ index }: { index: number }) => {
    return (
        <div>
            <hr />
            <div className="row mb-3">
                <div className="col-4">
                    <TextField
                        fullWidth
                        required
                        label="Адрес"
                        variant="outlined"
                        name={`table[address][${index}]`}
                    />
                </div>
                <div className="col-4">
                    <TextField
                        fullWidth
                        required
                        label="Город"
                        variant="outlined"
                        name={`table[country][${index}]`}
                    />
                </div>
                <div className="col-4">
                    <TextField
                        fullWidth
                        required
                        label="Цена"
                        variant="outlined"
                        name={`table[price][${index}]`}
                    />
                </div>
            </div>
            <div className="mb-3">
                <TextField
                    fullWidth
                    label="Комментарий"
                    variant="outlined"
                    name={`table[comment][${index}]`}
                />
            </div>
        </div>
    );
};

function CreateProduct() {
    const [loading, setLoading] = useState<boolean>(true);
    const [alert, setAlert] = useState<{
        open: boolean;
        message: string;
        status: AlertColor | undefined;
    }>(defAlert);
    const [images, setImages] = useState<any[]>([]);

    function CloseAlert() {
        setAlert(defAlert);
    }
    function closeLoading() {
        setLoading(false);
    }
    useEffect(() => {
        setLoading(false);
    }, []);

    function inputChange(e: any) {
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            const FR = new FileReader();

            FR.addEventListener('load', function (evt) {
                if (evt.target) {
                    const result = evt.target.result;
                    setImages((oldArray) => [
                        ...oldArray,
                        {
                            id: i,
                            url: result,
                            file: files[i]
                        }
                    ]);
                }
            });

            FR.readAsDataURL(files[i]);
        }
    }

    function RemoveImage(imageId: number) {
        const oldImages = [...images].filter((image) => image.id !== imageId);
        setImages(oldImages);
    }

    const crateProduct = useCallback(
        (e: any) => {
            const formData = new FormData(e.currentTarget);
            e.preventDefault();

            images.forEach((img) => {
                formData.append('files[]', img.file);
            });

            CreateProducts(formData)
                .then(({ data }) => {
                    if (data) {
                        setAlert({
                            open: true,
                            message: alertMessages.successProduct,
                            status: 'success'
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [images]
    );

    const [infoColumn, setInfoColumn] = useState<any[]>([
        <ProductInfoBlock index={0} key={keyRandom(10)} />
    ]);

    function addColumn() {
        setInfoColumn(
            infoColumn.concat(
                <ProductInfoBlock
                    index={infoColumn.length}
                    key={keyRandom(10)}
                />
            )
        );
    }

    return (
        <AdminContent
            pageLoading={loading}
            pageLoadingClose={closeLoading}
            alert={alert}
            alertClose={CloseAlert}>
            <form action="#" className="row" onSubmit={crateProduct}>
                <div className="col-12 col-lg-6">
                    <div className="row mb-3">
                        <div className="col-12">
                            <TextField
                                fullWidth
                                required
                                label="Имя товара"
                                variant="outlined"
                                name="name"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <TextField
                            fullWidth
                            required
                            label="Описание"
                            name="description"
                            multiline
                            rows={3}
                            variant="outlined"
                        />
                    </div>
                    {infoColumn}

                    <div
                        className="col-12 position-relative"
                        onClick={addColumn}>
                        <hr />
                        <div className="plus-table">
                            <i className="fa-solid fa-plus" />
                        </div>
                    </div>
                    <div className="mb-3 d-flex justify-content-between">
                        <Button variant="outlined" component="label">
                            <i className="fa-regular fa-image me-2" />
                            Выбрать картинку*
                            <input
                                accept="image/*"
                                multiple
                                required
                                onChange={inputChange}
                                type="file"
                                className="opacity-0"
                                style={{ width: 1 }}
                            />
                        </Button>
                        <Button variant="contained" type="submit">
                            Добавить
                        </Button>
                    </div>
                    <div className="mb-3">
                        <div className="row justify-content-start flex-wrap">
                            {images.map((img) => {
                                return (
                                    <div
                                        key={keyRandom(5)}
                                        className="col-12 col-sm-6 col-md-3 mb-3">
                                        <Paper
                                            className="position-relative"
                                            sx={{
                                                overflow: 'hidden',
                                                width: 200,
                                                height: 200
                                            }}>
                                            <img
                                                className="w-100 h-100"
                                                style={{ objectFit: 'cover' }}
                                                alt="img"
                                                src={img.url}
                                            />
                                            <div
                                                className="remove-image"
                                                onClick={() =>
                                                    RemoveImage(img.id)
                                                }>
                                                <i className="fa-solid fa-xmark" />
                                            </div>
                                        </Paper>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </form>
        </AdminContent>
    );
}

export default CreateProduct;
