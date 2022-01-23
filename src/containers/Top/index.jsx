import { connect } from 'react-redux'
import { useEffect } from 'react'

// 引入action
import { login, logout } from '../../redux/actions/user'

//引入ui组件
import Top from '../../components/Top'

export default connect(state => ({ user: state.user }), { login, logout })(
  props => {
    useEffect(() => {
      props.login()
    }, [props])
    return <Top />
  }
)
