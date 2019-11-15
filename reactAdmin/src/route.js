import React, { Component, Fragment } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { authCheckAsync } from './store/actionCreator'
import Admin from './pages/Admin';
import Index from './pages/Index'

const routerRules = [
  { path: '/admin', component: Admin, key: 1 },
  { path: '/', component: Index, key: 0 }
]

// 数组映射路由组件
const routerGener = (rules) => rules.map((rule, index) => <Route {...rule } key={rule.key} ></Route> )


class MyRoute extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { checkLoginHandle } = this.props
    checkLoginHandle()
  }

  render() {
    const { isLogin } = this.props
    return (
      <Fragment>
        <HashRouter>
          <Fragment>
            {/* 第一层路由在这， 剩下的路由写在各自的文件 */}
            { isLogin ? <Redirect to="/admin/index" /> : <Redirect to="/login" /> }
            <Switch>
              { routerGener(routerRules) }
            </Switch>
          </Fragment>
        </HashRouter>
      </Fragment>
    )
  }
}

const mapState2Props = (state) => ({
  isLogin: state.get('global').get('isLogin')
})

const mapDispatch2Props = dispatch => ({
  checkLoginHandle(){
    dispatch(authCheckAsync())
  }
})

export default connect(mapState2Props, mapDispatch2Props)(MyRoute)