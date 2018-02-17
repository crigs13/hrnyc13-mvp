import React from 'react';
import {PieChart} from 'react-easy-chart';

const CryptoChart = (props) => {


  console.log('these are the props in CryptoChart: ', props)
  return (
    <div>
      <PieChart 
        data={props.chartData.balances} 
        size={props.chartData.chartSize}
        labels={props.chartData.chartLabels}
      />
    </div>
  );
}

export default CryptoChart;

/*import React from 'react';
import {PieChart} from 'react-easy-chart';

class CryptoChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.chartData.balances,
      size: props.chartData.chartSize,
      labels: props.chartData.chartLabels,
      showToolTip: false,
      top: null,
      left: null,
      value: '',
      key: ''
    }
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    this.createTooltip = this.createTooltip.bind(this);
  }

  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: e.y,
      left: e.x,
      value: d.value,
      key: d.data.key});
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({top: e.y, left: e.x});
    }
  }

  mouseOutHandler() {
    this.setState({showToolTip: false});
  }

  createTooltip() {
    if (this.state.showToolTip) {
      return (
        <ToolTip
          top={this.state.top}
          left={this.state.left}
        >
          The value of {this.state.key} is {this.state.value}
        </ToolTip>
      );
    }
    return false;
  }

  render() {
    // console.log('these are the props in CryptoChart: ')
    return (
      <div>
        <PieChart 
          data={this.state.data} 
          size={this.state.size}
          labels={this.state.labels}
          mouseOverHandler={this.mouseOverHandler.bind(this)}
          mouseOutHandler={this.mouseOutHandler.bind(this)}
          mouseMoveHandler={this.mouseMoveHandler.bind(this)}
        />
      </div>
    );
  }
}

export default CryptoChart;*/