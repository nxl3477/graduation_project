import React, { Component, Fragment } from 'react'
import { Drawer, Divider, Col, Row, Button  } from 'antd'
import './index.scss'

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block'
};

const DescriptionItem = ({ title, content }) => (
  <div className="info-wrap">
    <p className="info-item">
      {title}:
    </p>
    {content}
  </div>
);


class User extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { userInfo, isVisible, onClose , showHandle, logout } = this.props
    return (
      <Fragment>
        <div className="user-window" onClick={showHandle}>
          <img className="avatar"   src={userInfo.avatar} />
          <span className="nick-name">{userInfo.nick_name}</span>
        </div>
        <Drawer
          // width={640}
            placement="right"
            closable={true}
            onClose={onClose}
            visible={isVisible}
          >
          <p style={{ ...pStyle }}>个人资料</p>
          <Divider/>
          <Row>
            <Col>
              <DescriptionItem title="昵称" content={userInfo.nick_name} />{' '}
            </Col>
          </Row>
          <Row>
            <Col>
              <DescriptionItem title="账号" content={userInfo.user_name} />
            </Col>
          </Row>
          <Row>
            <Col>
              <DescriptionItem title="身份" content={userInfo.grade ? '超级管理员' : '普通管理员'} />
            </Col>
          </Row>
          <Row>
            <Col>
              <DescriptionItem title="手机号码" content={userInfo.tell} />
            </Col>
          </Row>
          <Row>
            <Col>
              <DescriptionItem title="邮箱" content={userInfo.email} />
            </Col>
          </Row>
          <div className="logout">
            <Button type="danger" onClick={logout}>退出登录</Button>
          </div>
        </Drawer>
      </Fragment>
    )
  }
}

export default User
