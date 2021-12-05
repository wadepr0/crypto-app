import { Typography, Button, Menu, Avatar } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import icon from '../images/bitcoin3.png'


const Navbar = () => {
    let { pathname } = useLocation();
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])
    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar className='logo-pic' src={icon} size={64} />
                <Typography.Title level={2} style={{ display: 'flex', alignSelf: 'center', marginBottom: 0 }} className='logo'>
                    <Link style={{ height: '100%' }} to='/'>CryptoDaily</Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
                <Menu theme='dark' selectedKeys={[`${pathname}`]} defaultSelectedKeys={['/']}>
                    <Menu.Item key="/" icon={< HomeOutlined />}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item key="/cryptocurrencies" icon={< FundOutlined />}>
                        <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item key="/exchanges" icon={< MoneyCollectOutlined />}>
                        <Link to='/exchanges'>Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item key="/news" icon={< BulbOutlined />}>
                        <Link to='/news'>News</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div >
    )
}

export default Navbar
