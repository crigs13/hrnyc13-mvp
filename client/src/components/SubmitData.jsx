import React from 'react';

// {<button onClick={props.onSubmit('chris', 'BTC', 10)}>Submit Data</button>}

const SubmitData = (props) => {
  return (
    <div>
        <button onClick={props.logdata}>Submit Data</button>
    </div>
  );
}

export default SubmitData;