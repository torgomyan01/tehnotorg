import axios from 'axios';
import { WriteApi } from '../../utils/helper';
import { API_URLS } from '../../utils/consts';

export const GetProduct = (id: string) =>
    axios.get(WriteApi(`${API_URLS.GET_PRODUCT}/${id}`));
