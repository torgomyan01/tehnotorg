import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    TextField
} from '@mui/material';
import { getImgPath, keyRandom } from '../../../utils/helper';

function ViewProduct({
    viewProductInfo,
    handleClose
}: {
    viewProductInfo: {
        open: boolean;
        product: IProduct | null;
    };
    handleClose: () => void;
}) {
    return (
        <Dialog open={viewProductInfo.open} onClose={handleClose} maxWidth="md">
            <DialogTitle>Смотреть товар</DialogTitle>
            <DialogContent>
                <div className="row">
                    <div className="col-12 pt-3">
                        <div className="row mb-3">
                            <div className="col-12">
                                <TextField
                                    fullWidth
                                    disabled
                                    value={
                                        viewProductInfo.product?.productInfo
                                            .name
                                    }
                                    label="Имя товара"
                                    variant="outlined"
                                    name="name"
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <TextField
                                fullWidth
                                disabled
                                value={
                                    viewProductInfo.product?.productInfo
                                        .description
                                }
                                label="Описание"
                                name="description"
                                multiline
                                rows={3}
                                variant="outlined"
                            />
                        </div>

                        {viewProductInfo.product?.address.map((address) => {
                            return (
                                <div key={keyRandom(5)}>
                                    <hr />
                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <TextField
                                                fullWidth
                                                disabled
                                                value={address.address}
                                                label="Адрес"
                                                variant="outlined"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <TextField
                                                fullWidth
                                                disabled
                                                value={address.country}
                                                label="Город"
                                                variant="outlined"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <TextField
                                                fullWidth
                                                disabled
                                                value={address.price}
                                                label="Цена"
                                                variant="outlined"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <TextField
                                            fullWidth
                                            disabled
                                            value={address.comment}
                                            label="Комментарий"
                                            variant="outlined"
                                        />
                                    </div>
                                </div>
                            );
                        })}

                        <div className="mb-3">
                            <div className="row justify-content-start flex-wrap">
                                {viewProductInfo.product?.images.map(
                                    (image) => {
                                        return (
                                            <div
                                                key={keyRandom(5)}
                                                className="col-12 col-sm-6 col-md-3 mb-3">
                                                <Paper
                                                    className="position-relative"
                                                    sx={{
                                                        overflow: 'hidden',
                                                        width: 150,
                                                        height: 150
                                                    }}>
                                                    <img
                                                        className="w-100 h-100"
                                                        style={{
                                                            objectFit: 'cover'
                                                        }}
                                                        alt="img"
                                                        src={getImgPath(
                                                            image.url
                                                        )}
                                                    />
                                                </Paper>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ViewProduct;
