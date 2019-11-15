/* eslint react/no-string-refs:0, array-callback-return:0, react/forbid-prop-types:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Input, Form, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { registerActionAsync, setRecord } from '../../../store/actionCreator'
import './index.scss'
const FormItem = Form.Item;



class RegisterForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, userRegsiterHandle } = this.props
    form.validateFields((err, values) => {
      if (err) return console.log('Received values of form:', values);
      userRegsiterHandle(values)
    });
  }


  componentWillUnmount(){
    const { form, setRecordHandle } = this.props
    form.validateFields((err, values) => {
      if (!err) console.log('Received values of form: ', values);
      const { user_name, email, nick_name } = values
      setRecordHandle({ user_name, nick_name, email })
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoRecord } = this.props

    return (
      <div className="user-login" >
        <div className="form-container">
          <h4 className="form-title">注册</h4>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('user_name', {
                initialValue: autoRecord.user_name,
                rules: [
                  { required: true, message: '请输入用户名!' }
                ],
              })(
                <Input className="login-input" placeholder="用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('nick_name', {
                initialValue: autoRecord.nick_name,
                rules: [
                  { required: true, message: '请输入昵称!' }
                ],
              })(
                <Input className="login-input" placeholder="昵称" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('email', {
                initialValue: autoRecord.email,
                rules: [{ required: true, message: '请输入邮箱!' }],
              })(
                <Input className="login-input" type="email" placeholder="邮箱" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('user_pwd', {
                initialValue: autoRecord.user_pwd,
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input className="login-input" type="password" placeholder="至少6位密码" />
              )}
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('re_user_pwd', {
                  rules: [{ required: true, message: '请输入确认密码!' }],
                })(
                  <Input className="login-input" type="password" placeholder="确认密码" />
                )
              }
            </FormItem>
            <FormItem>
              <Row gutter={10}>
                <Col span={17}>
                  {
                    getFieldDecorator('tell', {
                      rules: [{ required: true, message: '请输入手机号!' }],
                    })(
                      <Input className="login-input" type="tell" placeholder="手机号码" />
                    )
                  }
                </Col>
                <Col span={6}>
                  <Button htmlType="submit" >
                    验证码
                  </Button>
                </Col>
              </Row>
             
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-button">注册</Button>
              <div className="link-wrap">
                <Link to="/login" className="link">已有账号</Link>
                <Link to="/forget" className="link">找回密码</Link>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const mapState2Props = (state) => ({
  autoRecord: state.get('global').get('autoRecord').toJS()
})

const mapDispatch2Props = (dispatch) => ({
  userRegsiterHandle(info){
    dispatch(registerActionAsync(info))
  },
  setRecordHandle(record){
    dispatch(setRecord(record))
  }
})


const WrappedNormalRegisterForm = Form.create()(RegisterForm);
export default connect(mapState2Props, mapDispatch2Props)(WrappedNormalRegisterForm);
