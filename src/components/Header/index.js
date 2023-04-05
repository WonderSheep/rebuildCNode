import React from 'react'
import style from './index.module.scss'//不需安装依赖，直接引用即可


function Header(){


    return (
        <div className={style.header}>
            <div>
                <a href="/">
                    <img src={require('../../assets/image/cnodejs.png')} alt="网站Logo"/>
                </a>
                <span>关于</span>
            </div>
        </div>
    );
}

export default Header;