import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd'
import { useNavigate } from 'react-router-dom'

import { getSwiper, getRecommend, getSongs, getMv } from '../../Api/discover'
import { PlayCircleTwoTone } from '@ant-design/icons'

import './index.css'
export default function Discover() {
  // state
  const [data, setData] = useState({
    banners: [], //轮播图
    recommendList: [], //推荐歌单
    songsList: [], //最新歌单
    mvList: [], //推荐mv
  })
  //组件生命周期回调
  useEffect(() => {
    fetchData()
  }, [])
  const navigate = useNavigate()
  //获取组件数据
  async function fetchData() {
    const { banners } = await getSwiper()
    const { result: recommendList } = await getRecommend()
    const { result: songsList } = await getSongs()
    const { result: mvList } = await getMv()
    /* 异步api */
    setData({ banners, recommendList, songsList, mvList })
  }

  return (
    <>
      {/* 轮播图 */}
      <Carousel
        dots={{ className: 'dots' }}
        autoplay
        effect="fade"
        easing="ease-out"
      >
        {data.banners.map(item => {
          return (
            <div key={item.targetId}>
              <img src={item.imageUrl} alt="" className="swiper-item" />
            </div>
          )
        })}
      </Carousel>
      {/* 推荐歌单 */}
      <div className="recommend-container">
        <h2 style={{ fontWeight: '700' }}>推荐歌单</h2>
        <div className="recommend-list">
          {data.recommendList.map(item => {
            return (
              <div
                className="recommend-item"
                key={item.id}
                onClick={() => navigate('/songslist?id=' + item.id)}
              >
                <img src={item.picUrl} alt="" />
                <div>{item.name}</div>
              </div>
            )
          })}
        </div>
      </div>
      {/* 最新歌单 */}
      <div className="songs-container">
        <h2 style={{ fontWeight: '700' }}>最新歌单</h2>

        <ul className="songsList">
          {data.songsList.map(item => {
            return (
              <li key={item.id}>
                <div className="img-box">
                  <img src={item.picUrl} alt="" />
                </div>

                <div>
                  <span onMouseEnter={e => (e.target.style.cursor = 'pointer')}>
                    {item.name}
                  </span>
                  <span
                    onMouseEnter={e => (e.target.style.cursor = 'pointer')}
                    style={{ fontSize: '12px' }}
                  >
                    {item.song.artists[0].name}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      {/* 推荐Mv */}
      <div className="new-mv">
        {data.mvList.length > 0 ? (
          <h2 style={{ fontWeight: '700' }}>推荐MV</h2>
        ) : (
          ''
        )}
        <div className="mv-container">
          {data.mvList.map(item => {
            const time = '0' + (item.duration / 1000 / 60).toFixed(2)
            return (
              <div
                className="mv-item"
                key={item.id}
                onClick={() =>
                  navigate(`/mvlist?id=${item.id}&artistId=${item.artistId}`)
                }
              >
                <div className="mv-img-box">
                  <span>{item.playCount}</span>
                  <img src={item.picUrl} alt="" />
                  <p>{time.replace('.', ':')}</p>
                  <PlayCircleTwoTone
                    className="mv-icon"
                    onMouseEnter={e => (e.target.style.cursor = 'pointer')}
                  />
                </div>
                <div>
                  <span
                    onMouseEnter={e => (e.target.style.cursor = 'pointer')}
                    className="mv-name"
                  >
                    {item.name}
                  </span>
                  <div
                    onMouseEnter={e => (e.target.style.cursor = 'pointer')}
                    style={{ color: '#ccc' }}
                  >
                    {item.artistName}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
