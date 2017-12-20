import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import DateResults from './components/DateResults/DateResults';
import Finalizer from './components/Finalizer/Finalizer';
import Summary from './components/Finalizer/Summary';
import About from './components/About/About';
import PopularDates from './components/PopularDates/PopularDates';

export default (
  <Switch>
    <Route exact path='/' component={ Landing }/>
    <Route path='/results/:id' component={ DateResults }/>
    <Route path='/results' component={ DateResults }/>
    <Route path='/finalizer' component={ Finalizer }/>
    <Route path='/summary' component={ Summary }/>
    <Route path='/about' component={ About }/>
    <Route path='/popular' component={ PopularDates }/>
  </Switch>
);