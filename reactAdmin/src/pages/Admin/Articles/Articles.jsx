import React from 'react'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Skeleton, Modal } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getArticles, updateThisArticle, deleteThisArticle } from './store/actionCreators'
import EditModal from '../../../components/EditModal'
import Preview from '../../../components/Preview'
import './index.scss'

const FormItem = Form.Item;


class Article extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      showImgView: false,
      showEditModal: false,
      currentEdit: null,
      currentImg: ''
     };
    this.columns = [
      { title: 'group_id', key:'group_id', dataIndex: 'group_id', width: '200px' },
      { title: '标题', key:'title', dataIndex: 'title', width: '300px' },
      { title: '封面', key:'img_holder', dataIndex: 'img_holder', width: '600px', render: (imgs)=>{
        const arr = imgs.split(',')
        return (
          <div>
            { arr[0] ? arr.map(ele => <img className="img-holder" onClick={()=>this.showImgCover(ele)} key={ele} src={ele}/>) : '无封面' }
          </div>
        )
      } },
      { title: '作者', key:'auther', dataIndex: 'auther', width: '150px'  },
      { title: '评论数', key:'com_number', dataIndex: 'com_number', width: '150px' },
      { title: '类别', key:'type_id', dataIndex: 'type_id', width: '80px' },
      { title: '操作' ,width: '13%',
        render: ({ id, group_id }) => {
          return (
            <div>
              <Link to={`/admin/detail/article/${group_id}`} ><Button type="primary" style={{'margin': '0 8px 8px 0'}} >查看</Button></Link>
              <Button type="primary" style={{'margin': '0 8px 8px 0'}} onClick={()=>this.edit(id)} >编辑</Button>
              <Button type="danger" onClick={()=> this.delThis(id)}>删除</Button>
            </div>
          );
        },
      },
    ];
    this.cancelHandle = this.cancelHandle.bind(this)
    this.showImgCover = this.showImgCover.bind(this)
  }


  showImgCover(url) {
    this.setState(()=>({
      showImgView: true,
      currentImg: url
    }))
  }

  // isEditing = (id) => {
  //   return id === this.state.editingKey;
  // };

  edit = (id)=>{
    const currentEdit = this.props.articlesList.find( item=>id === item.id)
    this.setState(()=>({
      showEditModal: true,
      currentEdit
    }))
  }

  // save = (form, id) =>{
  //   // row 是当前编辑中, 当前行表单数据
  //   form.validateFields( async (error, row) => {
  //     if (error) return false
  //     this.props.updateNewDataToArticles({id, ...row})
  //   });
  // }

  // cancel = () => {
  //   this.setState({ editingKey: '' });
  // };

  delThis = id =>{
    this.props.deleteThisArticleHandle(id)
  }

  componentDidMount (){
    this.props.thisGetArticlesHandle()
  }

  cancelHandle(key) {
    this.setState(()=>({
      [key]: false
    }))
  }


  render() {
    const columns = this.columns.map((col) => col)
 
    const { articlesList, typesList, isLoading, updateNewDataToArticles } = this.props
    const { showImgView, currentImg, showEditModal, currentEdit } = this.state
    return (
      <Skeleton  paragraph={{ rows: 20 }} loading={isLoading}> 
        <Preview  
          visible={showImgView}
          url={currentImg}
          cancelHandle={()=> this.cancelHandle('showImgView')}
          />
          { showEditModal ? 
            <EditModal 
              typesList={typesList}
              visible={showEditModal}
              dataSource={currentEdit}
              cancelHandle={ ()=> this.cancelHandle('showEditModal')} 
              updateHandle={updateNewDataToArticles}
              /> : null }
        { 
          articlesList.length > 1 ? <Table
            bordered
            rowKey="id"
            dataSource={articlesList}
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
  articlesList: state.get('articles').get('articlesList').toJS(),
  typesList: state.get('admin').get('typesList').toJS()
})
const mapDispatch2props = dispatch => ({
  thisGetArticlesHandle(){
    dispatch(getArticles())
  },
  updateNewDataToArticles(data){
    dispatch(updateThisArticle(data))
  },
  deleteThisArticleHandle(id){
    dispatch(deleteThisArticle(id))
  }
})


const ArticleConnect = connect(mapState2Props, mapDispatch2props)(Article)
export default ArticleConnect