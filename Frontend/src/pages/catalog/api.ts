import axios from 'axios';
import { WriteApi } from '../../utils/helper';
import { API_URLS } from '../../utils/consts';

export const GetProducts = (country: string, userID: string | number) =>
    axios.get(WriteApi(`${API_URLS.GET_PRODUCTS}/${country}/${userID}`));
