import React from 'react';

class Username extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      username: e.target.value
    });
    this.props.trackusername(e.target.value)
  }

  render() {
    return (
      <div>
        <input value={this.state.username} onChange={this.onChange} placeholder="Enter Username"/>
      </div>
    );
  }
}

export default Username;