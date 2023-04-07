import React, { useEffect, useState } from "react";
import { getTopics } from "../../utils/api";
import style from "./index.module.scss"
import { Tabs } from "antd";
import Topics from '../../components/Topics';
import throttle from "../../utils/throttle";



function Home() {


    // console.log(props);
    const [data, setData] = useState({
        page: 1,
        limit: 20,
        // list: [],
        key: 'all'//当前Tab,声明在全局变量是为了滚动时相关函数也能获取得到
    });

    const [list, setList] = useState([]);

    //更新数据的方法必须在useEffect调用，不然无法获取最新的setState
    //setState的方法是异步的,只会在下次渲染时再调用,setState的回调可以写在useEffect里


    useEffect(() => {

        //如果Effect里想调用异步函数async要在回调里

        const show = async () => {
            throttle(getTopics({
                page: data.page,
                limit: data.limit,
                tab: data.key
            }).then((res) => {
                console.log("成功");
                setList(res.data)
            }), 1500)
        };

        show();

        //节流，防止频繁访问

    }, [data])

    const tabChanged = tab => {

        setData({
            page: 1,
            limit: 20,
            key: tab
        })


    }


    useEffect(() => {


        function scrollMethod() {
            //这里为了适应不同的浏览器

            const sumH = document.body.scrollHeight || document.documentElement.scrollHeight
            const viewH = document.documentElement.clientHeight
            const scrollH = document.body.scrollTop || document.documentElement.scrollTop

            if (Math.ceil(viewH + scrollH) >= sumH) {

                setData(prevState => {
                    return {
                        ...prevState,
                        limit: prevState.limit + 10
                    }
                })
            }
        }

        window.addEventListener('scroll', scrollMethod);

        return () => {
            window.removeEventListener('scroll', scrollMethod)
        }
    }, [])//eslint-disable-line
    //用来解决报黄字问题

    return (
        <div className={style.home}>
            <Tabs
                defaultActiveKey=""
                centered
                onChange={tabChanged}
                items={[
                    {
                        label: '全部',
                        key: 'all',
                        children: <Topics list={list}></Topics>,
                    },
                    {
                        label: '精华',
                        key: 'good',
                        children: <Topics list={list}></Topics>,

                    },
                    {
                        label: '分享',
                        key: 'share',
                        children: <Topics list={list}></Topics>,
                    },
                    {
                        label: '问答',
                        key: 'ask',
                        children: <Topics list={list}></Topics>,
                    },
                    {
                        label: '工作',
                        key: 'job',
                        children: <Topics list={list}></Topics>,
                    },
                ]}
            />
        </div>
    )
}

export default Home;