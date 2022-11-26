import React, { useEffect, useState } from 'react';
import './prodoucts.css';
import {
    AlertColor,
    IconButton,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from '@mui/material';
import { alertMessages, defAlert } from '../../../utils/consts';
import AdminContent from '../../feature/content-admin/content';
import { GetProductsAdmin, RemoveProduct } from './products-api';
import { keyRandom } from '../../../utils/helper';
import ViewProduct from './view-product';
import DialogChangeInfo from './dialog-change-info';

const columns = [
    { id: 'name', label: 'Имя Товара', minWidth: 170, width: 'auto' },
    { id: 'description', label: 'Описание', minWidth: 300, width: 600 },
    { id: 'created_at', label: 'Дата создания', minWidth: 100, width: 'auto' },
    { id: 'edit_block', label: '', minWidth: 100, width: 'auto' }
];

function Products() {
    const [alert, setAlert] = useState<{
        open: boolean;
        message: string;
        status: AlertColor | undefined;
    }>(defAlert);

    const [loading, setLoading] = useState<boolean>(true);

    function CloseAlert() {
        setAlert(defAlert);
    }
    function closeLoading() {
        setLoading(false);
    }

    const [products, setProducts] = useState<IProduct[]>([]);
    const [allProducts, setAllProducts] = useState<IProduct[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => getProducts(), []);

    function getProducts() {
        GetProductsAdmin()
            .then(({ data }) => {
                setProducts(data);
                setAllProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    const [viewProductInfo, setViewProductInfo] = useState<{
        open: boolean;
        product: IProduct | null;
    }>({
        open: false,
        product: null
    });

    const handleClickOpen = (product: IProduct) => {
        setViewProductInfo({
            open: true,
            product
        });
    };

    const handleClose = () => {
        setViewProductInfo({
            open: false,
            product: null
        });
    };

    function removeProduct(product: IProduct) {
        setLoading(true);
        RemoveProduct(product.productInfo.id)
            .then(({ data }) => {
                setLoading(false);
                if (data) {
                    setAlert({
                        open: true,
                        message: alertMessages.successProductDeleted,
                        status: 'success'
                    });
                    getProducts();
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }

    function searchProduct(e: any) {
        const val = e.target.value;
        if (val) {
            const _products = [...allProducts].filter((product) =>
                product.productInfo.name.includes(val)
            );
            setProducts(_products);
        } else {
            setProducts(allProducts);
        }
    }

    const [dialogChangeProduct, setDialogChangeProduct] =
        useState<boolean>(false);
    const [changesProduct, setChangesProduct] = useState<IProduct | null>(null);

    function openDialogChangeProduct(product: IProduct) {
        setChangesProduct(product);
        setDialogChangeProduct(true);
    }

    function closeDialogChangeProduct() {
        setDialogChangeProduct(false);
        setChangesProduct(null);
        getProducts();
    }

    function changeAlert(data: any) {
        setAlert(data);
    }

    return (
        <AdminContent
            pageLoading={loading}
            pageLoadingClose={closeLoading}
            alert={alert}
            alertClose={CloseAlert}>
            <div className="mb-3 d-flex justify-content-end">
                <TextField
                    label="Поиск товаров"
                    sx={{ m: 1, width: '40ch' }}
                    onChange={searchProduct}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <i className="fa-solid fa-magnifying-glass" />
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column: any) => (
                                    <TableCell
                                        key={keyRandom(5)}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            width: column.width
                                        }}>
                                        <b>{column.label}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.length > 0 ? (
                                products
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row: IProduct) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={keyRandom(5)}>
                                                <TableCell align="left">
                                                    {row.productInfo.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.productInfo.description
                                                        .length > 100
                                                        ? `${row.productInfo.description.slice(
                                                              0,
                                                              100
                                                          )}...`
                                                        : row.productInfo
                                                              .description}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.productInfo.created_at}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() =>
                                                            handleClickOpen(row)
                                                        }
                                                        component="label">
                                                        <i className="fa-solid fa-eye fs-5" />
                                                    </IconButton>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() =>
                                                            openDialogChangeProduct(
                                                                row
                                                            )
                                                        }
                                                        component="label">
                                                        <i className="fa-solid fa-pen-to-square fs-5" />
                                                    </IconButton>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() =>
                                                            removeProduct(row)
                                                        }
                                                        component="label">
                                                        <i className="fa-solid fa-trash fs-5" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                            ) : (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell align="left" colSpan={4}>
                                        <div className="text-center">
                                            Не найдено ничего товара
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <ViewProduct
                handleClose={handleClose}
                viewProductInfo={viewProductInfo}
            />
            <DialogChangeInfo
                changeAlert={changeAlert}
                dialogChangeProduct={dialogChangeProduct}
                product={changesProduct}
                closeDialogChangeProduct={closeDialogChangeProduct}
            />
        </AdminContent>
    );
}

export default Products;
