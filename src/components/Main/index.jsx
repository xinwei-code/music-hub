import React from 'react'
import { useNavigate, useLocation, useRoutes } from 'react-router-dom'
import {
  PlayCircleFilled,
  CustomerServiceOutlined,
  FolderOutlined,
  HomeOutlined,
} from '@ant-design/icons'

/* //引入路由组件
import Mv from '../../pages/Mv'
import Recommend from '../../pages/Recommend'
import Songs from '../../pages/Songs'
import Discover from '../../pages/Discover'
import SongsList from '../../pages/SongsList'
import MvList from '../../pages/MyList' */

import './index.css'
//路由
import router from '../../router'
//遍历菜单项的数据
const itemList = [
  { path: '/discover', title: '发现音乐', icon: HomeOutlined },
  { path: '/recommend', title: '推荐歌单', icon: FolderOutlined },
  { path: '/songs', title: '最新音乐', icon: CustomerServiceOutlined },
  { path: '/mv', title: '最新MV', icon: PlayCircleFilled },
]
//常量必须在import语句后面，否则报错
// const { Sider, Content } = Layout

export default function Main() {
  //使用编程式路由导航
  const navigate = useNavigate()
  //通过location.pathname获得当前url
  const location = useLocation()

  return (
    <>
      <div id="main">
        {/* 主体左侧区域 */}
        <div id="sider" style={{ minWidth: '200px' }}>
          {itemList.map(item => {
            return (
              <div
                onClick={() => {
                  navigate(item.path)
                }}
                key={item.path}
                className={item.path === location.pathname ? 'active' : ''}
              >
                <item.icon
                  style={{ fontSize: '20px', marginRight: '6px' }}
                ></item.icon>
                {item.title}
              </div>
            )
          })}
        </div>
        {/* 主体右侧区域 */}
        <div className="content">
          {/*注册路由 */}
          {/*<Routes>
            <Route path="/mv" element={<Mv />}></Route>
            <Route path="/recommend" element={<Recommend />}></Route>
            <Route path="/songs" element={<Songs />}></Route>
            <Route path="/discover" element={<Discover />}></Route>
            重定向
            <Route path="/" element={<Navigate to="/discover" />}></Route>
            <Route path="/songslist" element={<SongsList />}></Route>
            <Route path="/mvlist" element={<MvList/>}></Route>
          </Routes> */}
          {/* <Suspense fallback={<>loading...</>}>{useRoutes(router)}</Suspense> */}
          {useRoutes(router)}
        </div>
      </div>
    </>
  )
}
