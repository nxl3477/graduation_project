import React, { Component } from 'react';
import  { Row, Col } from 'antd';
import LoginIntro from '../../components/LoginIntro';

const styles = {
  container: {
    position: 'relative',
    width: '100wh',
    minWidth: '1200px',
    height: '100vh',
    backgroundImage: `url(${require('./images/bg.jpg')})`,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
};


export default class UserLayout extends Component {
  static propTypes = {};

  static defaultProps = {};




  render() {
    return (
      <div style={styles.container}>
        <Row >
          <Col span={12}>
            <LoginIntro />
          </Col>
          <Col span={12} >
            <div style={styles.content}>{this.props.children}</div>
          </Col>
        </Row>
      </div>
    );
  }
}


