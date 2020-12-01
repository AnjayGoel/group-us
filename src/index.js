import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  InitForm from './initForm';
import About from './about'
import Done from './done'
import { AppBar, Toolbar,Typography } from '@material-ui/core'
import {HashRouter, Route,Switch} from 'react-router-dom';
import FillPreference from './fillPreference';
ReactDOM.render(
  <React.StrictMode>
    <div>
     <AppBar position="static">
        <Toolbar >
          <Typography>
            Group Us
          </Typography>
            </Toolbar>
      </AppBar>
      <HashRouter>
        <App />
    </HashRouter>, 
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
