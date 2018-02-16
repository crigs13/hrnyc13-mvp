import React from 'react';

class BalanceField extends Component {
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
  }

  render() {
    return (
      <div>
        <input value={this.state.balance} onChange={this.onChange}/>
      </div>
    );
  }
}

export default BalanceField;