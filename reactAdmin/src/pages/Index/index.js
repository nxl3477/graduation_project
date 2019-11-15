import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import UserLayout from '../../layouts/UserLayout'
import Register from './Register'
import Login from './Login'
import Forget from './Forget'
import './index.scss'

 class XIndex extends Component {
  render() {
    const { isLogin } = this.props
    return (
      <UserLayout>
        {/* 如果已经登录则拦截其进入登录界面 */}
        { isLogin ? <Redirect to="/admin/index" /> : null }
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/forget" exact component={Forget}></Route>
          <Redirect to="/login" />
        </Switch>
      </UserLayout>
    )
  }
}

const mapState2Props = state => ({
  isLogin: state.get('global').get('isLogin')
})

export default connect(mapState2Props)(XIndex)