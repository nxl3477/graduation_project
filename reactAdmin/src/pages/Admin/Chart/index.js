import React, { Component } from 'react'
import Loadable from 'react-loadable';
import Loading from '../../../components/Loading'

const LoadableComponent = Loadable({
loader: () => import('./Chart.jsx'),
loading(){
  return <Loading/>
},
});

 // 有状态组件导出方式
export default class Chartasync extends React.Component {
  render() {
    return <LoadableComponent/>;
  }
}