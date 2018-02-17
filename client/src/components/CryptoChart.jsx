import React from 'react';
import {PieChart} from 'react-easy-chart';

const CryptoChart = (props) => {
  return (
    <div>
      <PieChart 
        data={props.chartData.balances} 
        size={props.chartData.chartSize}
        labels={props.chartData.chartLabels}
        innerHoleSize={200}
        mouseOverHandler={props.mouseOverHandler}
        mouseOutHandler={props.mouseOutHandler}
        mouseMoveHandler={props.mouseMoveHandler}
      />
    </div>
  );
}

export default CryptoChart;