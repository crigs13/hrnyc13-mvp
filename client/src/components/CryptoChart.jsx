import React from 'react';
import {PieChart} from 'react-easy-chart';

const CryptoChart = (props) => {
  console.log('these are the props in CryptoChart: ', props)
  return (
    <div>
      <PieChart 
        data={props.chartData.balances} 
        size={400}/>
    </div>
  );
}

export default CryptoChart;