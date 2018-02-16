import React from 'react';
import {PieChart} from 'react-easy-chart';

class CryptoChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { key: 'A', value: 100 },
        { key: 'B', value: 200 },
        { key: 'C', value: 50 }
      ]
    }
  }
  render() {
    return (
      <div>
        <PieChart data={this.state.data} size={200}/>
      </div>
    );
  }
}

export default CryptoChart;