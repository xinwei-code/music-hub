import React, {  useState } from 'react'
import { Layout, Input, Button, Dropdown, Menu } from 'antd'
import {
  LeftCircleFilled,
  RightCircleFilled,
  UserOutlined,
  SwitcherOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import './index.css'

export default function Top() {
  const { Header } = Layout
  const { Search } = Input

  // 路由导航
  const navigate = useNavigate()

  //点击搜索的回调
  function onSearch(keyword) {
    navigate('/result?title=' + keyword)
    console.log(keyword)
  }

  const [userInfo] = useState({})


  // 点击下拉菜单的回调
  const onClick = ({ key }) => {
    if (key === '2') {
      navigate('home')
    }
    if (key === 3) {
      // 退出登录
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

          {!userInfo.isLogin ? (
            <Button
              type="primary"
              style={{ borderRadius: '8px', marginLeft: '5px' }}
              onClick={() => navigate('login')}
            >
              登录
            </Button>
          ) : (
            ''
          )}
          {/* 头像 */}
          {userInfo.isLogin ? (
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
          ) : (
            ''
          )}
        </div>
      </Header>
    </>
  )
}
