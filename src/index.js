import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router,  Route, IndexRoute, browserHistory} from 'react-router';
import Home from "./components/Home";
import Boxes from "./components/Boxes/Boxes";
import Random from "./components/Random";
import CurrencyConvertor from "./components/CurrencyConvertor";
import Movies from "./components/Movies/Movies";
import ToDo from "./components/ToDo/ToDo";


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}> 
    <IndexRoute component={Home}/>
      <Route path="movies" component={Movies}/>
      <Route path="random" component={Random}/>
      <Route path="box" component={Boxes}/>
      <Route path="currencyconvertor" component={CurrencyConvertor}/>
      <Route path="todo" component={ToDo}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
