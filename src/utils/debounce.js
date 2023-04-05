//手写防抖函数
//限制重复操作

function debounce(func,delay){
    let timeout;
    return function(...args){
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            func.apply(this,args)
        },delay)
    }
}

export default debounce;