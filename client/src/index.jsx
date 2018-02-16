import React from 'react';
import ReactDOM from 'react-dom';
import Username from './components/Username.jsx';
import CoinSelector from './components/CoinSelector.jsx';
import BalanceField from './components/BalanceField.jsx';
import SubmitData from './components/SubmitData.jsx';
import UpdateCharts from './components/UpdateCharts.jsx';
import CryptoChart from './components/CryptoChart.jsx';
//other imports?

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'test',
      username: '',
      balance: '',
      balances: ''
    }
    // add bound functions here
  }

  // figure out what props to pass down to sub components
  render() {
    return (<div>
        <h1>Welcome to your Crypto Balancer</h1>
        <Username />
        <CoinSelector />
        <BalanceField />
        <SubmitData />
        <UpdateCharts />
        <CryptoChart />
      </div>
    )
  }
}

// this handles the React virtual DOM modelling
ReactDOM.render(<App />, document.getElementById('app'));