import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//引入action
import { login, logout } from '../../redux/actions/user'
// Login路由组件
import Login from '../../pages/Login'

export default connect(state => ({ user: state.user }), { login, logout })(
  props => {
    const navigate = useNavigate()
    const getUserInfo = (profile, token) => {
      props.login({ profile, token })
      // 跳转到个人主页
      navigate('/home', { replace: true })
    }
    return <Login getUserInfo={getUserInfo}></Login>
  }
)
