import React from 'react'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Skeleton } from 'antd';
import { connect } from 'react-redux'
import axios from 'axios'
import { updateThisType, deleteThisType } from '../store/actionCreators'

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
      { title: 'ID',key:'id', dataIndex: 'id', width: '5%', editable: true, },
      { title: '类别名称', key:'type_name', dataIndex: 'type_name', editable: true, },
      { title: '文章类地址', key:'article', dataIndex: 'article', editable: true, },
      { title: '视频类地址', key:'video', dataIndex: 'video', editable: true, },
      { title: '操作' ,width: '15%',
        render: ({ id }) => {
          const editable = this.isEditing(id);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <Button
                        href="javascript:;"
                        onClick={() => this.save(form, id)}
                        style={{ marginRight: 8 }}
                      >保存
                      </Button>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="确认退出编辑?"
                    onConfirm={() => this.cancel(id)}
                  >
                    <Button>取消</Button>
                  </Popconfirm>
                </span>
              ) : (
                <span> 
                  <Button type="primary" style={{'margin': '0 8px 8px 0'}} onClick={() => this.edit(id)}>编辑</Button>
                  <Button type="danger" onClick={()=> this.delThis(id)}>删除</Button>
                </span>
                
              )}
            </div>
          );
        },
      },
    ];
  }


  isEditing = (id) => {
    return id === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  save = (form, id) =>{
    // row 是当前编辑中, 当前行表单数据
    form.validateFields( async (error, row) => {
      if (error) return false
      this.props.updateNewDataToTypes({id, ...row})
      this.setState({ editingKey: '' })
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  delThis = id =>{
    this.props.deleteThisTypesHandle(id)
  }


  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      // console.log('col', col)
      return !col.editable ? col : {
        ...col, onCell: record => {
          return {
            record,
            inputType: 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: col.dataIndex !== 'id' ? this.isEditing(record.id) : false,
          }
        },
      }
    })
    const { typesList, isLoading } = this.props
    return (
      <Skeleton  paragraph={{ rows: 20 }} loading={isLoading}> 
        { 
          typesList.length > 1 ? <Table
            components={components}
            bordered
            rowKey="id"
            dataSource={typesList}
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
  typesList: state.get('admin').get('typesList').toJS()
})
const mapDispatch2props = dispatch => ({
  updateNewDataToTypes(data){
    dispatch(updateThisType(data))
  },
  deleteThisTypesHandle(id){
    dispatch(deleteThisType(id))
  }
})



export default connect(mapState2Props, mapDispatch2props)(Types)