import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <MainContainer />
        <p>
          WHATS GOOODDDD. WeTravel inc.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
