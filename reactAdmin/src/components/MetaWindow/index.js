import React, { Component } from 'react'
import { Upload } from 'antd'
import "video-react/dist/video-react.css";
import { Player } from 'video-react';
const fileList = [{
  uid: '-1',
  name: 'xxx.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}]


class MetaWindow extends Component {

  render() {
    return (
      <div>
        <Player>
          <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
        </Player>
      </div>
    )
  }
}
export default MetaWindow