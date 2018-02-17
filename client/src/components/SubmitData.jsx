import React from 'react';

// {<button onClick={props.onSubmit('chris', 'BTC', 10)}>Submit Data</button>}

const SubmitData = (props) => {
  let submit = () => {
    props.logdata();
  }
  return (
    <div>
      <button onClick={submit}>Submit Data</button>
    </div>
  );
}

export default SubmitData;