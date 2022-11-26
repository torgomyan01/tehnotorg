import { createSlice } from '@reduxjs/toolkit';

interface IState {
    userInfo: IUserInfo | null;
}

const initialState: IState = {
    userInfo: null
};

export const User = createSlice({
    name: 'lessons',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        updateUserInfo: (state, action) => {
            state.userInfo = action.payload;
        }
    }
});

export const { updateUserInfo } = User.actions;

export default User.reducer;
