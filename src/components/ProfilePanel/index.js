import React, { useEffect } from "react";
import { getUserByName } from "../../utils/api";
import { Skeleton } from "antd";
import style from "./index.module.scss"
import { Link } from "react-router-dom";
import moment from "moment";
//引入redux的固定组件
import { useSelector,useDispatch } from "react-redux";
//引入redux中对应的方法
import { setUser } from "../../store/festures/user";

function ProfilePanel({ loginname }) {

    // const [state, setState] = useState({ user: {} });

    //将redux中的设置的对象,store的userSlice把state转过来
    const {user} = useSelector((store) => store.user);
    //通过useDispatch 派发事件
    const dispatch = useDispatch();


    useEffect(() => {

        (async () => {

            getUserByName(loginname).then(res => {
                // setState({
                //     user: res.data,
                // })
                dispatch(setUser(res.data));
            })

        })();


    }, [loginname,dispatch])


    return (

        <>
            {!user.loginname ? <Skeleton active></Skeleton> :
                <div className={style.panel}>
                    <Link className={style.user}>
                        <img src={user.avatar_url} alt="用户头像" />
                        <span className={style.uniq}>用户名:</span>
                        <span>{user.loginname}</span>
                    </Link>
                    <div>积分:{user.score}</div>
                    <div>
                        Github :
                        <a
                            href={"https://github.com/" + user.githubUsername}
                            target="_black"
                            rel="nofollow noopener norefferer"
                        >
                            {user.githubUsername}
                        </a>
                    </div>
                    <div>
                        注册时间:
                        { moment(user.create_at,'YYYY-MM-DD').startOf('day').fromNow()}
                    </div>
                </div>
            }
        </>
    )

}

export default ProfilePanel;