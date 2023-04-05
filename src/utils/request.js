import axios from "axios";
import { message } from "antd";

//封装axios接口

const error = () => {
    message.error('数据加载失败',1);
}
//发生错误时调用函数，第二个参数是延时事件

const Instance = axios.create({
    baseURL:'https://cnodejs.org/api/v1',
    timeout:5000
})

//发送请求的拦截器
Instance.interceptors.request.use(
    config => {
        // console.log(config);
        return config
    },
    err => {
        error();
        Promise.reject(err);
    }
)

//响应拦截器
Instance.interceptors.response.use(
    response => {
        // console.log(response);
        return response.data;
    },
    err => {
        error();
        return Promise.reject(err);
    }
)

export default Instance;
