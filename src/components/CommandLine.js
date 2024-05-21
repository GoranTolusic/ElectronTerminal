import React, { useEffect } from 'react';
import './CommandLine.css'; 

function CommandLine() {
  const executeCommand = () => window.electronAPI.executeCommand()

  useEffect(() => {
    const inputElement = document.getElementById('commandInput')
    inputElement.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        executeCommand();
      }
    });

    inputElement.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') window.electronAPI.showPreviousCommand()
      if (event.key === 'ArrowDown') window.electronAPI.showNextCommand()
    });
  }, [])

  return (
    <div className="command-line" id="commandDiv">
      <input className="command-input" type="text" id="commandInput" placeholder="Enter command..." />
    </div>
  );
}

export default CommandLine;