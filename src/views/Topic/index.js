import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { getTopicById } from "../../utils/api";
import style from "./index.module.scss";
import { Skeleton,Divider } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import tab from "../../utils/tab";
import Reply from "../../components/Reply";
import ProfilePanel from "../../components/ProfilePanel";
import OtherTopic from "../../components/OtherTopic";
import RecentReply from "../../components/RecentReply";


function Topic(){

    const {id} = useParams();

    const [topic,setTopic] = useState({});

    useEffect(()=>{

        (async ()=>{

            getTopicById(id).then(res=>{

                console.log(res);

                setTopic({
                    ...res.data,
                    ...res.data.author
                })
            })

        })();

    },[id])

    const getHTML = html => ({__html:html});//dangerouslySetInnerHTML中，后面的表达式接受的是一个对象
                                            //这个属性的名字中带有 "dangerously"，
                                            //是因为它会绕过 React 的内置的 XSS（跨站脚本攻击）保护机制，
                                            //所以需要谨慎使用。使用该属性时，需要确保渲染的 HTML 内容是可信的，不包含恶意代码，以避免安全问题。
                                            //innerHTML={{ __html: htmlContent }}

    return (
        <>
            {
                !topic.id ? <Skeleton active></Skeleton> : 
                <div className={style.topic}>
                    <div className={style.left}>
                        <div 
                            className={style.title} 
                            dangerouslySetInnerHTML={getHTML(topic.title)}>   
                        </div>
                        <div className={style.info}>
                            <span>
                                发布于&nbsp;
                                {moment(topic.create_at,"YYYY-MM-DD").startOf('day').fromNow()}
                                &nbsp;•&nbsp;
                            </span>
                            作者:
                            <Link to={"/user/" + topic.loginname}>
                                {topic.loginname}
                            </Link>
                            &nbsp;•&nbsp;
                            <span>{topic.visit_count}次浏览&nbsp;•&nbsp;</span>
                            <span>
                                来自:{tab[topic.tab] && tab[topic.tab].name}
                            </span>
                        </div>
                        <Divider></Divider>
                        <div
                            className={style.content}
                            dangerouslySetInnerHTML={getHTML(topic.content)}
                        >
                        </div>
                        <Reply data={topic.replies}></Reply>
                    </div>
                    <div className={style.right}>
                        <ProfilePanel loginname={topic.loginname}></ProfilePanel>
                        <OtherTopic></OtherTopic>
                        <RecentReply></RecentReply>
                    </div>
                </div>
            }
        </>
    )
}

export default Topic;