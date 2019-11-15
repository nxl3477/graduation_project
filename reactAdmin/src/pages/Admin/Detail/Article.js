import React from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getArticleDetail } from './store/actionCreators'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;



class DetailArticle extends React.Component {
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

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
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
    this.props.getCurArticle(group_id)
  }



  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const { article } = this.props

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
          span: 12,
          offset: 6,
        },
        sm: {
          span: 12,
          offset: 6,
        },
      },
    };


    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              文章标题&nbsp;
              <Tooltip title="该头条的文章标题">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('title', {
            initialValue: article.title,
            rules: [{
              type: 'string', message: '请正确填写视频标题',
            }, {
              required: true, message: '请填写视频标题',
            }]
          })(
            <Input />
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
            initialValue: article.avatar,
            rules: [{ required: true, message: '请填写发布者头像', whitespace: true }]
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
            initialValue: article.auther,
            rules: [{ required: true, message: '请填写发布者名称', whitespace: true }]
          })(
            <Input />
          )}
        </FormItem>
        
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              文章内容&nbsp;
              <Tooltip title="文章主体?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('body', {
            initialValue: article.body,
            rules: [{ required: true, message: '请填写文章内容' }]
          })(
            <Input />
          )}
        </FormItem>
        <div>
          <center><Button type="primary" htmlType="submit">保存</Button></center>
        </div>
      </Form>
    );
  }
}

const mapState2Props = state => ({
  article: state.get('detail').get('article').toJS()
})

const mapDispatch2Props = dispatch => ({
  getCurArticle(group_id) {
    dispatch(getArticleDetail(group_id))
  }
})


const WrappedArticle = Form.create()(DetailArticle);

export default connect(mapState2Props, mapDispatch2Props)(withRouter(WrappedArticle))