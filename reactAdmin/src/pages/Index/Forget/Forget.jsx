/* eslint react/no-string-refs:0, array-callback-return:0, react/forbid-prop-types:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Input, Form } from 'antd'
import { connect } from 'react-redux'
import { forgetActionAsync } from '../../../store/actionCreator'
import './index.scss'
const FormItem = Form.Item;



class LoginForm extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { forgetHandle, form } = this.props
    form.validateFields((err, values) => {
      if (err) return  console.log('Received values of form: ', values);
      // console.log('信息', values)
      forgetHandle(values)
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="user-login">
        <div className="form-container">
          <h4 className="form-title">忘记密码</h4>

          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('user_name', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input  className="login-input"  placeholder="用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入绑定的邮箱!' }],
              })(
                <Input className="login-input" type="email" placeholder="邮箱" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('tell', {
                rules: [{ required: true, message: '请输入绑定的手机号码!' }],
              })(
                <Input className="login-input" type="tell" placeholder="手机号码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('user_pwd', {
                rules: [{ required: true, message: '请输入新密码!' }],
              })(
                <Input className="login-input" type="password" placeholder="新密码" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-button">找回密码</Button>
              <div className="link-wrap">
                <Link to="/login" className="link">重新登录</Link>
                <Link to="/register" className="link" >重新注册</Link>
              </div>
            </FormItem>
          </Form>

        </div>
      </div>
    );
  }
}


const mapDispatch2Props = dispatch => ({
  forgetHandle(info) {
    dispatch(forgetActionAsync(info))
  }
})



const WrappedNormalLoginForm = Form.create()(LoginForm);
export default connect(null, mapDispatch2Props)(WrappedNormalLoginForm);
