import React from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col, Modal, Icon, Pagination, Skeleton, Anchor } from 'antd'
import { Link } from 'react-router-dom'
import { getVideos, updateThisVideo, deleteThisVideo } from './store/actionCreators'
import Preview from '../../../components/Preview'
import EditModal from '../../../components/EditModal'
import './index.scss'

class Videos extends React.Component{

    constructor(props){
      super(props)
      this.state = {
        page: 1,
        count: 24,
        currentImg: '',
        showImgView: false,
        showEditModal: false,
        currentEdit: null,
        iterFinish: false
      }
      this.cancelHandle = this.cancelHandle.bind(this)
    }
    
    openGallery = (imgSrc)=>{
        this.setState({
          showImgView: true,
          currentImg: imgSrc
        })
    }

    pageChangeHandle = (page, count) =>{
      this.setState(()=>({
        page,
        count
      }))
    } 

    cancelHandle(key) {
      this.setState(()=>({
        [key]: false
      }))
    }

    delThis = id =>{
      this.props.deleteThisVideoHandle(id)
    }

    edit = (id)=>{
      const currentEdit = this.props.videosList.find( item=>id === item.id)
      this.setState(()=>({
        showEditModal: true,
        currentEdit
      }))
    }
   


    componentDidMount() {
      this.props.thisGetVideosHandle()
    }
    

    
    render(){
      const { videosList, typesList, updateNewDataToVideos, deleteThisVideoHandle, isLoading } = this.props
      const { page, count, currentImg, showImgView, showEditModal, currentEdit, iterFinish } = this.state
      const vlen = this.vlen = videosList.length
      if(!vlen) return null
      
      let start = (page - 1) * count
      const end = page * count
      const times = new Array(count).fill(0)
      const pageSizeOptions = new Array(20).fill(0).map((e, i)=> (i*4 + 8 + ''))
      let imgsList = [[],[],[],[]]
      times.every((i, index) => {
        let pos = index % 4
        let item = videosList[start]
        if(item){
          imgsList[pos].push((
            <Card
              style={{marginBottom:10}}
              cover={<img src={item.img_holder} className="img-holder"  onClick={()=>this.openGallery(item.img_holder)}/>}
              actions={[
                <Icon onClick={()=> this.edit(item.id)} type="edit"  />, 
                <Icon onClick={()=> deleteThisVideoHandle(item.id)} type="delete" />, 
                <Link to={`/admin/detail/video/${item.group_id}`} ><Icon type="ellipsis" /></Link>]}
              key={item.id}
            >
              <Card.Meta
                title={item.title} 
                description={item.auther}
              />
            </Card>
          ))
        }
        return start++ <= end
      })

      

      return (
        <Skeleton loading={iterFinish} active >
          <div id="video-top"></div>
          <div className="card-wrap" >
            <Row gutter={5}>
              { imgsList.map((item ,index) => <Col md={6} key={index}>{item}</Col>) }
            </Row>
            <div style={{'marginTop': 30}}>
              <center>
                <Pagination 
                  total={vlen}  
                  onShowSizeChange={this.pageChangeHandle} 
                  pageSizeOptions={pageSizeOptions} 
                  onChange={this.pageChangeHandle} 
                  defaultPageSize={count}
                  showSizeChanger
                  showQuickJumper />
              </center>
            </div>
            
            
            <Preview 
              visible={showImgView}
              cancelHandle={()=> this.cancelHandle('showImgView')}
              url={currentImg}
            />
            { showEditModal ? 
              <EditModal 
                typesList={typesList}
                visible={showEditModal}
                dataSource={currentEdit}
                cancelHandle={()=> this.cancelHandle('showEditModal')} 
                updateHandle={updateNewDataToVideos}
                imgLength="1"
                /> : null }
          </div>
        </Skeleton>
        
      );
    }
}

const mapState2Props = state => ({
  isLoading: state.get('global').get('isLoading'),
  videosList: state.get('videos').get('videosList').toJS(),
  typesList: state.get('admin').get('typesList').toJS()
})

const mapDispatch2props = dispatch => ({
  thisGetVideosHandle(){
    dispatch(getVideos())
  },
  updateNewDataToVideos(data){
    dispatch(updateThisVideo(data))
  },
  deleteThisVideoHandle(id){
    dispatch(deleteThisVideo(id))
  }
})

export default connect(mapState2Props, mapDispatch2props)(Videos)