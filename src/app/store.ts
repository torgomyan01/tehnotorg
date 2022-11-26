import { configureStore } from '@reduxjs/toolkit';
import User from './user';

export const store = configureStore({
    reducer: {
        userInfo: User
    }
});
