import React from 'react';

class Username extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
    this.onChange = this.onChange.bind(this);
    // add bound functions here
  }

  onChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  render() {
    return (
      <div>
        <input value={this.state.username} onChange={this.onChange}/>
      </div>
    );
  }
}

export default Username;