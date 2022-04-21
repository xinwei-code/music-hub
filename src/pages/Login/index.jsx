import React from 'react'
import { Input, Button, Form, Checkbox, message, Card } from 'antd'

import { loginByCellphone } from '../../Api/login'

import './index.css'

export default function Login(props) {
  const onFinish = async values => {
    const { code, profile, token } = await loginByCellphone(
      values.username,
      values.password
    )
    if (code !== 200) {
      return message.error('登陆失败，账号或密码错误!')
    }
    props.getUserInfo(profile, token)
  }
  const onFinishFailed = error => {
    console.log(error)
  }

  return (
    <div className='login-wrap'>
      <Card
        headStyle={{ textAlign: 'center', fontWeight: '700' }}
        title="登录网易云"
        style={{ width: 350,overflow:'hidden' }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="手机号"
            name="手机号"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="密码"
            rules={[{ required: true, message: 'Please input your password!' }]}
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
