import React, { useState, useEffect } from 'react'
import { Table, Skeleton } from 'antd'
import { getSongs } from '../../Api/songs'

import './index.css'
import { format } from '../../utils/timeFormater'

const columns = [
  {
    title: '',
    dataIndex: 'index',
    key: '',
  },
  {
    title: '封面',
    dataIndex: 'coverImg',
    key: 'coverImg',
  },
  {
    title: '音乐标题',
    dataIndex: 'songTitle',
    key: 'songTitle',
  },
  {
    title: '歌手',
    dataIndex: 'singer',
    key: 'singer',
  },
  {
    title: '专辑',
    dataIndex: 'album',
    key: 'Album',
  },
  {
    title: '时长',
    dataIndex: 'time',
    key: 'time',
  },
]

export default function Songs(props) {
  const [tag, setTag] = useState('全部')

  //loading
  const [loading, setloading] = useState(true)

  //列表数据
  const [listData, setListData] = useState([
    {
      key: 1,
      index: '',
      coverImg: '',
      songTitle: '',
      singer: '',
      album: '',
      time: '',
    },
  ])
  //接口所需的参数typeId
  const [typeId, setTypeId] = useState(0)
  //tag点击的回调
  const tagClick = e => {
    setTag(e.target.innerHTML)
    switch (e.target.innerHTML) {
      case '全部':
        setTypeId(0)
        break
      case '欧美':
        setTypeId(96)
        break
      case '华语':
        setTypeId(7)
        break
      case '日本':
        setTypeId(8)
        break
      case '韩国':
        setTypeId(16)
        break
      default:
        break
    }
  }

  useEffect(() => {
    async function fetchData() {
      const { data } = await getSongs(typeId)
      //取20条数据
      data.length = 20
      const arr = []
      data.forEach((item, index) => {
        const obj = {}
        obj.index = index + 1
        obj.coverImg = (
          <img
            onClick={() => props.getSongInfo({ id: item.id, name: item.name })}
            style={{ width: '60px', height: '60px', cursor: 'pointer' }}
            src={item.album.picUrl}
            alt=""
          />
        )
        obj.songTitle = item.name
        obj.singer = item.artists[0].name
        obj.album = item.album.name

        obj.key = index
        // 将时间戳转换成正常的时间
        obj.time = format(item.duration)
        arr.push(obj)
      })
      setListData(arr)
      setloading(false)
    }
    fetchData()
  }, [typeId, props])

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <div>
          {' '}
          {/* 分类标签 */}
          <div className="listClass">
            <ul className="small">
              <li onClick={tagClick} className={tag === '全部' ? 'active' : ''}>
                全部
              </li>
              <li onClick={tagClick} className={tag === '欧美' ? 'active' : ''}>
                欧美
              </li>
              <li onClick={tagClick} className={tag === '华语' ? 'active' : ''}>
                华语
              </li>
              <li onClick={tagClick} className={tag === '日本' ? 'active' : ''}>
                日本
              </li>
              <li onClick={tagClick} className={tag === '韩国' ? 'active' : ''}>
                韩国
              </li>
            </ul>
          </div>
          {/* 歌单 */}
          <Table columns={columns} dataSource={listData} pagination={false} />
        </div>
      )}
    </>
  )
}
