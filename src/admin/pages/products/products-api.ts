import axios from 'axios';
import { WriteApi } from '../../../utils/helper';
import { API_URLS } from '../../../utils/consts';

export const GetProductsAdmin = () =>
    axios.get(WriteApi(API_URLS.GET_PRODUCTS_TERMINAL));

export const RemoveProduct = (id: number | string) =>
    axios.post(WriteApi(`${API_URLS.REMOVE_PRODUCT}/${id}`));

export const RemoveImageProduct = (data: {
    id: number;
    product_id: string | number;
}) => axios.post(WriteApi(API_URLS.REMOVE_IMAGE_PRODUCT), data);

export const RemoveAddress = (id: string | number) =>
    axios.post(WriteApi(`${API_URLS.REMOVE_ADDRESS}/${id}`));

export const RenameProduct = (data: { id: string | number; value: string }) =>
    axios.post(WriteApi(API_URLS.RENAME_PRODUCT), data);

export const ChangeNameDesc = (data: { id: string | number; value: string }) =>
    axios.post(WriteApi(API_URLS.CHANGE_DESC_PRODUCT), data);

export const AddAddressProduct = (productId: number | string) =>
    axios.post(WriteApi(API_URLS.CREATE_ADDRESS_PRODUCT), {
        product_id: productId
    });

export const ChangeInfoAddress = (data: {
    id: number | string;
    address: string;
    country: string;
    price: string;
    comment: string;
}) => axios.post(WriteApi(API_URLS.CHANGE_INFO_ADDRESS), data);

export const UploadFileProduct = (data: any) =>
    axios.post(WriteApi(API_URLS.UPLOAD_FILE_PRODUCT), data);
