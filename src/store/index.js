import { configureStore } from "@reduxjs/toolkit";
import  userSlice from "./festures/user"

//configureStore创建一个redux数据
const store = configureStore({
    //合并多个slice
    reducer:{
        user:userSlice
    },
});

export default store;