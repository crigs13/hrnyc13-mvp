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
      username: 'chris',
      balance: 0,
      coin: '',
      chart: {
        balances: [
          { key: 'BTC', value: 100 }
        ],
        chartSize: 400,
        chartPadding: 200,
        chartLabels: true
      },
      cryptoData: [{}]
    }
    this.addCoinBalance = this.addCoinBalance.bind(this);
    this.updateCharts = this.updateCharts.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.updateCoinState = this.updateCoinState.bind(this);
    this.getCurrentExchangeRates = this.getCurrentExchangeRates.bind(this);
    this.calculateUSDbalances = this.calculateUSDbalances.bind(this);
  }

  componentDidMount() {
    this.updateCharts();
  }

  calculateUSDbalances(rates) {
    console.log('this is the state of balances: ', this.state.chart.balances)
    let userAccountUpdate = {
        balances: [],
        chartSize: this.state.chart.chartSize,
        chartPadding: this.state.chart.chartPadding,
        chartLabels: this.state.chart.chartLabels
    };
    this.state.chart.balances.forEach((wallet) => {
      userAccountUpdate.balances.push({
        value: wallet.value * rates[wallet.key],
        key: wallet.key
      })
    })
    console.log('setting the chart state with: ', userAccountUpdate)
    this.setState({
      chart: userAccountUpdate
    })
  }

  getCurrentExchangeRates () {
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=100')
         .then((response) => {
           console.log('this is the API response.data[0]: ', response.data[0].symbol);
           let cryptoData = response.data;
           console.log('this is crypto data: ', cryptoData);
           let rates = {};
           cryptoData.forEach((crypto) => {
             rates[crypto.symbol] = crypto.price_usd;
           })
           console.log('this is the rates object: ', rates);
           this.calculateUSDbalances(rates);
         })
         .catch((error) => {
           console.log('ERROR in getCurrentExchangeRates, error: ', error);
         })
  }
  
  addCoinBalance() {
    axios.post('/submit', {
      username: this.state.username,
      balances: [{
        coin: this.state.coin.toUpperCase(),
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

  updateCharts() {
    axios.post('/update', {
      username: this.state.username
    })
    .then((response) => {
      let userAccountUpdate = {
        balances: [],
        chartSize: this.state.chart.chartSize,
        chartPadding: this.state.chart.chartPadding,
        chartLabels: this.state.chart.chartLabels
      };
      let data = response.data[0].balances;
      data.forEach(wallet => {
        userAccountUpdate.balances.push({
          key: wallet.coin,
          value: wallet.balance
        })
      })
      console.log('setting the chart state with: ', userAccountUpdate)
      this.setState({
        chart: userAccountUpdate
      })
      this.getCurrentExchangeRates();
    })
    .catch((error) => {
      console.log('ERROR in updateCharts, error: ', error);
    })
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
        <UpdateCharts 
          updateChart={this.updateCharts.bind(this)}
        />
        <CryptoChart 
          chartData={this.state.chart}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));