import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Tabs, Table, Pagination, Skeleton } from 'antd'

import { getSearchResult } from '../../Api/searcch'
import { format } from '../../utils/timeFormater'

import './index.css'
import usePlaySong from '../../hook/usePlaySong'

const { TabPane } = Tabs

export default function Result() {
  const playSong = usePlaySong()
  const [searchParmas] = useSearchParams()
  const navigate = useNavigate()
  const kw = searchParmas.get('title')

  // 搜索结果总数
  const [count, setCount] = useState(0)

  //请求类型   1-->歌曲  1000-->歌单  1004-->MV
  const [type, setType] = useState(1)
  //当前页
  const [curPage, setCurPage] = useState(1)

  //歌单数据
  const [playlists, setPlayLists] = useState([])

  // mv数据
  const [mvs, setMvs] = useState([])

  const [loading, setloading] = useState(true)

  //tab栏切换时的回调
  const changeType = key => {
    if (key === '1') {
      setType(1)
    } else if (key === '2') {
      setType(1000)
    } else {
      setType(1004)
    }
    setCurPage(1)
  }

  //表格规格
  const columns = [
    {
      title: '',
      dataIndex: 'index',
      key: 'index',
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

  // 表格数据源
  const [tracks, setTracks] = useState([
    {
      key: '',
      index: 0,
      title: '',
      singer: '',
      album: '',
      time: 0,
    },
  ])

  // 页面变化时的回调
  const toNextPage = num => {
    setCurPage(num)
  }

  useEffect(() => {
    async function fetchData() {
      const { result } = await getSearchResult(kw, type, curPage)
      switch (type) {
        case 1: //歌曲
          setCount(result.songCount)
          const { songs } = result
          const arr = []
          songs.forEach((item, index) => {
            const obj = {}
            obj.title = item.name
            obj.time = format(item.duration)
            obj.index = index + 1
            obj.singer = item.artists[0].name
            obj.key = index
            obj.album = item.album.name
            obj.id = item.id
            arr.push(obj)
          })
          setTracks(arr)
          setloading(false)
          break
        case 1000: //歌单
          setCount(result.playlistCount)
          setPlayLists(result.playlists)
          setloading(false)
          break
        case 1004: //mv
          setCount(result.mvCount)
          setMvs(result.mvs)
          setloading(false)
          break
        default:
          break
      }
    }
    fetchData()
  }, [kw, type, curPage])

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <div className="result-container">
          <div>
            <span>{kw}</span>共找到
            <span>{count}</span>条结果
          </div>
          <Tabs defaultActiveKey="1" onChange={changeType}>
            <TabPane tab="歌曲" key="1">
              <Table
                onRow={record => {
                  return {
                    onClick: () =>
                      playSong({ id: record.id, name: record.title }),
                  }
                }}
                columns={columns}
                dataSource={tracks}
                pagination={false}
              />
            </TabPane>
            <TabPane tab="歌单" key="2">
              <ul className="playlist-result">
                {playlists.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => navigate('/songslist?id=' + item.id)}
                    >
                      <img src={item.coverImgUrl} alt="" />
                      <div>{item.name}</div>
                    </li>
                  )
                })}
              </ul>
            </TabPane>
            <TabPane tab="MV" key="3">
              <ul className="mv-result">
                {mvs.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() =>
                        navigate(
                          `/mvlist?id=${item.id}&artistId=${item.artistId}`
                        )
                      }
                    >
                      <img src={item.cover} alt="" />
                      <div>{item.name}</div>
                    </li>
                  )
                })}
              </ul>
            </TabPane>
          </Tabs>
          <br />
          {/* 分页 */}
          <Pagination
            total={count}
            current={curPage}
            pageSize={10}
            onChange={toNextPage}
          />
        </div>
      )}
    </>
  )
}
