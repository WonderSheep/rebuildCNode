import React, { useState, useEffect } from "react";
import { getUserByName } from "../../utils/api";
import { Skeleton } from "antd";
import style from "./index.module.scss"
import { Link } from "react-router-dom";
import moment from "moment";

function ProfilePanel({ loginname }) {

    const [state, setState] = useState({ user: {} });

    useEffect(() => {

        (async () => {

            getUserByName(loginname).then(res => {
                setState({
                    user: res.data,
                })
            })
        })();


    }, [loginname])


    return (

        <>
            {!state.user.loginname ? <Skeleton active></Skeleton> :
                <div className={style.panel}>
                    <Link className={style.user}>
                        <img src={state.user.avatar_url} alt="用户头像" />
                        <span className={style.uniq}>用户名:</span>
                        <span>{state.user.loginname}</span>
                    </Link>
                    <div>积分:{state.user.score}</div>
                    <div>
                        Github :
                        <a
                            href={"https://github.com/" + state.user.githubUsername}
                            target="_black"
                            rel="nofollow noopener norefferer"
                        >
                            {state.user.githubUsername}
                        </a>
                    </div>
                    <div>
                        注册时间:
                        { moment(state.user.create_at,'YYYY-MM-DD').startOf('day').fromNow()}
                    </div>
                </div>
            }
        </>
    )

}

export default ProfilePanel;