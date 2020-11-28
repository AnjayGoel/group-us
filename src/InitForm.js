import React from 'react';
import { unmountComponentAtNode} from 'react-dom'
import {Button,AppBar,Toolbar,List,ListItem,FormControl,Typography, Grid, TextField} from '@material-ui/core'
import * as EmailValidator from 'email-validator'
class InitForm extends React.Component {
  constructor() {
    super();
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    let name = event.target.name;
    let val = event.target.value;
    if (name === "member_emails") {
      this.setState({"member_emails":val.split(/\r?\n/)})
    }
    else if (name === "member_names") {
      this.setState({"member_names":val.split(/\r?\n/)})
    }
        else if (name === "deadline") {
      this.setState({"deadline":Date.parse(val)/1000})
    }
    else {
      this.setState({ [name]: val })
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify(this.state))
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
    };
    fetch('http://127.0.0.1:5000/create', requestOptions)
        .then(response => JSON.parse(response.text()))
      .then(data => {
        console.log(data) 
          this.props.history.push("/Done");
        }).catch(function(err) {
          
        console.info(err + "------err------");
    });
  
  }


  render() {
    
      return (
          <div id="main">
            <div style={{ "margin-left": "40px"}}>
              <br />
          How to use:<br />
              <List>
                <ListItem>Fill out this Form</ListItem>
                <ListItem>App sends out a form to all members to fill out their preferences.
       </ListItem>
                <ListItem>Once done (or deadline reached), the app will form you and the members groups and send emails to informing people of their groups
        </ListItem>
              </List>
            </div>
            <br />
        
            <Grid container
              spacing={0}
              direction="column"
              alignItems="left"
              style={{ minHeight: '100vh', margin:'40px'}}>
              <form id="mainForm" onSubmit={this.handleSubmit}>
                <p>Enter Your Name</p>
                <TextField
                  name="owner_name"
                type="text"
                required={true}
                  data-parse="uppercase"
                  onChange={this.handleChange}
                />
                <p>Enter Your Email</p>

                <TextField
                  name="owner_email"
                type="email"
                required={true}
                  onChange={this.handleChange}
                />

                <p>Enter Title of Project</p>
                <TextField
                  name="title"
                type="text"
                                required={true}

                  onChange={this.handleChange}
              />
               <p>Enter Max Group Size</p>
                <TextField
                  name="grpSize"
                type="number" InputProps={{inputProps: {  min: 0   }}} 
                                required={true}

                  onChange={this.handleChange}
                />

                <p>Enter The Deadline for Group Formation</p>

                <TextField
                  name="deadline"
                type="date"
                                required={true}

                  onChange={this.handleChange}
                />

                <p>Enter Names of Members seperated by newline</p>

                <TextField multiline={true}  required={true} rowsMax={10} onChange={this.handleChange} label="Member Emails" variant="outlined" name="member_names" />

                <p>Enter Emails of Members (In same order as names)</p>

                <TextField multiline={true} required={true} rowsMax={10} onChange={this.handleChange} label="Member Emails" variant="outlined"
                  name="member_emails" />
                <p />
                <Button type="submit" variant="contained" color="primary" >Submit</Button>
              </form></Grid></div>
        
      );
    
  }
}

export default InitForm;



