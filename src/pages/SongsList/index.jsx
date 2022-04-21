import React, { Fragment, useState, useEffect } from 'react'
import {
  Tabs,
  Table,
  Divider,
  Pagination,
  Comment,
  Avatar,
  Tooltip,
  Skeleton,
} from 'antd'
import { useSearchParams } from 'react-router-dom'
import { CaretDownOutlined } from '@ant-design/icons'

import { format } from '../../utils/timeFormater'
import { getSongsList } from '../../Api/songs'
import { getHotComment, getNewComment } from '../../Api/commnet'

import './index.css'

import dayjs from 'dayjs'

const { TabPane } = Tabs

//表格规格
const columns = [
  {
    title: '',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '封面',
    dataIndex: 'coverImg',
    key: 'coverImg',
  },
  {
    title: '音乐标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '歌手',
    dataIndex: 'singer',
    key: 'singer',
  },
  {
    title: '专辑',
    dataIndex: 'album',
    key: 'album',
  },
  {
    title: '时长',
    dataIndex: 'time',
    key: 'time',
  },
]

export default function SongsList(props) {
  // 最新评论距离顶部的高度
  // let newCommentHeight = 0

  const { getSongInfo } = props

  const [searchParams] = useSearchParams()

  // 搜索参数
  const id = searchParams.get('id')

  //接收歌单的上方介绍信息
  const [playMsg, setplayMsg] = useState({})

  //loading
  const [loading, setloading] = useState(true)

  // 表格数据源
  const [tracks, setTracks] = useState([
    {
      key: '',
      index: 0,
      coverImg: '',
      title: '',
      singer: '',
      album: '',
      time: 0,
    },
  ])

  // 热门评论
  const [Hotcomment, setHotcomment] = useState([])
  //热门评论数量
  const [HotCount, setHotCount] = useState(0)
  //最新评论
  const [newComment, setNewComment] = useState([])
  //热门评论数量
  const [newCount, setNewCount] = useState(0)

  //热门评论需要的参数
  const [hotParamsObj] = useState({
    type: 2,
    offset: 1,
    id,
    limit: 10,
  })

  //最新评论需要的参数
  const [newParamsObj, setnewParamsObj] = useState({
    offset: 1,
    id,
    limit: 10,
  })

  //定义一个变量保存当前页数
  const [curPage, setCurPage] = useState(1)

  //最新评论分页变化的回调
  const getNextPageComment = num => {
    setCurPage(num)
    setnewParamsObj({
      ...newParamsObj,
      offset: num,
    })
  }

  useEffect(() => {
    async function fetchData() {
      const { playlist } = await getSongsList(id)
      setplayMsg(playlist)

      const arr = []

      playlist.tracks.forEach((song, index) => {
        const obj = {}
        obj.index = index + 1
        obj.coverImg = (
          <img
            onClick={() => getSongInfo({ id: song.id, name: song.name })}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
            src={song.al.picUrl}
            alt=""
          />
        )
        obj.title = song.name
        obj.singer = song.ar[0].name
        obj.key = song.id
        obj.album = song.al.name
        obj.time = format(song.dt)
        arr.push(obj)
      })

      setTracks(arr)
      setloading(false)
    }
    fetchData()
  }, [id, getSongInfo])

  useEffect(() => {
    async function fetchData() {
      //热门评论
      const { hotComments, total } = await getHotComment(hotParamsObj)
      setHotCount(total)
      setHotcomment(hotComments)
      setloading(false)
    }
    fetchData()
  }, [hotParamsObj])

  useEffect(() => {
    async function fetchData() {
      //最新评论
      const { comments, total: newTotal } = await getNewComment(newParamsObj)
      setNewCount(newTotal)
      setNewComment(comments)
      setloading(false)
    }
    fetchData()
  }, [newParamsObj])

  return (
    <Fragment>
      {loading ? (
        <Skeleton active />
      ) : (
        <div className="detail-container">
          {/* 歌单的介绍 */}
          <div className="detail-top">
            {/* 左边图片 */}
            <img className="detail-top-left" src={playMsg.coverImgUrl} alt="" />
            {/* 右边盒子 */}
            <div className="detail-top-right">
              <h2>{playMsg.name}</h2>
              {/* <!-- 创建的时间,具体到日期就行 --> */}
              <span className="itme_msg">
                <img
                  src={playMsg.creator ? playMsg.creator.avatarUrl : ''}
                  alt=""
                />
                <span>{playMsg.creator ? playMsg.creator.nickname : ''}</span>
                <span>
                  {dayjs(playMsg.createTime).$y +
                    '-' +
                    (dayjs(playMsg.createTime).$M + 1) +
                    '-' +
                    dayjs(playMsg.createTime).$D}
                </span>
                创建
              </span>
              <div>
                <span style={{ marginRight: '15px' }}>标签:</span>
                <span>{playMsg.tags ? playMsg.tags.join('、') : ''}</span>
              </div>
              <div>
                <span style={{ marginRight: '15px' }}>简介:</span>
                <span>{playMsg.description}</span>
              </div>
            </div>
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="歌曲列表" key="1">
              <Table dataSource={tracks} columns={columns} pagination={false} />
            </TabPane>

            <TabPane tab="评论" key="2">
              <div className="hot-comment">
                <h3 style={{ fontWeight: '700' }}>热门评论({HotCount})</h3>
                <div>
                  {Hotcomment.map((item, index) => {
                    return (
                      <Comment
                        key={index}
                        author={<span>{item.user.nickname}</span>}
                        avatar={
                          <Avatar src={item.user.avatarUrl} alt="Han Solo" />
                        }
                        content={<p>{item.content}</p>}
                        datetime={
                          <Tooltip title={item.timeStr}>
                            <span>{item.timeStr}</span>
                          </Tooltip>
                        }
                      />
                    )
                  })}
                </div>
              </div>
              {/* 分割线 */}
              <Divider style={{ color: '#333333' }}>
                <CaretDownOutlined />
                <CaretDownOutlined />
                <CaretDownOutlined />
              </Divider>
              <div className="new-comment">
                <h3 style={{ fontWeight: '700' }}>最新评论({newCount})</h3>
                <div>
                  {newComment.map((item, index) => {
                    return (
                      <Comment
                        key={index}
                        author={<a href="###">{item.user.nickname}</a>}
                        avatar={
                          <Avatar src={item.user.avatarUrl} alt="Han Solo" />
                        }
                        content={<p>{item.content}</p>}
                        datetime={
                          <Tooltip title={item.timeStr}>
                            <span>{item.timeStr}</span>
                          </Tooltip>
                        }
                      />
                    )
                  })}
                </div>
              </div>

              {/* 分页器 */}
              <Pagination
                defaultCurrent={1}
                onChange={getNextPageComment}
                current={curPage}
                total={newCount}
                showSizeChanger={false}
              />
            </TabPane>
          </Tabs>
        </div>
      )}
    </Fragment>
  )
}
