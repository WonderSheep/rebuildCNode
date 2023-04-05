import React, { useEffect, useState, useRef } from "react";
import { getTopics } from "../../utils/api";
import style from "./index.module.scss"
import { Tabs } from "antd";
import Topics from '../../components/Topics'
import throttle from "../../utils/throttle";


function Home() {


    const [data, setData] = useState({
        page: 1,
        limit:20,
        list: [],
        store: {},//存储Tab对应的数据，因为切换Tab后就没必要重新以Limit:20加载数据了
        key: 'all'//当前Tab,声明在全局变量是为了滚动时相关函数也能获取得到
    });

    //useState返回的更新状态方法是异步的，要在下次重绘才能获取新值
    //不要试图在更改状态之后立马获取状态
    //应该使用useRef存储这个数据,然后在useEffect里监听data的变化
    //当我们想使用当前的数据的时候直接dataRef.current

    const dataRef = useRef();
    useEffect(() => {
        dataRef.current = data;
    }, [data])


    const showTopics = () => {
        
        // 之前更新没成功是因为使用了原来的page,limit,tab,现在使用了Ref接收之后申请参数才得以改变了,所以可以得到正确的list
        // 要深刻理解(useState返回的更新状态方法是异步的，要在下次重绘才能获取新值)

        getTopics({
            page: dataRef.current.page,
            limit: dataRef.current.limit,
            tab: dataRef.current.key
        }).then(res => {
            const store = data.store;
            //创建新对象，store指向state的store
            setData(prevState => {
                return {
                    ...prevState,
                    list: res.data,
                    limit: prevState.limit + 10
                }
            })

            //将数据存储到对应的key下
            store[data.key] = {
                limit: data.limit,
                data: res.data
            }
        })
    }


    const tabChanged = key => {
        const store = data.store;

        if (!store[key]) {
            setData({
                ...data,
                key,
                limit:20,
                list: []
                //这里是为了其余分来的第一次加载
            });
            showTopic();
            return;
        }

        //如果已经存有数据了
        setData({
            ...data,
            key,
            limit: store[key].limit,
            list: store[key].data
        })
    }

    const showTopic = throttle(showTopics, 500)//限制频繁访问

    useEffect(() => {
        showTopics();

        function scrollMethod() {
            //这里为了适应不同的浏览器

            const sumH = document.body.scrollHeight || document.documentElement.scrollHeight
            const viewH = document.documentElement.clientHeight
            const scrollH = document.body.scrollTop || document.documentElement.scrollTop


            if (viewH + scrollH >= sumH) {
                showTopic();
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
                        children: <Topics list={data.list}></Topics>,
                    },
                    {
                        label: '精华',
                        key: 'good',
                        children: <Topics list={data.list}></Topics>,

                    },
                    {
                        label: '分享',
                        key: 'share',
                        children: <Topics list={data.list}></Topics>,
                    },
                    {
                        label: '问答',
                        key: 'ask',
                        children: <Topics list={data.list}></Topics>,
                    },
                    {
                        label: '工作',
                        key: 'job',
                        children: <Topics list={data.list}></Topics>,
                    },
                ]}
            />
        </div>
    )
}

export default Home;