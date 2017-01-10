import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router,  Route, IndexRoute, browserHistory} from 'react-router';
import Home from "./components/Home";
import About from "./components/About";
import Faq from "./components/Faq";
import Boxes from "./components/Boxes/Boxes";
import Random from "./components/Random";
import CurrencyConvertor from "./components/CurrencyConvertor";
import Movies from "./components/Movies/Movies";

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}> 
    <IndexRoute component ={Home}/>
      <Route path="movies" component={Movies}/>
      <Route path="random" component={Random}/>
      <Route path="box" component={Boxes}/>
      <Route path="about" component={About}/>
      <Route path="faq" component={Faq}/>
      <Route path="currencyconvertor" component={CurrencyConvertor}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
