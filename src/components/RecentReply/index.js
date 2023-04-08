import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import moment from "moment/moment";
import style from "./index.module.scss"

//撰写过程和OtherTopic差不多,详情参考OtherTopic
function RecentReply(){

    const {user} = useSelector(store => store.user);

    return (
        <>
            {!user.recent_replies ? <div></div> :
                <div className={style.panel}>
                    <header>最近参与的话题</header>
                    <Divider className={style.divider}></Divider>
                    <div>
                        {
                            user.recent_replies.map(item => 
                            <div key={item.id}>
                                <Link className={style.avatar} to={'/user/' + item.author.loginname}>
                                    <img src={item.author && item.author.avatar_url} alt="头像" />
                                </Link>
                                <Link key={item.id} to={'/topic' + item.id} className={style.title}>
                                    {item.title}
                                </Link>
                                <span className={style.time}>
                                    {
                                        moment(item.last_reply_at, 'YYYY-MM-DD').startOf('day').fromNow()
                                    }
                                </span>
                                <Divider className={style.insider_divider}></Divider>
                            </div>)
                        }
                    </div>
                </div>
            }
        </>
    )

}

export default RecentReply;