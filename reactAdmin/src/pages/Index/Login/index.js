import React from 'react'
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const LoadableComponent = Loadable({
loader: () => import('./Login.jsx'),
loading(){
  return <Spin size="large"  tip="Loading..." />
},
});

 // 有状态组件导出方式
export default class XLogin extends React.Component {
  render() {
    return <LoadableComponent/>;
  }
}