//手写节流函数，防止滚轮滑动到底部频繁触发发送请求事件

function throttle(func,limit){
    let permission;//初始时permission是Undefined,!undefined为true
    return function(...args){
        
        if(!permission){
            func.apply(this,args);//apply立马调用函数
            permission = true;
            setTimeout(()=>{permission = false},limit)//1s后才可以重新触发事件
        }
    } 
}

export default throttle;