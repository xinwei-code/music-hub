import { message, Divider } from 'antd'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getMyData } from '../../Api/myHome'
import './index.css'
export default function Home(props) {
  const navigate = useNavigate()
  // 从redux获取user状态
  const { userInfo } = props.user

  const [detailInfo, setDetailInfo] = useState({
    level: 0,
    follows: 0,
    playlistCount: 0,
    followeds: 0,
    nickname: '',
  })

  // 根据uid获取用户的详细状态
  const getUserDetail = useCallback(async () => {
    const {
      level,
      profile: { follows, playlistCount, followeds, nickname },
    } = await getMyData(userInfo.userId)
    //   console.log(level, follows, playlistCount, followeds)
    setDetailInfo({ level, follows, playlistCount, followeds, nickname })
  }, [userInfo])

  useEffect(() => {
    if (!props.user.isLogin) {
      message.error('请先登录')
      navigate('/login')
    }
    getUserDetail()
  }, [props, navigate, getUserDetail])
  return (
    <Fragment>
      <div className="userInfo-container">
        <div className="info-left">
          <img className="info-left-avatar" alt="" src={userInfo.avatarUrl} />
        </div>
        <div className="info-right">
          <div>
            <span style={{fontSize:'22px',marginRight:'20px'}}>{detailInfo.nickname}</span>
            <span>Lv{detailInfo.level}</span>
          </div>
          <Divider style={{ width: '100%' }} />
          <div className="follow">
            <div className="following">
              <h1>{detailInfo.follows}</h1>
              <span>关注</span>
            </div>
            <div className="divider"></div>
            <div className="followed">
              <h1>{detailInfo.followeds}</h1>
              <span>粉丝</span>
            </div>
          </div>
        </div>
      </div>
      <div className="collection-of-playlists">
        <h2>我创建/收藏的歌单({detailInfo.playlistCount})</h2>
        <Divider style={{ backgroundColor: 'skyblue', height: '3px' }} />
      </div>
    </Fragment>
  )
}
