import React from "react"
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom'
import './App.css';
import Todo from "./todo/main"
import Help from "./help/help"

function App() {
  return (
      <Router>
          <Link to='/'>home</Link>
          <Link to='/help'>help</Link>
          <Switch>
                <Route path='/' exact component={Todo}/>
                <Route path='/help' component={Help}/>
          </Switch>
          
      </Router>
  );
}

export default App;
