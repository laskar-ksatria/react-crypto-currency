import React from 'react';
import Crypto from './components/crypto';
import './App.css';

function App() {

  return (
    <div className="App">
      <Crypto name="Bitcoin" symbol="BTC" />
    </div>
  )

};

export default App;