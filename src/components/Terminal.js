import React, { useEffect, useState } from 'react';

function Terminal() {
  let [output, setOutput] = useState({
    meta: {
      user: '',
      timestamp: ''
    },
    output: ''
  })
  const [allOutputs, setAllOutputs] = useState([])

  const scrollToBottom = () => {
    const element = document.getElementById('bottom-terminal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.electronAPI.listener(setOutput)
    scrollToBottom();
  }, [])

  useEffect(() => {
    setAllOutputs([...allOutputs, output]);
    scrollToBottom();
  }, [output])

  useEffect(() => {
    scrollToBottom();
  }, [allOutputs])

  return (
    <div className="App">
      <div className="App-header">
        <div>
          {allOutputs.map((oneOutput) => (
              <p>
                {oneOutput.meta.user &&
                <span className="App-meta">{(new Date(oneOutput.meta.timestamp)).toString()} - {oneOutput.meta.user}: 
                  <span className="App-meta-command">{" " + oneOutput.meta.command}</span>
                </span>}
                <br/>
                {oneOutput.output.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index !== oneOutput.output.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
          ))}
        </div>
        <div id="bottom-terminal"></div>
      </div>
    </div>
  );
}

export default Terminal;
