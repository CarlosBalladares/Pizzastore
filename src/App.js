import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingView from './views/LandingView.js';
import OrderingView from './views/OrderingView.js';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <Router>
        <Switch>
            <Route exact path="/" component={LandingView} />
            <Route exact path="/order/" component={OrderingView} />
        </Switch>
      </Router>
    );
  }
}

export default App;


