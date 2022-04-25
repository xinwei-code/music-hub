import React from 'react'
import { Layout, Input, Button, Dropdown, Menu } from 'antd'
import {
  LeftCircleFilled,
  RightCircleFilled,
  UserOutlined,
  SwitcherOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../../redux/actions/user'
import './index.css'

export default function Top() {
  const { Header } = Layout
  const { Search } = Input

  const dispatch = useDispatch()
  // 路由导航
  const navigate = useNavigate()

  //点击搜索的回调
  function onSearch(keyword) {
    navigate('/result?title=' + keyword)
  }

  //从store获取用户信息
  const userInfo = useSelector(state => {
    return {
      userInfo: state.user.userInfo,
      isLogin: state.user.isLogin,
    }
  })
  // 点击下拉菜单的回调
  const onClick = ({ key }) => {
    if (key === '2') {
      navigate('home')
    }
    if (key === '3') {
      // 退出登录
      dispatch(logout())
      navigate('/')
    }
  }
  // 下拉菜单选项
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">
        欢迎您，{userInfo.userInfo ? userInfo.userInfo.nickname : ''}
      </Menu.Item>
      <Menu.Item key="2">
        <UserOutlined />
        <span style={{ marginLeft: '4px' }}>我的主页</span>
      </Menu.Item>
      <Menu.Item key="3">
        <SwitcherOutlined />
        <span style={{ marginLeft: '4px' }}>退出</span>
      </Menu.Item>
    </Menu>
  )

  const LogoutBox = () => {
    return (
      <Button
        type="primary"
        style={{ borderRadius: '8px', marginLeft: '5px' }}
        onClick={() => navigate('login')}
      >
        登录
      </Button>
    )
  }

  const LoginBox = () => {
    return (
      <Dropdown overlay={menu}>
        <img
          src={userInfo.userInfo.avatarUrl}
          alt=""
          style={{
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            marginLeft: '15px',
          }}
        />
      </Dropdown>
    )
  }

  return (
    <>
      <Header className="header">
        <div className="header-left">
          {/* logo区域 */}
          <div className="logo">
            Music
            <span>Hub</span>
          </div>
          {/* 历史记录 */}
          <div className="history">
            <LeftCircleFilled
              className="circlefilled"
              onClick={() => navigate(-1)}
            />
            <RightCircleFilled
              className="circlefilled"
              onClick={() => navigate(1)}
            />
          </div>
        </div>
        {/* 右侧盒子 */}
        <div className="header-right">
          <Search
            placeholder="请输入歌手或歌名"
            onSearch={onSearch}
            enterButton
            allowClear
          />
          {userInfo.isLogin ? <LoginBox /> : <LogoutBox />}
          {/* 头像 */}
        </div>
      </Header>
    </>
  )
}
