import React, { PureComponent } from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { Layout, Menu, Icon, Breadcrumb, Button } from 'antd';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { getTypes } from './store/actionCreators'
import Chart from './Chart'
import Types from './Types'
import Articles from './Articles'
import Videos from './Videos'
import Users from './Users'
import DetailArticle from './Detail/Article.index'
import DetailVideo from './Detail/Video.index'
import User from '../../components/User'
import Blogs from './Blogs'
import { changeUserIsLogin } from '../../store/actionCreator'
import './index.scss'
const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

const routerRules = [
  { path: '/index', exact: true, component: Chart },
  { path: '/types', exact: true, component: Types },
  { path: '/articles', exact: true, component: Articles },
  { path: '/blogs', exact: true, component: Blogs },
  { path: '/users', exact: true, component: Users },
  { path: '/videos', exact: true, component: Videos },
  { path: '/detail/article/:group_id', exact: true, component: DetailArticle },
  { path: '/detail/video/:group_id', exact: true, component: DetailVideo },
  { path: '/login/', exact: true, component: Admin }
]


const headMenu = [
  { title: '标题一' },
  { title: '标题二' },
  { title: '标题三' },
  { title: '标题四' },
  { title: '标题五' },
  { title: '标题六' }
]


class Admin extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      isMenuFold: false,
      isVisible: false,
      headMenu
    }
    this.defPath = this.props.match.path,
    this.leftMenuGener = this.leftMenuGener.bind(this)
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  headMenuHandle = (e, { type, index, to}) => {
    switch(type){
      case 'del':
        e.stopPropagation()
        let headMenu = [ ...this.state.headMenu]
        headMenu.splice(index, 1)
        this.setState({ headMenu })
        break;
      case 'cut':
        this.props.history.push(to)
        break;
    }
  }


  /**
   * 数组生成 元素
   * path: `${this.state.defPath}${rule.path}`}
   * @param {Array} rules
   * @return { Element-Array }
   */
  routerGener = rules => rules.map((rule, index) => ( <Route {...{ ...rule, path: `${this.defPath}${rule.path}` }}   key={index} /> ))
  headMenuGener = rules => rules.map((rule, index) => {
    const { to } = rule
    return (
      <Menu.Item key={index}
        // 路由跳转
        onClick={ (e) => this.headMenuHandle(e, {type: 'cut', index, to })} >
          { rule.title }
          <Icon type="close"   
            theme="outlined"  
            style={{marginLeft: 5}}
            // 删除标签
            onClick={ (e) => this.headMenuHandle(e , {type: 'del', index, to })} 
          />
      </Menu.Item> 
    )
  })

  /**
   *  递归生成 menu 菜单
   *
   * @returns
   * @memberof nxl
   */
  leftMenuGener(rules) {
    let num = 0
    const returnMenuIcon = (title) => {
      return num > 1 ? {} : { title: ( <span><Icon type="appstore" /><span>{title}</span></span> ) }
    }
    const deepLoop = children => children.map( c => {
      const { children } = c
      
      const aa = (children && children.length > 0 ) ? 
        ( <SubMenu {...{...c, ...returnMenuIcon(c.title) }} >{ deepLoop(children) } </SubMenu> ) : 
        ( <Menu.Item key={c.key} >{ c.title }</Menu.Item> )
      return aa
    })
    return deepLoop(rules)
  }

  showUserHandle = (isVisible) => {
    this.setState(()=>({
      isVisible
    }))
  }

  /**
   * 菜单栏是否收起
   *  
   * @memberof nxl
   */
  changeMenuStatusHandle = () => {
    const isMenuFold = !this.state.isMenuFold
    this.setState(()=>({ isMenuFold }))
  }

  componentDidMount(){
    this.props.thisGetTypesHandle()
  }

  render() {
    const SideWidth = 220
    const { isMenuFold, headMenu, isVisible } = this.state
    const { userInfo, isLogin, logoutHandle } = this.props
    return (
     
      <Layout>
        <Header className="header" style={{padding: 0}}>
          <Layout>
            <Sider width={SideWidth} style={{ background: '#fff' }} collapsed={ isMenuFold } > 
              <NavLink to="/home" >
                <div className="admin-logo">
                  {/* <img src="/assets/logo-ant.svg" alt=""/> */}
                  { isMenuFold ? null : <span className="title" > 头条后台管理系统</span> }
                </div>
              </NavLink>
            </Sider>
            <Content >
              <div className="head-wrap" > 
                <div className="menu-iib" onClick={this.changeMenuStatusHandle} >
                  <Icon 
                    type={ isMenuFold? 'menu-unfold' : 'menu-fold' }  
                    className="pointer ant-menu-item" theme="outlined" 
                  />
                </div>
                <User 
                  showHandle={()=> this.showUserHandle(true)}
                  userInfo={userInfo} 
                  isVisible={isVisible} 
                  onClose={()=> this.showUserHandle(false)}
                  logout={logoutHandle}
                />
                {/* <Menu
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ lineHeight: '62px', border: 'none' }}
                > 
                { this.headMenuGener(headMenu) }
                </Menu> */}
              </div>
            </Content>
          </Layout>
        </Header>
        {/* 左侧布局 */}
        <Layout>
          <Sider width={SideWidth} style={{ background: '#001529' }} collapsed={ isMenuFold } >
            {/* 菜单 */}
            <Menu theme="dark"   defaultSelectedKeys={['1']} >
              <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>数据中心</span></span>}>
                <Menu.Item key="11"><Link to="/admin/index">数据分析</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>头条管理</span></span>}>
                <Menu.Item key="12"><Link to="/admin/types">类别管理</Link></Menu.Item>
                <Menu.Item key="13"><Link to="/admin/articles">文章头条</Link></Menu.Item>
                <Menu.Item key="14"><Link to="/admin/videos">视频头条</Link></Menu.Item>
                {/* <Menu.Item key="15"><Link to="/admin/detail/article">文章详情</Link></Menu.Item>
                <Menu.Item key="16"><Link to="/admin/detail/video">视频详情</Link></Menu.Item> */}
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>用户管理</span></span>}>
                <Menu.Item key="31"><Link to="/admin/users">用户列表</Link></Menu.Item>
                <Menu.Item key="32"><Link to="/admin/blogs">登录日志</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px 24px 24px' }}>
            {/* 面包屑 */}
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <Content style={{ background: '#fff', padding: 24, margin: 0}}>
              <Switch>
                { isLogin ? null : <Redirect to="/login" /> }
                { this.routerGener( routerRules ) }
                <Redirect to="/admin/index" />
              </Switch>
            </Content>
          </Layout>
        </Layout>
        {/* 抽屉 */}
      </Layout>
    );
  }
}

const mapState2Props = state => ({
  isLogin: state.get('global').get('isLogin'),
  userInfo: state.get('global').get('userInfo').toJS()
})

const mapDispatch2props = dispatch => ({
  thisGetTypesHandle(){
    dispatch(getTypes())
  },
  logoutHandle() {
    localStorage.clear()
    dispatch(changeUserIsLogin(false))
  }
})

export default connect(mapState2Props, mapDispatch2props)(Admin)
