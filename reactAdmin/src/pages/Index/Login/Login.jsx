/* eslint react/no-string-refs:0, array-callback-return:0, react/forbid-prop-types:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Input, Form } from 'antd'
import { connect } from 'react-redux'
import { loginActionAsync } from '../../../store/actionCreator'
import './index.scss'
const FormItem = Form.Item;



class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.loginRecord = localStorage.getItem('loginRecord') || ''
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const { loginHandle, form } = this.props
    form.validateFields((err, values) => {
      if (err) return console.log('Received values of form: ', values);
      const { user_name, remember } = values
      const loginRecord = remember ? user_name : ''
      localStorage.setItem('loginRecord', loginRecord)
      loginHandle(values)
    })
  }



  render() {
    const { loginRecord } = this
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="user-login">
        <div className="form-container">
          <h4 className="form-title">登录</h4>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('user_name', {
                initialValue: loginRecord,
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input  className="login-input" placeholder="用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('user_pwd', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input className="login-input" type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住账号</Checkbox>
              )}
              <Button type="primary" htmlType="submit" className="login-button">登录</Button>
              <div className="link-wrap">
                <Link to="/register" className="link">立即注册</Link>
                <Link to="/forget" className="link" >找回密码</Link>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const mapState2Props = (state) => ({
  // userInfo: state.get('global').get('userInfo').toJS()
})

const mapDispatch2Props = (dispatch) => ({
  loginHandle(info){
    dispatch(loginActionAsync(info))
  }
})

const WrappedNormalLoginForm = Form.create()(LoginForm);
export default connect(mapState2Props, mapDispatch2Props)(WrappedNormalLoginForm);
