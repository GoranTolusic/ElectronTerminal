import './App.css';
import React from 'react';
import Header from './components/Header';
import Terminal from './components/Terminal';
import CommandLine from './components/CommandLine';

function App() {

  return (
    <div>
      <Header />
      <Terminal />
      <CommandLine />
    </div>
  );
}

export default App;
