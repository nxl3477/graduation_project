import React from 'react'
import { Modal } from 'antd'


const Preview = (props) => {

  const { visible, cancelHandle, url } = props
  return (
    <Modal 
      title="查看大图"
      width={800}
      height={800}
      visible={visible} 
      onCancel={cancelHandle}
      footer={null}
      >
        <img  style={{width: '100%', height: 'auto'}} src={url} />
    </Modal>
  )
}


export default Preview
