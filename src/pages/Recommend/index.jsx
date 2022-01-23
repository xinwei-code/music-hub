import React, { useState, useEffect, Fragment, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pagination } from 'antd'

import { getDescription, getPlayList } from '../../Api/recommend'
import './index.css'

const tagList = [
  '全部',
  '欧美',
  '华语',
  '流行',
  '说唱',
  '摇滚',
  '民谣',
  '电子',
  '轻音乐',
  '影视原声',
  'ACG',
  '怀旧',
]
export default function Recommend() {
  //头部数据
  const [recommendData, setRecommendData] = useState({})
  //分类tag
  const [curTag, setCurTag] = useState('全部')
  //歌单列表
  const [playlist, setplaylist] = useState([])
  //当前页码
  const [curPage, setCurPage] = useState(1)
  // 歌单总数
  const [total, setTotal] = useState(0)
  //获取头部数据
  const getDescData = useCallback(async () => {
    const { playlists } = await getDescription(1, curTag)
    setRecommendData(playlists[0])
    // console.log(playlists[0])
  }, [curTag])
  // 导航
  const navigate = useNavigate() 
  //获取歌单分类数据
  const getPlayListData = useCallback(async () => {
    const { playlists, total } = await getPlayList(curTag, 12, curPage)
    console.log(playlists)
    //更新歌单列表状态
    setplaylist(playlists)
    //更新歌单总数
    setTotal(total)
    // console.log(playlists)
    // console.log(total)
  }, [curTag, curPage])

  //模拟生命周期
  useEffect(() => {
    getDescData()
    getPlayListData()
  }, [getPlayListData,getDescData])

  //点击分类标签的回调
  const handleTagClick = index => {
    return e => {
      getDescData()
      setCurTag(tagList[index])

      //使页码变为1
      setCurPage(1)
    }
  }

  // 分页器页码改变
  const onChange = pageNumber => {
    // getPlayListData(curTag, 12, pageNumber)
    //更新当前页码
    setCurPage(pageNumber)
    // console.log('Page: ', pageNumber)
  }

  //页码大小改变时的回调
  const onShowSizeChange = (e, b) => {
    console.log(e, b)
  }

  return (
    <Fragment>
      <div className="introduce-box">
        <div
          className="bg-mask"
          style={{ backgroundImage: `url(${recommendData.coverImgUrl})` }}
        ></div>
        <div className="recommend-header">
          <img
            className="recommend-header-img"
            src={recommendData.coverImgUrl}
            alt=""
          />
          <div className="recommend-header-right">
            <span className="classify-icon">精品歌单</span>
            <p className="songlist-desc">{recommendData.description}</p>
          </div>
        </div>
      </div>
      {/* 分类标签 */}
      <ul className="recommend-classification">
        {tagList.map((tag, index) => {
          return (
            <li
              key={index}
              onClick={handleTagClick(index)}
              className={curTag === tagList[index] ? 'classify-active' : ''}
            >
              {tag}
            </li>
          )
        })}
      </ul>

      <div className="recommend-songslist">
        {playlist.map((item, index) => {
          return (
            <div key={index} onClick={() => navigate('/songslist?id=' + item.id)}>
              <img src={item.coverImgUrl} alt="" />
              <span>{item.name}</span>
            </div>
          )
        })}
      </div>

      {/* 分页器 */}
      <Pagination
        showQuickJumper
        pageSizeOptions={['12', '24', '36', '48']}
        current={curPage}
        defaultCurrent={1}
        defaultPageSize={12}
        total={total}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />
    </Fragment>
  )
}
