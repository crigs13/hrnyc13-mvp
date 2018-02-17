import React from 'react';
import ReactDOM from 'react-dom';
import Username from './components/Username.jsx';
import CoinSelector from './components/CoinSelector.jsx';
import BalanceField from './components/BalanceField.jsx';
import SubmitData from './components/SubmitData.jsx';
import UpdateCharts from './components/UpdateCharts.jsx';
import CryptoChart from './components/CryptoChart.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      balance: 0,
      coin: 'BTC',
      chart: {
        balances: [
          { key: 'A', value: 100 },
          { key: 'B', value: 200 },
          { key: 'C', value: 50 }
        ],
        chartSize: 400,
        chartPadding: 50,
        chartLabels: true
      }
    }
    this.addCoinBalance = this.addCoinBalance.bind(this);
    this.updateLiveData = this.updateLiveData.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.updateCoinState = this.updateCoinState.bind(this);
  }

  updateBalanceState(balance) {
    this.setState({
      balance: balance
    })
  }

  updateCoinState(coin) {
    this.setState({
      coin: coin
    })
  }

  updateUserState(username) {
    this.setState({
      username: username
    })
  }

  addCoinBalance() {
    axios.post('/update', {
      username: this.state.username,
      balances: [{
        coin: this.state.coin,
        balance: this.state.balance
      }]
    })
    .then((response) => {
      console.log('successful POST from addCoinBalance, response: ', response)
    })
    .catch((err) => {
      console.log('failure to POST from addCoinBalance, error: ', err)
    })
  }

  updateLiveData() {
    console.log('User clicked Update Data');
  }

  render() {
    return (<div>
        <h1>Welcome to your Crypto Balance Dashboard</h1>
        Username: 
        <Username 
          username={this.state.username}
          trackusername={this.updateUserState.bind(this)}
        />
        Coin Symbol: 
        <CoinSelector 
          coin={this.state.coin}
          trackcoin={this.updateCoinState.bind(this)}
        />
        Balance:
        <BalanceField 
          balance={this.state.balance}
          trackbalance={this.updateBalanceState.bind(this)}
        />
        <SubmitData 
          logdata={this.addCoinBalance.bind(this)}
          
          
          
        />
        <UpdateCharts />
        <CryptoChart chartData={this.state.chart}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

  // addCoinBalance(username, coin, balance) {
  //   console.log('User clicked Submit Data1');
  //   axios.post('/', {
  //     username: username,
  //     balances: [{
  //       coin: coin,
  //       balance: balance
  //     }]
  //   })
  //   .then((response) => {
  //     console.log('successful POST from addCoinBalance, response: ', response)
  //   })
  //   .catch((err) => {
  //     console.log('failure to POST from addCoinBalance, error: ', err)
  //   })
  // }