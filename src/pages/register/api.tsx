import axios from 'axios';
import { WriteApi } from '../../utils/helper';
import { API_URLS } from '../../utils/consts';

export const RegisterUser = (data: any) =>
    axios.post(WriteApi(API_URLS.REGISTER), data);

export const RegisterUserAdmin = (data: any) =>
    axios.post(WriteApi(API_URLS.REGISTER_ADMIN), data);
