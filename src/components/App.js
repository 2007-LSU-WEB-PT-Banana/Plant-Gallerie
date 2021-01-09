import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import {
  getSomething
} from '../api';
import Header from './Header';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/">
            <Header />
          </Route>
          <Route patch="/houseplants">
            <Header />
          </Route>
          <Route path="/floweringplants">
            <Header />
          </Route>
          <Route path="/bonsaiplants">
            <Header />
          </Route>
          <Route path="/login">
            <Header />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;