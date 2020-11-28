import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  InitForm from './InitForm';
import About from './about'
import Done from './done'
import { AppBar, Toolbar } from '@material-ui/core'
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import FillPreference from './fillPreference';
ReactDOM.render(
  <React.StrictMode>
    <div>
     <AppBar position="static">
            <Toolbar >
              Group Us
            </Toolbar>
      </AppBar>
      <BrowserRouter>
        <App />
    </BrowserRouter>, 
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);

function App() {
    return (
        <main>
        <Switch>
          <Route path="/" component={InitForm} exact />
          <Route path="/home" component={InitForm} exact />
          <Route path="/about" component={About} />
          <Route path="/done" component={Done} />
          <Route path="/fillPreference/:id/:secret" component={FillPreference} />
          </Switch>
        </main>
    )
}
