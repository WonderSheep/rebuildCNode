import React  from "react";
import { useParams } from "react-router-dom";//可以从url中解析参数
import ProfilePanel from "../../components/ProfilePanel";
import OtherTopic from "../../components/OtherTopic";
import RecentReply from "../../components/RecentReply";
import style from "./index.module.scss"




function Profile(){
    
    const {id} = useParams();//从Url中解析出id

    return (
        <div className={style.user}>
            <ProfilePanel loginname={id}></ProfilePanel>
            <OtherTopic></OtherTopic>
            <RecentReply></RecentReply>
        </div>
    )
}

export default Profile;