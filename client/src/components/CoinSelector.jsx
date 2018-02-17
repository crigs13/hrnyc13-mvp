import React from 'react';

class CoinSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      coin: e.target.value 
      // should this be dropdown from array of values?
    });
    this.props.trackcoin(e.target.value);
  }

  render() {
    return (
      <div>
        <input value={this.state.username} onChange={this.onChange} placeholder="Enter Coin Symbol"/>
      </div>
    );
  }
}

export default CoinSelector;