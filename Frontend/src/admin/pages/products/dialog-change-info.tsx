import React, { useCallback, useEffect, useState } from 'react';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    TextField
} from '@mui/material';
import { getImgPath, keyRandom } from '../../../utils/helper';
import { CreateProducts } from '../create-product/api';
import { alertMessages } from '../../../utils/consts';
import {
    AddAddressProduct,
    ChangeInfoAddress,
    ChangeNameDesc,
    RemoveAddress,
    RemoveImageProduct,
    RenameProduct,
    UploadFileProduct
} from './products-api';

function ProductInfoBlockChange({
    index,
    address,
    removeAddress
}: {
    index: number;
    address: IProductAddress;
    removeAddress: (id: number | string) => void;
}) {
    const [_address, setAddress] = useState(address.address);
    const [_country, setCountry] = useState(address.country);
    const [_price, setPrice] = useState(address.price);
    const [_comment, setComment] = useState(address.comment);

    useEffect(() => {
        if (_address && _country && _price && _comment) {
            ChangeInfoAddress({
                id: address.id,
                address: _address,
                country: _country,
                price: _price,
                comment: _comment
            })
                .then(({ data }) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [_address, _country, _price, _comment]);

    return (
        <div>
            <div className="col-12 position-relative" style={{ marginTop: 35 }}>
                <hr />
                <div
                    className="plus-table"
                    onClick={() => removeAddress(address.id)}
                    style={{ right: 0, left: 'unset', transform: 'unset' }}>
                    <i className="fa-solid fa-xmark c-red" />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-4">
                    <TextField
                        fullWidth
                        required
                        value={_address}
                        onChange={(e) => setAddress(e.target.value)}
                        label="Адрес"
                        variant="outlined"
                        name={`table[address][${index}]`}
                    />
                </div>
                <div className="col-4">
                    <TextField
                        fullWidth
                        required
                        value={_country}
                        onChange={(e) => setCountry(e.target.value)}
                        label="Город"
                        variant="outlined"
                        name={`table[country][${index}]`}
                    />
                </div>
                <div className="col-4">
                    <TextField
                        fullWidth
                        required
                        value={_price}
                        onChange={(e) => setPrice(e.target.value)}
                        label="Цена"
                        variant="outlined"
                        name={`table[price][${index}]`}
                    />
                </div>
            </div>
            <div className="mb-3">
                <TextField
                    fullWidth
                    value={_comment}
                    onChange={(e) => setComment(e.target.value)}
                    label="Комментарий"
                    variant="outlined"
                    name={`table[comment][${index}]`}
                />
            </div>
        </div>
    );
}

interface Props {
    dialogChangeProduct: boolean;
    closeDialogChangeProduct: () => void;
    product: IProduct | null;
    changeAlert: ({
        open,
        message,
        status
    }: {
        open: boolean;
        message: string;
        status: string;
    }) => void;
}

function DialogChangeInfo({
    dialogChangeProduct,
    closeDialogChangeProduct,
    product,
    changeAlert
}: Props) {
    const [changesProduct, setChangesProduct] = useState<IProduct | null>(null);
    const [infoColumn, setInfoColumn] = useState<any[]>([]);
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        setChangesProduct(product);
    }, [product]);

    useEffect(() => {
        setInfoColumn(
            changesProduct
                ? changesProduct.address.map((e, index) => (
                      <ProductInfoBlockChange
                          index={index + 1}
                          address={e}
                          removeAddress={removeAddress}
                          key={keyRandom(10)}
                      />
                  ))
                : []
        );
    }, [changesProduct]);

    function removeAddress(address: string | number) {
        changeAlert({
            open: true,
            message: alertMessages.pleaseWait,
            status: 'warning'
        });
        RemoveAddress(address)
            .then(({ data }) => {
                changeAlert({
                    open: true,
                    message: alertMessages.addressDeleted,
                    status: 'success'
                });
                const _changesProduct: any = { ...changesProduct };
                _changesProduct.address = data;
                setChangesProduct(_changesProduct);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const [loadingUploading, setLoadingUploading] = useState<boolean>(false);
    function inputChange(e: any) {
        if (changesProduct) {
            setLoadingUploading(true);
            const files = e.target.files;
            const formData = new FormData();
            formData.append('product_id', `${changesProduct.productInfo.id}`);

            for (let i = 0; i < files.length; i++) {
                formData.append(`files[${i}]`, files[i]);
            }

            UploadFileProduct(formData)
                .then(({ data }) => {
                    const _oldProductImage: any = { ...changesProduct };
                    _oldProductImage.images = data;
                    setChangesProduct(_oldProductImage || []);
                    setLoadingUploading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoadingUploading(false);
                });
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
                        changeAlert({
                            open: true,
                            message: alertMessages.successProduct,
                            status: 'success'
                        });
                        setTimeout(() => {
                            setImages([]);
                        }, 5000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [images]
    );

    function removeOldImage(img: IProductImage, product_id: number | string) {
        RemoveImageProduct({ id: img.id, product_id })
            .then(({ data }: { data: any }) => {
                const _oldProductImage: any = { ...changesProduct };
                _oldProductImage.images = data;
                setChangesProduct(_oldProductImage || []);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const changeNameProduct = useCallback(
        (e: any) => {
            if (changesProduct && e.target.value) {
                RenameProduct({
                    id: changesProduct.productInfo.id,
                    value: e.target.value
                })
                    .then(({ data }) => {
                        if (data) {
                            changeAlert({
                                open: true,
                                message: alertMessages.nameProductChanges,
                                status: 'success'
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        [changesProduct]
    );

    const changeDescriptionProduct = useCallback(
        (e: any) => {
            if (changesProduct && e.target.value) {
                ChangeNameDesc({
                    id: changesProduct.productInfo.id,
                    value: e.target.value
                })
                    .then(({ data }) => {
                        if (data) {
                            changeAlert({
                                open: true,
                                message: alertMessages.descriptionSave,
                                status: 'success'
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        [changesProduct]
    );

    const [loadingAddressCreating, setLoadingAddressCreating] =
        useState<boolean>(false);

    const ArrAddress = useCallback(() => {
        if (changesProduct) {
            setLoadingAddressCreating(true);
            AddAddressProduct(changesProduct?.productInfo.id)
                .then(({ data }) => {
                    if (data) {
                        const _oldProductImage: any = { ...changesProduct };
                        _oldProductImage.address = data;
                        setChangesProduct(_oldProductImage || []);
                    }
                    setLoadingAddressCreating(false);
                })
                .catch(() => {
                    setLoadingAddressCreating(false);
                });
        }
    }, [changesProduct]);

    return (
        <Dialog open={dialogChangeProduct} onClose={closeDialogChangeProduct}>
            <DialogTitle id="alert-dialog-title">
                {changesProduct?.productInfo.name}
            </DialogTitle>
            <DialogContent style={{ width: 600 }}>
                {changesProduct && (
                    <form
                        action="#"
                        className="row pt-2"
                        onSubmit={crateProduct}>
                        <div className="col-12">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <TextField
                                        fullWidth
                                        required
                                        defaultValue={
                                            changesProduct?.productInfo.name
                                        }
                                        onChange={changeNameProduct}
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
                                    defaultValue={
                                        changesProduct?.productInfo.description
                                    }
                                    onChange={changeDescriptionProduct}
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
                                onClick={ArrAddress}>
                                <hr />
                                <div className="plus-table">
                                    {loadingAddressCreating ? (
                                        <CircularProgress size={10} />
                                    ) : (
                                        <i className="fa-solid fa-plus" />
                                    )}
                                </div>
                            </div>
                            <div className="mb-3 d-flex justify-content-between">
                                <Button variant="outlined" component="label">
                                    {loadingUploading ? (
                                        <CircularProgress
                                            size={15}
                                            className="me-2"
                                        />
                                    ) : (
                                        <i className="fa-regular fa-image me-2" />
                                    )}
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
                            </div>
                            <div className="mb-3">
                                <div className="row justify-content-start flex-wrap">
                                    {changesProduct?.images.map((img) => {
                                        return (
                                            <div
                                                key={keyRandom(5)}
                                                className="col-12 col-sm-4 mb-3">
                                                <Paper
                                                    className="position-relative"
                                                    sx={{
                                                        overflow: 'hidden',
                                                        width: 160,
                                                        height: 160
                                                    }}>
                                                    <img
                                                        className="w-100 h-100"
                                                        style={{
                                                            objectFit: 'cover'
                                                        }}
                                                        alt="img"
                                                        src={getImgPath(
                                                            img.url
                                                        )}
                                                    />
                                                    <div
                                                        className="remove-image"
                                                        onClick={() =>
                                                            removeOldImage(
                                                                img,
                                                                changesProduct
                                                                    ?.productInfo
                                                                    .id
                                                            )
                                                        }>
                                                        <i className="fa-solid fa-xmark" />
                                                    </div>
                                                </Paper>
                                            </div>
                                        );
                                    })}
                                    {images.map((img) => {
                                        return (
                                            <div
                                                key={keyRandom(5)}
                                                className="col-12 col-sm-6 col-md-3 mb-3">
                                                <Paper
                                                    className="position-relative"
                                                    sx={{
                                                        overflow: 'hidden',
                                                        width: 160,
                                                        height: 160
                                                    }}>
                                                    <img
                                                        className="w-100 h-100"
                                                        style={{
                                                            objectFit: 'cover'
                                                        }}
                                                        alt="img"
                                                        src={getImgPath(
                                                            img.url
                                                        )}
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
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialogChangeProduct} autoFocus>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogChangeInfo;
