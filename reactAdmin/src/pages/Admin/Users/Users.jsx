import React from 'react'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Skeleton } from 'antd';
import { connect } from 'react-redux'
import axios from 'axios'
import { getUsers, deleteThisUser } from './store/actionCreators'

const FormItem = Form.Item;
// 
const EditableContext = React.createContext();
// 
const EditableRow = ({ form, index, ...props }) => {
  // console.log('props', props, '其中有当前行的五列子元素')
  return (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  )
}

// 包装的组件将会自带
const EditableFormRow = Form.create()(EditableRow);

// 绑定form 验证
class EditableCell extends React.PureComponent  {
  getInput = () => (( this.props.inputType === 'number' )? <InputNumber /> : <Input /> )

  render() {
    const { editing, dataIndex, title, inputType, record, index, ...restProps } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      // required: true,
                      // message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class Types extends React.PureComponent  {
  constructor(props) {
    super(props);
    this.state = { editingKey: '' };
    this.columns = [
      { title: 'ID',key:'id', dataIndex: 'id', width: '5%', editable: true },
      { title: '昵称', key:'nickName', dataIndex: 'nickName', editable: true },
      { title: '头像', key:'avatarUrl', dataIndex: 'avatarUrl', editable: true },
      { title: 'openid', key:'openid', dataIndex: 'openid', editable: true },
      { title: '性别', key:'gender', dataIndex: 'gender', editable: true },
      { title: 'session_key', key:'session_key', dataIndex: 'session_key', editable: true },
      { title: '操作时间' ,width: '15%',
        render: ({ id }) => {
          return (
            <div>
              <span>
                <Button type="danger" onClick={()=> this.delThis(id)}>删除</Button>
              </span>
            </div>
          )
        }
      }
    ]
  }



  save = (form, id) =>{
    // row 是当前编辑中, 当前行表单数据
    form.validateFields( async (error, row) => {
      if (error) return false
      this.props.updateNewDataToBlogs({id, ...row})
      this.setState({ editingKey: '' })
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  delThis = id =>{
    this.props.deleteThisUsersHandle(id)
  }

  componentWillMount() {
    this.props.getUsersList()
  }


  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {

      return !col.editable ? col : {
        ...col, onCell: record => {
          return {
            record,
            inputType: 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: false
          }
        },
      }
    })
    const { usersList, isLoading } = this.props
    return (
      <Skeleton  paragraph={{ rows: 20 }} loading={isLoading}> 
        { 
          usersList.length > 1 ? <Table
            components={components}
            bordered
            rowKey="id"
            dataSource={usersList}
            columns={columns}
            rowClassName="editable-row"
          /> : null
        }
      </Skeleton> 
    );
  }
}
const mapState2Props = state => ({
  isLoading: state.get('global').get('isLoading'),
  usersList: state.get('users').get('usersList').toJS()
})
const mapDispatch2props = dispatch => ({
  getUsersList(){
    dispatch(getUsers())
  },
  deleteThisUsersHandle(id){
    dispatch(deleteThisUser(id))
  }
})



export default connect(mapState2Props, mapDispatch2props)(Types)