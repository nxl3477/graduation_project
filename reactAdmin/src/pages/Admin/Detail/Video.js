import React, { Component } from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, message  } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment';

import { getVideoDetail } from './store/actionCreators'
import MetaWindow from '../../../components/MetaWindow'
import './index.scss'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;




 class DetailVideo extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return console.log('Received values of form: ', values);
      message.success('修改成功')
    });
  }


  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  componentDidMount(){
    const { group_id } = this.props.match.params
    this.props.getCurVideo(group_id)
  }



  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { video } = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              视频标题&nbsp;
              <Tooltip title="该头条的视频标题?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('title', {
            initialValue: video.title,
            rules: [{
              type: 'string', message: '请正确填写视频标题',
            }, {
              required: true, message: '请填写视频标题',
            }],
          })(
            <Input />
          )}
        </FormItem>
      
        <FormItem
          {...formItemLayout}
          label="视频地址"
          label={(
            <span>
              视频地址&nbsp;
              <Tooltip title="该头条的视频地址(网络地址)?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('soure', {
            initialValue: video.soure,
            rules: [{
              required: true, message: '请输入视频地址',
            }],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              头像&nbsp;
              <Tooltip title="该头条的发布者头像?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('avatar', {
            initialValue: video.avatar,
            rules: [{ required: true, message: '请填写发布者头像', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              发布者&nbsp;
              <Tooltip title="该头条的发布者名称">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('auther', {
            initialValue: video.auther,
            rules: [{ required: true, message: '请填写发布者名称', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              浏览次数&nbsp;
              <Tooltip title="浏览次数">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('open_times', {
            initialValue: video.open_times,
            rules: [{ required: true, message: '请输入点赞次数' }],
          })(
            <Input />
          )}
        </FormItem>
    
        <div>
          <center><Button type="primary" htmlType="submit">保存</Button></center>
        </div>
      </Form>
    )
  }
}

const mapState2Props = state => ({
  video: state.get('detail').get('video').toJS()
})

const mapDispatch2Props = dispatch => ({
  getCurVideo(group_id) {
    dispatch(getVideoDetail(group_id))
  }
})



const WrappedVideo = Form.create()(DetailVideo);
export default connect(mapState2Props, mapDispatch2Props)(withRouter(WrappedVideo))