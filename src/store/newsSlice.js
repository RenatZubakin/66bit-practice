import {createSlice} from "@reduxjs/toolkit";


const newsSlice=createSlice({
    name:'news',
    initialState:{
        news:[]
    },
    reducers:{
        loadingNews:(state,action)=>{
            state.news=[...state.news,...action.payload]
            console.log(action.payload)
        },
        refreshNews:(state,action)=>{
            state.news=action.payload
            console.log(action.payload)
        }
    }
})

export const  {loadingNews,refreshNews} = newsSlice.actions;
export default newsSlice.reducer;

