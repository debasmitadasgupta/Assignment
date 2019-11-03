import React, { Component} from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../App.css";
import { connect } from 'react-redux';
import {saveUserInfo} from './../Actions';
import axios from 'axios';



class Login extends Component  {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password:'',
          browser:''
        };
      }
   handleSubmit=event=> {

    let browser = this.getBrowser()
    let params={
          email: this.state.email,
          password:this.state.password,
          browser:browser
    }
    // axios
    // .post("http://localhost:8000/todo/saveUserInfo", params ,{ headers: { "Content-Type":"application/json" } })
    // .then(res => this.props.history.push('/Home'));

    this.props.saveUserInfo(params,this.props.history)
  }

  getBrowser() { 
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
   {
       return('Opera');
   }
   else if(navigator.userAgent.indexOf("Chrome") != -1 )
   {
    return('Chrome');
   }
   else if(navigator.userAgent.indexOf("Safari") != -1)
   {
    return('Safari');
   }
   else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
   {
    return('Firefox');
   }
   else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
   {
    return('IE'); 
   }  
   else 
   {
    return('unknown');
   }
   }
  
render(){
  return (
    <div className="Login" style={{ marginTop: "100px" }}>
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel style={{color:'black'}}>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={e => this.setState({email:e.target.value})} required
          />
        </FormGroup>
        <FormGroup controlId="password" >
          <FormLabel style={{color:'black'}}>Password</FormLabel>
          <FormControl
            value={this.state.password}
            onChange={e => this.setState({password:e.target.value})}
            type="password"
            required
          />
        </FormGroup>
        <Button block type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
}

const mapStateToProps = (state) => {
  return {
   
  }
};

//dispatching actions through local props of type function
const mapDispatchToProps = (dispatch) => {
  return {
    saveUserInfo:(params,history) => dispatch(saveUserInfo(params,history))
  }
};

// exporting Home component as HOC
export default connect(mapStateToProps, mapDispatchToProps)(Login);