import React from 'react';
import {Button,List,ListItem, Grid, TextField} from '@material-ui/core'
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
      
      else if (name === "grpSize") {
      this.setState({"grpSize":parseInt(val)})
    }
    else {
      this.setState({ [name]: val })
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
    };
    fetch('http://13.92.86.43:80/create', requestOptions)
        .then(response => (response.json()))
      .then(data => {
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
               <p>Max Group Size</p>
                <TextField
                  name="grpSize"
                type="number" InputProps={{inputProps: {  min: 0   }}} 
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



