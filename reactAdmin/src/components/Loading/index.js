import React, { Component }  from 'react'
import { Skeleton } from 'antd';


const Loading = ({ rows=15 }) => {
  return (
    <Skeleton active paragraph={{ rows: +rows }} />
  ) 
}

export default Loading