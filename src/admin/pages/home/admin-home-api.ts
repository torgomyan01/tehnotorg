import axios from 'axios';
import { WriteApi } from '../../../utils/helper';
import { API_URLS } from '../../../utils/consts';

// GET ALL USERS
export const GetUsers = () => axios.get(WriteApi(API_URLS.GET_ALL_USERS));

// CHANGE USER INFO
export const ChangeUserInfo = (data: {}) =>
    axios.post(WriteApi(API_URLS.CHANGE_USER_INFO), data);

// REMOVE USER
export const RemoveUser = (data: {}) =>
    axios.post(WriteApi(API_URLS.REMOVE_USER), data);
