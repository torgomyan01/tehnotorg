// REMOVE USER
import axios from 'axios';
import { WriteApi } from '../../../utils/helper';
import { API_URLS } from '../../../utils/consts';

export const CreateProducts = (data: {}) =>
    axios.post(WriteApi(API_URLS.CREATE_PRODUCT), data);
