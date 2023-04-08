import { createSlice } from "@reduxjs/toolkit";

//创建一个Slice
const userSlice = createSlice({
    name:'user',
    //创建初始值
    initialState:{
        user:{}
    },
    //定义reducers,在这里定义更改state的方法
    reducers:{
        //两个参数:state这个state是一个代理对象，可以直接修改，
        //不需要浅复制再赋值
        setUser(state,action){
            state.user = action.payload;//action.payload是传进来的参数
        },
    },
});
//导出方法
export const {setUser} = userSlice.actions;//createSlize帮我们将setUser创建进action

export default userSlice.reducer;

