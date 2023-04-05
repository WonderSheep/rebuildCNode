import request from './request'

export const getTopics = data => {
    return request({
        url:'/topics',
        method:'get',
        params:data
        //data参数 : page页数 tab主题分类 limit每一页的主题数量 
    })
}