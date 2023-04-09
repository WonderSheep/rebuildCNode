import React, { useState } from 'react';
import style from './index.module.scss'//不需安装依赖，直接引用即可
import { Modal } from 'antd';


function Header() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={style.header}>
            <div>
                <a href="/">
                    <img src={require('../../assets/image/cnodejs.png')} alt="网站Logo" />
                </a>
                <span onClick={showModal}>关于</span>
            </div>
            <Modal title="关于本项目" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>技术栈：</p>
                <ul>
                    <li>React</li>
                    <li>React Router</li>
                    <li>Redux</li>
                    <li>Ant Design</li>
                    <li>Axios</li>
                </ul>
            </Modal>
        </div>
    );
}

export default Header;