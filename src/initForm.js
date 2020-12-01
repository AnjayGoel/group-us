import React from 'react';
import validator from 'validator'
import { Alert } from '@material-ui/lab'
import CircularProgress from '@material-ui/core/CircularProgress';

import {Button,List,ListItem, Grid, TextField} from '@material-ui/core'
class InitForm extends React.Component {
  constructor() {
    super();
    this.state = {isLoading:false,isError:false}
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    let name = event.target.name;
    let val = event.target.value;
    if (name === "member_emails") {
      this.setState({"member_emails":val.trim().split(/\r?\n/)})
    }
    else if (name === "member_names") {
      this.setState({"member_names":val.trim().split(/\r?\n/)})
    }
        else if (name === "deadline") {
      this.setState({"deadline":Date.parse(val)/1000})
    }
      
      else if (name === "grpSize") {
      this.setState({"grpSize":parseInt(val)})
    }
    else {
      this.setState({ [name]: val })
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({isLoading:true})
 
    for (const i of this.state["member_emails"]) {
      if (!validator.isEmail(i.trim())) {
        alert("Please Check Member Emails For Error (Invalid Email-Id,Empty Rows etc)")
        return
      }
      
    }
    for (const i of this.state["member_names"]) {
      if (i==="") {
        alert("Please Check Member Names For Error (Empty Rows etc)")
        return
      }

    }
    if (this.state.member_emails.length === 0 || this.state.member_names.length === 0) {
      alert("Please Fill All Fields")
      return;
    }
    if (this.state.member_emails.length !== this.state.member_names.length) {
      alert("Different Number Of Names And Email")
      return;
    }
    let payload = { ... this.state }
    delete payload["isError"]
    delete payload["isLoading"]
    console.log(payload)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    fetch('https://silverbug.eastus.cloudapp.azure.com/create', requestOptions).then(response => (response.json())).then(data => {
      this.setState({isLoading:false})
      if (data["status"] === 0) {
            this.setState({ isError: true })
            return
        }
        this.props.history.push("/Done");
        }).catch(function(err) {
            this.setState({ isLoading:false, isError: true })
        console.info(err + "------err------");
    });
  
  }


  render() {
      if (this.state.isLoading) {
             return (
                 <div style= {{justifyContent:"center", display:"flex"}}>
                     <CircularProgress style={{margin:"20px"}} />
               </div>
             )
      }
      else if (this.state.isError) {
             return (
                <div>
                <Alert severity="error" style={{display: 'flex', justifyContent: 'center'}}>Error! Something Happened. Please Try Again.</Alert>
                </div>
              );
      }
    
      return (
          <div id="main">
            <div style={{ "marginLeft": "40px"}}>
              <br />
          How to use:<br />
              <ul>
                <li>Fill out this form.</li>
                <li>App sends a email to all the members, asking them their preferences.</li>
                <li>Once the preferences are collected (or deadline is reached), the app will form groups and send emails (to you and all members), informing them of their groups.</li>
              </ul>
            </div>
            <br />
            <Grid container
              spacing={0}
              direction="column"
              style={{ minHeight: '100vh', margin:'40px'}}>
              <form id="mainForm" onSubmit={this.handleSubmit}>
                <p>Your Name</p>
                <TextField
                  name="owner_name"
                type="text"
                required={true}
                  data-parse="uppercase"
                  onChange={this.handleChange}
                />
                <p>Your Email</p>

                <TextField
                  name="owner_email"
                type="email"
                required={true}
                  onChange={this.handleChange}
                />

                <p>Title of Project</p>
                <TextField
                  name="title"
                type="text"
                                required={true}

                  onChange={this.handleChange}
              />
               <p>Group Size</p>
                <TextField
                  name="grpSize"
                type="number" InputProps={{inputProps: {  min: 2   }}} 
                                required={true}

                  onChange={this.handleChange}
                />

                <p>The Deadline for Group Formation</p>

                <TextField
                  name="deadline"
                type="date"
                                required={true}

                  onChange={this.handleChange}
                />

                <p>Names of Members seperated by newline</p>

                <TextField multiline={true}  required={true} rowsMax={10} onChange={this.handleChange} label="Member Names" variant="outlined" name="member_names" />

                <p>Emails of Members (In same order as names)</p>

                <TextField multiline={true} required={true} rowsMax={10} onChange={this.handleChange} label="Member Emails" variant="outlined"
                  name="member_emails" />
                <p />
                <Button type="Submit" variant="contained" color="primary" >Submit</Button>
              </form></Grid></div>
        
      );
    
  }
}

export default InitForm;



