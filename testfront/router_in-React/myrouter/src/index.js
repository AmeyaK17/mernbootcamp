import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch, BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
import User from './User';
import Visit from './Visit';
import Notfound from './notfound';


//creating component for routing
const routing = (
  //exact keyword stops the App component from "mounting" on top of each component. So with this keyword, only the /user or /visit routes will be mounted.
  //Switch component helps in server a 404 error when a route is not found. No path is provided in the last <Route>
  //Links are similar to <a href=""> 
  <Router>

    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/user">User</Link></li>
        <li><Link to="/visit">Visit</Link></li>
      </ul>
    </div>

    <Switch>
      <Route exact path="/" component={App}/>  
      <Route path="/user" component={User} />
      <Route path="/visit" component={Visit} />
      <Route component={Notfound} />
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
