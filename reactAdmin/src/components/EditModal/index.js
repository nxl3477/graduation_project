import React, {Component} from 'react'
import { Upload, Icon, Modal, Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class EditModal extends Component {

  constructor(props){
    super(props)
    const { dataSource } = props
    const fileList = dataSource.img_holder.split(',').reduce((prev, next ,index) =>{
      if(next){
        prev.push({
          uid: index,
          name: 'xxx.png',
          status: 'done',
          url: next
        })
      }
      return prev
    }, [])
    this.state = {
      fileList
    }
  }

 
  handlePreview = () =>{
    console.log('预览图片')
  }

  handleCancelThis = (arr) => {
    const fileList = arr.fileList
    this.setState(()=>({
      fileList
    }))
  }

  save = (form, id) => {
   
    // row 是当前编辑中, 当前行表单数据
    form.validateFields( async (error, row) => {
      if (error) return false
      this.props.updateNewDataToFalls({id, ...row})
    });
  }

  handleOk = () => {
    const { form, dataSource } = this.props
    const { fileList } = this.state
    console.log('fileList', fileList)
    const img_holder = fileList.map(item=>item.url).join(',')
    form.validateFields( async (error, row) => {
      const data = {...dataSource, ...row, img_holder}
      this.props.updateHandle(data)
    });
    this.props.cancelHandle()
  }


  render(){
    const { cancelHandle,  visible, dataSource, typesList, form, imgLength=3 } = this.props
    const { fileList } = this.state
    const { getFieldDecorator } = form
    
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    }

    return (
      <Modal 
        title={`编号: ${dataSource.group_id}`}
        visible={visible} 
        onCancel={cancelHandle}
        onOk={this.handleOk}
        // confirmLoading={confirmLoading}
        >
           <FormItem
            {...formItemLayout}
            label="标题:"
          >
            {getFieldDecorator('title', {
              initialValue: dataSource.title,
              rules: [{
                type: 'string', message: '请输入正确格式的标题',
              }, {
                required: true, message: '请输入标题',
              }],
            })(
              <Input placeholder="头条标题" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="作者:"
          >
            {getFieldDecorator('auther', {
              initialValue: dataSource.auther,
              rules: [{
                type: 'string', message: '请输入正确的作者名',
              }, {
                required: true, message: '请输入作者',
              }],
            })(
              <Input placeholder="作者" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="分类:"
          >
            {getFieldDecorator('type_id', {
              initialValue: dataSource.type_id ,
              rules: [{ required: true, message: '请输入分类' }],
            })(
              <Select
                placeholder="请选择"
                // onChange={this.handleSelectChange}
              >
                {typesList.map(item => <Option value={item.id} key={item.id}>{item.type_name}</Option>)}
              </Select>
            )}
          </FormItem>
          {/* 封面 */}
          <FormItem
            {...formItemLayout}
            label="封面:"
          >
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleCancelThis}
            >
              {fileList.length >= imgLength ? null : uploadButton}
            </Upload>
          </FormItem>
      </Modal>
    )

  }
  
 
}

export default  Form.create()(EditModal)
