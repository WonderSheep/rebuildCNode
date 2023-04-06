import React , {useState,useEffect} from "react";

function Profile(){
    
    const [loginName,setLoginName] = useState("");

    useEffect(()=>{
        setLoginName()
    },[loginName])
    
    return (
        <div>
            Profile
        </div>
    )
}

export default Profile;