import React from 'react';

class BalanceField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      balance: e.target.value
    })
    this.props.trackbalance(e.target.value);
  }

  render() {
    return (
      <div>
        <input value={this.state.balance} onChange={this.onChange} placeholder="Enter Your Balance"/>
      </div>
    );
  }
}

export default BalanceField;