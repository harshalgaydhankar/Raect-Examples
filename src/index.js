import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router,  Route, IndexRoute, browserHistory} from 'react-router';
import Home from "./components/Home";
import About from "./components/About";
import Faq from "./components/Faq";

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}> 
    <IndexRoute component ={Home}/>
      <Route path="about" component={About}/>
      <Route path="faq" component={Faq}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
