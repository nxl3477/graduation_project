import React, {Component} from 'react'
import { Modal, Button } from 'antd';

export default class XModal extends Component {

  constructor(props) {
    super(props)

    this.cancelHandle = this.cancelHandle.bind(this)
    this.okHandle = this.okHandle.bind(this)
  }

  okHandle() {
    this.props.resolveFunc()
    this.props.closeModalHandle()
  }

  cancelHandle() {
    this.props.rejectFunc()
    this.props.closeModalHandle()
  }


  render() {
    const { visible } = this.props

    return (
      <Modal
        visible={visible}
        title="Title"
        onOk={this.okHandle}
        onCancel={this.cancelHandle}
        footer={[
          <Button key="back" onClick={this.cancelHandle}>取消</Button>,
          <Button key="submit" type="primary" loading={false} onClick={this.okHandle}>
            确定
          </Button>,
        ]}
      >
      { this.props.children }
      </Modal>
    )
  }
}
