import {createSlice} from '@reduxjs/toolkit';
const initialState =[];

const wishListSlice =createSlice({
    name:'wishList',
    initialState,
    reducers:{
        addToWishlist(state,action){
            state.push(action.payload)
        },
        removeFromWishList(state,action){
            return state.filter(item =>item.id !==action.payload)
        }
    }
});

export const {addToWishlist,removeFromWishList}=wishListSlice.actions;
export default wishListSlice.reducer ;