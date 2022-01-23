import React from 'react'
import { connect } from 'react-redux'
import Home from '../../pages/Home'

export default connect(state => ({ user: state.user }))(props => {
    return <Home user={ props.user}/>
})
