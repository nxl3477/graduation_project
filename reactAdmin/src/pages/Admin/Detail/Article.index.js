import React, { Component } from 'react'
import Loadable from 'react-loadable';
import Loading from '../../../components/Loading'

const LoadableComponent = Loadable({
loader: () => import('./Article'),
loading(){
  return <Loading/>
},
});
export default class Chartasync extends React.Component {
  render() {
    return <LoadableComponent/>;
  }
}
