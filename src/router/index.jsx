import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { Spin } from 'antd'

//引入路由组件
/* import Mv from '../pages/Mv'
import Recommend from '../pages/Recommend'
import Songs from '../pages/Songs'
import Discover from '../pages/Discover'
import SongsList from '../pages/SongsList'
import MvList from '../pages/MyList' */
// 路由懒加载
const Login = lazy(() => import('../pages/Login'))
const Mv = lazy(() => import('../pages/Mv'))
const Recommend = lazy(() => import('../pages/Recommend'))
const Songs = lazy(() => import('../pages/Songs'))
const Discover = lazy(() => import('../pages/Discover'))
// const SongsList = lazy(() => import('../pages/SongsList'))
const SongsList = lazy(() => import('../pages/SongsList'))
const MvList = lazy(() => import('../pages/MvList'))
const Home = lazy(() => import('../pages/Home'))
const Result = lazy(() => import('../pages/Result'))
const NotFound = lazy(() => import('../pages/NotFound'))

// 临时测试的组件
// const Test = lazy(() => import('../components/test'))

//防止出现闪屏现象
const lazyLoad = Children => {
  return (
    <Suspense fallback={<Spin className="global-loading" size='large'/>}>
      {Children}
    </Suspense>
  )
}

const router = [
  {
    path: '/',
    element: lazyLoad(<Navigate to={'discover'} />),
  },
  {
    path: '/discover',
    element: lazyLoad(<Discover />),
  },
  {
    path: '/mv',
    element: lazyLoad(<Mv />),
    /*     children: [
      {
        path: 'test',
        element: lazyLoad(<Test />),
      },
    ], */
  },
  {
    path: '/mvlist',
    element: lazyLoad(<MvList />),
  },
  {
    path: '/songslist',
    element: lazyLoad(<SongsList />),
  },
  {
    path: '/recommend',
    element: lazyLoad(<Recommend />),
  },
  {
    path: '/songs',
    element: lazyLoad(<Songs />),
  },
  {
    path: '/login',
    element: lazyLoad(<Login />),
  },
  {
    path: '/home',
    element: lazyLoad(<Home />),
  },
  {
    path: '/result',
    element: lazyLoad(<Result />),
  },
  {
    path: '*',
    element:lazyLoad(<NotFound/>)
  }
]

export default router
