import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pagination, Tag, Card, Col } from 'antd'

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
const { Meta } = Card
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
  // 导航
  const navigate = useNavigate()

  //模拟生命周期
  useEffect(() => {
    async function fetchData() {
      //  获取头部数据
      const { playlists } = await getDescription(1, curTag)
      setRecommendData(playlists[0])
      //获取歌单分类数据
      const { playlists: data, total } = await getPlayList(curTag, 12, curPage)
      //更新歌单列表状态
      setplaylist(data)
      //更新歌单总数
      setTotal(total)
    }
    fetchData()
  }, [curTag, curPage])

  //点击分类标签的回调
  const handleTagClick = index => {
    return () => {
      setCurTag(tagList[index])
      //使页码变为1
      setCurPage(1)
    }
  }

  // 分页器页码改变
  const onChange = pageNumber => {
    //更新当前页码
    setCurPage(pageNumber)
  }

  //页码大小改变时的回调
  const onShowSizeChange = (e, b) => {
    console.log(e, b)
  }

  return (
    <Fragment>
      <div className="recommend-head">
        <img src={recommendData.coverImgUrl} alt="" />
        <div className="recommend-head-right">
          <h2>精品歌单</h2>
          <span>{recommendData.description}</span>
        </div>
      </div>

      <div className="tag-list">
        {tagList.map((tag, index) => {
          return (
            <Tag
              color="blue"
              style={{ cursor: 'pointer' }}
              key={index}
              onClick={handleTagClick(index)}
            >
              {tag}
            </Tag>
          )
        })}
      </div>

      <div className="recommend-songs">
        {playlist.map((item, index) => {
          return (
            <Col span={6} key={index}>
              <Card
                hoverable
                style={{ width: 240, marginBottom: '10px' }}
                cover={<img alt="" src={item.coverImgUrl} />}
                onClick={() => navigate('/songslist?id=' + item.id)}
              >
                <Meta description={item.name} />
              </Card>
            </Col>
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
