import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
    },
    reducer:{
        setUser:(state,action)=>{
            state.user = action.payload;
        }
    }
    
})

export const {setUser} = userSlice.actions;