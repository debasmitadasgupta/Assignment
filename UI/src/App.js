// frontend/src/App.js

import React, { Component } from "react";
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';


class App extends Component {

  render() {
    return (
      <>
          <div>
            {/* ========== APP ROUTES ===================*/}

            {/*=========== LogIn Screen =================*/}
            <Route exact path="/" component={Login} />

            {/*=========== Home Screen =================*/}
            <Route exact path="/Home" component={Home} />
            
          </div>

        }
      </>
    )
  }
}
export default App;
