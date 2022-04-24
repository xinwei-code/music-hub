import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Input, Button, Form, Checkbox, message, Card } from 'antd'

import { login } from '../../redux/actions/user'
import { loginByCellphone } from '../../Api/login'

import './index.css'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //先展示loading效果
  const onFinish = async values => {
    message.loading('登录中。。。', 0)
    const { code, profile, token } = await loginByCellphone(
      values.phone,
      values.password
    )
    if (code !== 200) {
      return message.error('登陆失败，账号或密码错误!')
    }
    //将用户信息保存到容器
    dispatch(login({ profile, token }))
    //路由跳转到个人主页
    navigate('/discover', { replace: true })
    //展示登录成功loading, 先销毁上一个message
    message.destroy()
    message.success('登陆成功')
  }

  return (
    <div className="login-wrap">
      <Card
        headStyle={{ textAlign: 'center', fontWeight: '700' }}
        title="登录网易云"
        style={{ width: 350, overflow: 'hidden' }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '手机号不能为空！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '密码不能为空！' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
