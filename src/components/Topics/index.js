import React from "react";
import { Skeleton,Tag } from "antd";
import style from './index.module.scss'
import { Link } from "react-router-dom";
import tab from "../../utils/tab";
import moment from "moment";

function Topics({ list }) {

    
    const items = () => {
        return list.map(item => 
            <div className={style.topic} key={item.id}>
                <Link to={'/user/' + item.author.loginname}>
                    <img src={item.author.avatar_url} alt="用户头像" />
                </Link>
                <span className={style.count}>
                    <span>{item.reply_count}</span>
                    / 
                    <span>{item.visit_count}</span>
                </span>
                {/* 这里用的是短路赋值,如果前面为真就把后面的赋值进去 */}
                <Tag color={tab[item.tab] && tab[item.tab].color} >
                    {tab[item.tab] && tab[item.tab].name}
                </Tag>
                <Link className={style.title} to={'/topic/'+item.id}>
                    {item.title}
                </Link>
                <span className={style.time}>
                    {moment(item.last_reply_at,'YYYY-MM-DD').startOf('day').fromNow()}
                </span>
            </div>
        )
    }

    return (
        <>
            {   //无数据时展示股价图
                list.length === 0 ? <Skeleton active /> : null
            }
            {items()}
        </>
    )
}

export default Topics;