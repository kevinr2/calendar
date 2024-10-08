import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
       name: 'auth',
       initialState: {
           status:'checking',
           user:{},
           errorMessage:undefined,

       },
       reducers: {
        onchecking:(state)=>{
            state.status = 'checking';
            state.errorMessage = undefined
        },
        onLogin:(state,{payload})=>{
            state.status = 'authenticated'
            state.user = payload
            state.errorMessage = undefined
        },
        onLogout:(state,{payload})=>{
            state.status = 'not-authenticated';
            state.user={}
            state.errorMessage = payload
        },
        clearErrorMessage:(state)=>{
            state.errorMessage=undefined
        },

    }
    
});


// Action creators are generated for each case reducer function
export const { onchecking , onLogin, onLogout, clearErrorMessage} = authSlice.actions;