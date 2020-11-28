import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Autocomplete } from '@material-ui/lab'
import {Paper,List,ListItem,Grid,Typography,IconButton,Button, TextField} from '@material-ui/core'
class FillPreference extends React.Component {
    constructor(props) {
        super(props);
        this.handleTag = this.handleTag.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.delete = this.delete.bind(this);

        this.getNames = this.getNames.bind(this);
        this.getNames()

        this.state = {name:"Anjay",title:"Test",owner_name:"Test",all:["A","B","C","D","F","G","H","I","J","K","L"],chosen:["D","F","G","H","I"]}
    }

      async getNames() {
        const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
    };
    fetch('http://127.0.0.1:5000/fill/'+this.props.match.params.id+"/"+this.props.match.params.secret, requestOptions)
        .then(response => (response.text()))
        .then(data => {
            console.log(data) 
            data = JSON.parse(data)
          this.setState({name:data["name"],title:data["title"],owner_name:data["owner_name"],all:data["names"],chosen:[]})
        }).catch(function(err) {
          
        console.info(err + "------err------");
    });
  
  }

    handleSubmit() {
            this.props.history.push("/Done");

    }
    delete(i) {
        console.log("---"+i)
        const newChosen = this.state.chosen
        newChosen.splice(i, 1)
        this.setState({ chosen: newChosen })
        
        console.log(this.state.chosen)
    }
    handleTag(event, value) {
        if (!this.state.all.includes(value)) {
            return
        }
        console.log(value)
        const newChosen = this.state.chosen
        if (!newChosen.includes(value)) {
            newChosen.push(value)
            this.setState({ chosen: newChosen })
        }
  };
    render() {
        const items = []
                console.log(this.state.chosen)

        for (const i in this.state.chosen) {
           
            items.push(<Item name={this.state.chosen[i]} onClick = {() => this.delete(i)}/>)
        }
      return (
           <Grid container
              spacing={0}
              direction="column"
              alignItems="center"
              style={{ minHeight: '100vh', margin:'40px'}}>
              
              <form onSubmit={this.handleSubmit}>
                  <p>Hello {this.state.name},<br/>Please fill out your Preference for { this.state.title} </p>
              <span style={{"display":"flex", "flex-direction": "row", "justify-content": "center", "align-items": "center"}}>
                      <Typography style={{margin:10}}>Find Name</Typography><Autocomplete
                          onInputChange={this.handleTag}
                    options={this.state.all}
                    getOptionLabel={(option) => option}
                          style={{ width: 300 }}
                                    onChange={this.onTagsChange}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                      />       </span>
                  <Paper elevation={0} style={{ maxHeight: 400, overflow: 'auto'}}>
                      <List style={{ "justify-content": "center", "align-items": "center" }}>
                      {items}
                      </List></Paper>
                  <span style={{"margin":"20px", "display":"flex", "flex-direction": "row", "justify-content": "center", "align-items": "center"}}>
                  <Button type="submit" style={{ margin:"20px" }} variant="contained" color="primary" type="Submit" style={ {alignSelf:"center"}} >Submit</Button>
        </span> </form></Grid>
      )
   }
}
class Item extends React.Component {
    constructor(props) {
        super(props);

  }
    render() {
        return (
            <ListItem style={{ "justify-content": "center", "align-items": "center" }}>
                <Paper>
                <span style={{"display":"flex", "flex-direction": "row", "justify-content": "center", "align-items": "center"}}>
                <Typography align ='center' style={ {margin:'20px'}}>{this.props.name}</Typography>
                    <TextField required={true}   InputProps={{inputProps: {  max: 10, min: 0   }}} type="number" label="Preference (0-10)"></TextField>
                <IconButton aria-label="delete" onClick={this.props.onClick}>
          <DeleteIcon fontSize="large" />
        </IconButton></span></Paper></ListItem>
 
      )
   }
}
export default FillPreference;

