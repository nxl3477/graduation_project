import React, { PureComponent } from 'react'
import { connect } from "react-redux";
import { Card } from 'antd'
import G2 from '@antv/g2';
import './index.scss'


 class Chart extends PureComponent {

  chartInit = () => {
    var data = [{
      year: '20日',
      value: 330
    }, {
      year: '21日',
      value: 234
    }, {
      year: '22日',
      value: 270
    }, {
      year: '23日',
      value: 270
    }, {
      year: '24日',
      value: 192
    }, {
      year: '25日',
      value: 370
    }, {
      year: '26日',
      value: 250
    }, {
      year: '27日',
      value: 270
    }, {
      year: '28日',
      value: 446
    }];
    var chart = new G2.Chart({
      container: 'mountNode',
      forceFit: true,
      height: window.innerHeight,
      background: { fill: '#fff' },
      height: 600
    });
    chart.source(data);
    chart.scale('数量', {
      min: 0
    });
    chart.scale('year', {
      range: [0, 1]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.line().position('year*value');
    chart.point().position('year*value').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    chart.render();
  }

  componentDidMount() {
    this.chartInit()
    setTimeout(function(){
      window.dispatchEvent( new Event('resize'))
    })
  }

  render() {
    // const { changeMyName } = this.props
    const gridStyle = {
      width: '25%',
      textAlign: 'center',
    };
    
    return (
      <div>
        <Card title="概览" >
          <Card.Grid style={gridStyle}>
            <h3>视频头条</h3>
            <p>6012</p>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <h3>文章头条</h3>
            <p>8536</p>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <h3>用户数量</h3>
            <p>230</p>
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <h3>管理员数量</h3>
            <p>1</p>
          </Card.Grid>
        </Card>
        
        <div className="line-chart mt-4">
          <div id="mountNode" ></div>
        </div>
      </div>
    )
  }
}

// 映射 state
const mapStateToProps = state => ({
})

// 映射 dispatch
const mapDispatchToProps = (dispatch) => ({
  // changeMyName(){
  //   dispatch(actionCreator.changeName('吴大龙'))
  // }
})


export default connect(mapStateToProps, mapDispatchToProps)(Chart)