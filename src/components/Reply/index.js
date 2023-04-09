import React from "react";
import style from "./index.module.scss"
import moment from "moment";
import { Link } from "react-router-dom";


function Reply({data}){


    const getHTML = html => ({__html:html});

    const getThumbs = length => {
       return  !length ? <span></span> : 
       <span className={style.thumbs}>
            <img src={require('../../assets/image/thumbs-up.png')} alt="点赞"/>
            {length}
       </span>
    }

    return (
        <div className={style.reply}>
            <div>
                <span>{data.length}</span>&nbsp;回复
            </div>
            {
                data.map((reply,index) => 
                    <div key={reply.id}>
                        <Link to={'/user/' + reply.author.loginname}>
                            <img src={reply.author && reply.author.avatar_url} alt="头像"/>
                        </Link>
                        <div>
                            <div className={style.info}>
                                <p>
                                    <span>{index + 1}楼&nbsp;</span>
                                    <Link to={'/user/' + reply.author.loginname}>
                                        {reply.author.loginname}
                                    </Link>
                                    <span>
                                        &nbsp;
                                        {moment(reply.create_at,"YYYY-MM-DD").startOf('day').fromNow()}
                                    </span>
                                </p>
                                {getThumbs(reply.ups.length)}
                            </div>
                            <p dangerouslySetInnerHTML={getHTML(reply.content)}></p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Reply;