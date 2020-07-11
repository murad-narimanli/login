import React, {useEffect, useState} from 'react';

// Components
import Homepage from "../HomePage";
import DashBoard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import '../../index.css'
// Installs
import { BrowserRouter as Router , Link , Route , Switch} from "react-router-dom";
import {MuiThemeProvider , createMuiTheme} from '@material-ui/core/styles'
import {CssBaseline , CircularProgress} from '@material-ui/core'
//alertify
import 'alertifyjs/build/css/alertify.min.css';
//firebase
import firebase from "../firebase";

const theme =  createMuiTheme()

function App() {
    const [firebaseMood  , setFirebaseMood] = useState(false)
    useEffect(()=>{
        firebase.controlFirebase().then(value => {
            setFirebaseMood(value)
        })
    })
    return firebaseMood!== false ?(
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Switch>
                    <Route component={Homepage} exact path={'/'} ></Route>
                    <Route component={Register} exact path={'/register'} ></Route>
                    <Route component={Login} exact path={'/login'} ></Route>
                    <Route component={DashBoard} exact path={'/dashboard'} ></Route>
                </Switch>
            </Router>
        </MuiThemeProvider>
    ):<div className="centercirc"> <CircularProgress/>  </div>
}

export default App;
