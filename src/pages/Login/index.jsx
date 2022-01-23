import React from 'react'
import { Input, Button, Form, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { loginByCellphone } from '../../Api/login'

import './index.css'

export default function Login(props) {
  //   const [userInfo, setUserInfo] = useState({})
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

  return (
    <div className="login-contarner">
      <h3 style={{ textAlign: 'center', fontWeight: '700' }}>登录网易云</h3>
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入手机号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            style={{ width: '100%', borderRadius: '8px', height: '40px' }}
            type="primary"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
