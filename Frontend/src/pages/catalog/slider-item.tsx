import React, { useState } from 'react';
import { getImgPath, keyRandom, numberPad } from '../../utils/helper';
import { classes } from '../../utils/consts';
import Carousel from 'react-bootstrap/Carousel';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';

interface IProps {
    item: IProduct;
    _index: number;
}

function SliderItem({ item, _index }: IProps) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div
                className={`slider-item ${
                    _index === 1 ? classes.activeItem : ''
                }`}>
                <div className="d-flex flex-column h-100 justify-content-between">
                    <div>
                        <Carousel
                            interval={null}
                            activeIndex={index}
                            onSelect={handleSelect}>
                            {item.images.map((e) => {
                                return (
                                    <Carousel.Item key={keyRandom(5)}>
                                        <div
                                            className="img-block"
                                            style={{
                                                backgroundImage: `url(${getImgPath(
                                                    e.url
                                                )})`
                                            }}
                                        />
                                    </Carousel.Item>
                                );
                            })}
                        </Carousel>
                        <ul className="list-style-none mt-3">
                            <li>
                                <b>?????? ????????????:</b> {item.productInfo.id}
                            </li>
                            <li>
                                <b>????????????????????????:</b> {item.productInfo.name}
                            </li>
                            {item.address[0] && (
                                <li>
                                    <b>????????:</b> {item.address[0].price}
                                </li>
                            )}
                            <li>
                                <b>????????????????:</b>{' '}
                                {item.productInfo.description.length > 150
                                    ? `${item.productInfo.description.slice(
                                          0,
                                          150
                                      )}... `
                                    : item.productInfo.description}
                            </li>
                        </ul>
                    </div>

                    <div className="d-flex justify-content-end align-items-center mt-0 mt-md-5">
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={handleClickOpen}>
                            <i className="fa-solid fa-cart-shopping me-2" />
                            ??????????????
                        </Button>
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle
                    id="alert-dialog-title"
                    className="position-relative">
                    {item.address.length
                        ? '???????????? ?????????? ???? ???????????? ????????????????????:'
                        : ''}
                </DialogTitle>
                <DialogContent className="pb-4">
                    {item.address.length ? (
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>??????????</TableCell>
                                        <TableCell align="left">
                                            ??????????
                                        </TableCell>
                                        <TableCell align="left">????????</TableCell>
                                        <TableCell align="left">
                                            ??????????????????????
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item.address.map((address) => {
                                        return (
                                            <TableRow
                                                key={keyRandom(5)}
                                                sx={{
                                                    '&:last-child td, &:last-child th':
                                                        {
                                                            border: 0
                                                        }
                                                }}>
                                                <TableCell
                                                    component="th"
                                                    scope="row">
                                                    {address.country}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {address.address}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {address.price}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {address.comment}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <h2 className="text-center">???????? ?????? ?????????????? </h2>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        ??????????????
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SliderItem;
