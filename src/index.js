import ReactDOM from "react-dom";
import "./index.css";
import InitForm from "./initForm";
import About from "./about";
import Done from "./done";
import {Box, AppBar, Toolbar, Typography, Link, MuiThemeProvider, Button, IconButton} from "@material-ui/core";
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import FillPreference from "./fillPreference";
import {createMuiTheme} from "@material-ui/core/styles";
import GitHubIcon from '@material-ui/icons/GitHub';
import React from "react";

const my_theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

const my_theme_d = createMuiTheme({
    palette: {
        primary: {
            light: '#000000',
            main: '#000000',
            dark: '#000000',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={my_theme}>
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <Typography style={{fontSize: "large"}}>
                            <Link href="/GroupUs" color="inherit" style={{textDecoration: 'none'}}>
                                Group Us
                            </Link>
                        </Typography>
                        <div style={{marginLeft: 'auto'}}>
                            <IconButton aria-label="Github" style={{color: "white", justifySelf: "right"}}
                                        onClick={() => window.open('https://github.com/anjaygoel')}>
                                <GitHubIcon style={{color: "white", justifySelf: "right"}}/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <HashRouter>
                    <App/>
                </HashRouter>
            </Box>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

function App() {
    return (
        <main>
            <Switch>
                <Route path="/" component={InitForm} exact/>
                <Route path="/home" component={InitForm} exact/>
                <Route path="/about" component={About}/>
                <Route path="/done" component={Done}/>
                <Route path="/fillPreference/:id/:secret" component={FillPreference}/>
                <Route render={() => <Redirect to={{pathname: "/"}}/>}/>
            </Switch>
        </main>
    );
}
