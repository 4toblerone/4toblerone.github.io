import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Sidebar } from './sidebar/Sidebar';
import { Content } from './content/Content';
import './App.css';
import './Responsiv.css';

function App() {
  return (
    <div className="App">
        <Router>
          <Sidebar />
          <Content />
        </Router>
    </div>
  );
}

export default App;
