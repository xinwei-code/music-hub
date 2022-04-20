import React, { Fragment, useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Comment, Tooltip, Avatar } from 'antd'

// api
import {
  getMVURL,
  getCommentOfMv,
  getInfoAboutMV,
  getRecommendMV,
  getSingerInfo,
} from '../../Api/mv'
import { getNormalDate } from '../../utils/timeFormater'
import './index.css'

export default function MvList() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const artistId = searchParams.get('artistId')

  const navigate = useNavigate()
  // mvUrl:
  const [mvurl, setMvUrl] = useState('')
  //评论
  const [mvcomments, setMvComments] = useState([])
  // 推荐mv
  const [mvList, setMvList] = useState([])
  //作者信息
  const [SingerInfo, setSingerInfo] = useState({})
  //mv介绍
  const [mvMsg, setMvMsg] = useState({})

  useEffect(() => {
    async function fetchData() {
      const { data } = await getMVURL(id)
      const { hotComments } = await getCommentOfMv(id)
      const { data: mvInfo } = await getInfoAboutMV(id)
      const { mvs } = await getRecommendMV(id)
      //更新状态
      setMvUrl(data.url)
      setMvComments(hotComments)
      setMvList(mvs)
      setMvMsg(mvInfo)
    }
    fetchData()
  }, [id])

  useEffect(() => {
    async function fetchData() {
      const { artist } = await getSingerInfo(artistId)
      setSingerInfo(artist)
    }
    fetchData()
  }, [artistId])

  return (
    <Fragment>
      <div className="mv_container">
        {/* 主体区域 */}
        <div className="mv_main">
          <div className="mv_title">
            <span className="mv-icon">MV</span>
            {/* 标题 */}
            <span style={{ fontWeight: '700', fontSize: '22px' }}>
              {mvMsg.name}
            </span>
          </div>
          {/* mv */}
          <video
            autoPlay
            poster={mvMsg.cover}
            controls
            id="audio"
            src={mvurl}
          ></video>
          <div className="mv_description">
            <div className="mv-singer">
              <img src={SingerInfo.picUrl} alt="" />
              <span>{SingerInfo.name}</span>
            </div>
            <span style={{ color: '#888787' }}>
              {SingerInfo.publishTime
                ? getNormalDate(SingerInfo.publishTime)
                : ''}
            </span>
            <div className="mv-desc">{SingerInfo.briefDesc}</div>
          </div>
        </div>
        {/* 相关推荐区域 */}
        <div className="mv_recommend">
          <h1>相关推荐</h1>
          <div className="mv-recommend-list">
            {mvList.map((item, index) => {
              return (
                <div
                  className="mv-rec-item"
                  key={index}
                  onClick={() =>
                    navigate(
                      `/mvlist?id=${item.id}&artistId=${item.artists[0].id}`
                    )
                  }
                >
                  <img src={item.cover} alt="" />
                  <div>
                    <span>{item.name}</span>
                    <h3>{item.artistName}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="mv_comment">
        <h2>热门评论({mvcomments.length})</h2>
        {mvcomments.map((item, index) => {
          return (
            <Comment
              key={index}
              author={
                <span style={{ color: '#409EFF' }}>{item.user.nickname}</span>
              }
              avatar={<Avatar src={item.user.avatarUrl} alt="" />}
              content={<p>{item.content}</p>}
              datetime={
                <Tooltip title={getNormalDate(item.time)}>
                  <span>{item.timeStr}</span>
                </Tooltip>
              }
            />
          )
        })}
      </div>
    </Fragment>
  )
}
