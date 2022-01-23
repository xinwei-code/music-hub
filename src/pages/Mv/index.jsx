import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getAllMV } from '../../Api/mv'
import './index.css'

const filterData = {
  place: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
  type: ['全部', '官方版', '原声', '现场版', '网易出品'],
  order: ['上升最快', '最热', '最新'],
}

export default function Mv() {
  const [area, setarea] = useState('全部')
  const [type, setType] = useState('全部')
  const [order, setorder] = useState('上升最快')
  // mv列表数据
  const [mvList, setmvList] = useState([])
  // 使用路由导航
  const navigate = useNavigate()
  //获取列表数据
  const getMvList = useCallback(async () => {
    const { data } = await getAllMV(area, type, order)
    setmvList(data)
  }, [area, type, order])

  useEffect(() => {
    getMvList()
  }, [getMvList])

  return (
    <div className="mvs-container">
      <div className="filter_wrap">
        <div className="place_wrap">
          <span>地区:</span>
          <ul>
            {filterData.place.map((item, index) => {
              return (
                <li
                  onClick={() => setarea(item)}
                  className={item === area ? 'active' : ''}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                  key={index}
                >
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="type_wrap">
          <span>类型:</span>
          <ul>
            {filterData.type.map((item, index) => {
              return (
                <li
                  onClick={() => setType(item)}
                  className={item === type ? 'active' : ''}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                  key={index}
                >
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="order_wrap">
          <span>排序:</span>
          <ul>
            {filterData.order.map((item, index) => {
              return (
                <li
                  onClick={() => setorder(item)}
                  className={item === order ? 'active' : ''}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                  key={index}
                >
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="mv_wrap">
        {mvList.map((item, index) => {
          return (
            <div
              className="mv-item"
              key={index}
              onClick={() =>
                navigate(`/mvlist?id=${item.id}&artistId=${item.artistId}`)
              }
            >
              <img src={item.cover} alt="" />
              <span>{item.name}</span>
              <br />
              <span style={{ color: '#ccc' }}>{item.artistName}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
