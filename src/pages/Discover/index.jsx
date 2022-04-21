import React, { useEffect, useState } from 'react'
import { Carousel, Card, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'

import { getSwiper, getRecommend, getSongs, getMv } from '../../Api/discover'

import './index.css'

const { Meta } = Card
export default function Discover() {
  // state
  const [data, setData] = useState({
    banners: [], //轮播图
    recommendList: [], //推荐歌单
    songsList: [], //最新歌单
    mvList: [], //推荐mv
  })
  const [loading, setloading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const { banners } = await getSwiper()
      const { result: recommendList } = await getRecommend()
      const { result: songsList } = await getSongs()
      const { result: mvList } = await getMv()
      /* 异步api */
      setData({ banners, recommendList, songsList, mvList })
      setloading(false)
    }
    fetchData()
  }, [])

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <div>
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
          <div>
            <h2 style={{ fontWeight: '700' }}>推荐歌单</h2>
            <div className="rec-container">
              {data.recommendList.map(item => {
                return (
                  <Card
                    key={item.id}
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="" src={item.picUrl} />}
                    onClick={() => navigate('/songslist?id=' + item.id)}
                  >
                    <Meta title={item.name} />
                  </Card>
                )
              })}
            </div>
          </div>

          {/* 最新歌单 */}
          <div className="songs-container">
            <h2 style={{ fontWeight: '700' }}>最新歌单</h2>
            <div>
              {data.songsList.map(item => {
                return (
                  <Card
                    hoverable
                    key={item.id}
                    style={{ width: 180, margin: '10px 0' }}
                    cover={<img alt="" src={item.picUrl} />}
                    onClick={() => navigate('/songslist?id=' + item.id)}
                  >
                    <Meta
                      title={item.name}
                      description={item.song.artists[0].name}
                    />
                  </Card>
                )
              })}
            </div>
          </div>

          {/* 推荐Mv */}
          <div className="new-mv">
            <h2 style={{ fontWeight: '700' }}>推荐MV</h2>
            <div className="mv-wrap">
              {data.mvList.map(item => {
                const time = '0' + (item.duration / 1000 / 60).toFixed(2)
                return (
                  <Card
                    hoverable
                    key={item.id}
                    style={{ width: 240, margin: '10px 0' }}
                    cover={<img alt="" src={item.picUrl} />}
                    onClick={() =>
                      navigate(
                        `/mvlist?id=${item.id}&artistId=${item.artistId}`
                      )
                    }
                  >
                    <Meta
                      title={item.name}
                      description={
                        <div>
                          <span>{item.artistName}</span>
                          <br />
                          <span>时长: {time.replace('.', ':')}</span>
                          <br />
                          <span>{item.playCount}次播放</span>
                        </div>
                      }
                    />
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
