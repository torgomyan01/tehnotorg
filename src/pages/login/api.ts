import axios from 'axios';
import { WriteApi } from '../../utils/helper';
import { API_URLS } from '../../utils/consts';

export const LoginUser = (data: any) =>
    axios.post(WriteApi(API_URLS.LOGIN), data);
