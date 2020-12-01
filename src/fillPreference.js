import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Autocomplete,Alert } from '@material-ui/lab'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Paper,List,ListItem,Grid,Typography,IconButton,Button, TextField} from '@material-ui/core'
class FillPreference extends React.Component {
    constructor(props) {
        super(props);
        this.handleTag = this.handleTag.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.delete = this.delete.bind(this);

        this.getNames = this.getNames.bind(this);
        this.getNames()

        this.state = {
            name: "Loading...", title: "Loading...", owner_name: "Loading....", all: [], chosen: [], chosenPref: [],isLoading:true,isError:false
        }
    }

        async getNames() {
        const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
    };
    fetch('https://silverbug.eastus.cloudapp.azure.com/fill/'+this.props.match.params.id+"/"+this.props.match.params.secret, requestOptions)
        .then(response => (response.json()))
        .then(data => {
            this.setState({ isLoading: false })
            if (data["status"] === 0) {
                this.setState({ isError: true })
                return
            }
            this.setState({ name: data["name"], title: data["title"], owner_name: data["owner_name"], all: data["names"].filter(item=>item!==data["name"]),chosen:[]})
        }).catch(function (err) {
            this.setState({ isLoading: false, isError:true})
            console.info(err + "------err------");
    });
  
  }

    handleSubmit(event) {
        event.preventDefault();
        const chosenPref = this.state.chosenPref
        var data = this.state.chosen.map(function (e, i) {
            return [e, chosenPref[i]];
        })
        this.setState({isLoading:true})
        var payload = {"data":data}
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
        };
        
        fetch('https://silverbug.eastus.cloudapp.azure.com/submit/' + this.props.match.params.id + "/" + this.props.match.params.secret, requestOptions)
            .then(response => (response.json())).then(data => {
                if (data["status"] === 0) {
                    this.setState({ isError: true })
                    return
                }
                else {
                    this.props.history.push("/Done");
                }
            }).catch(function (err) {
                this.setState({isError:true})
                console.info(err + "------err------");
    });

    }
    delete(i) {
        const newChosen = this.state.chosen
        newChosen.splice(i, 1)
        this.setState({ chosen: newChosen })
    }
    pref(i, val) {
        const newChosenPref = this.state.chosenPref
        newChosenPref[i] = parseInt(val)
        this.setState({chosenPref:newChosenPref})
    }
    handleTag(event, value) {
        if (!this.state.all.includes(value)) {
            return
        }
        const newChosen = this.state.chosen
        if (!newChosen.includes(value)) {
            newChosen.push(value)
            this.setState({ chosen: newChosen })
        }
  };
    render() {

        if (this.state.isLoading) {
             return (
                 <div style= {{justifyContent:"center", display:"flex"}}>
                     <CircularProgress style={{margin:"20px"}} />
            </div>)
        }
        else if (this.state.isError) {
             return (
                <div>
                <Alert severity="error" style={{display: 'flex', justifyContent: 'center'}}>Error! Something Happened. Please Try Again.</Alert>
                </div>
                );
        }
        const items = []

        for (const i in this.state.chosen) {

            items.push(<Item key={ i.toString()} name={this.state.chosen[i]} onClick = {() => this.delete(i)}  onPref = {(event) => this.pref(i,event.target.value)}/>)
        }
        return (
           <Grid container
              spacing={0}
              direction="column"
              alignItems="center"
              style={{ minHeight: '100vh', margin:'40px'}}>
              
              <form onSubmit={this.handleSubmit}>
                  <p>Hello {this.state.name},<br/>Please fill out your preferences for { this.state.title} </p>
              <span style={{"display":"flex", "flexDirection": "row", "justifyContent": "center", "alignItems": "center"}}>
                      <Typography style={{margin:10}}>Find Name:</Typography><Autocomplete
                          onInputChange={this.handleTag}
                    options={this.state.all}
                    getOptionLabel={(option) => option}
                          style={{ width: 300 }}
                                    onChange={this.onTagsChange}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                      />       </span>
                  <Paper elevation={0} style={{ maxHeight: 400, overflow: 'auto'}}>
                      <List style={{ "justifyContent": "center", "alignItems": "center" }}>
                      {items}
                      </List></Paper>
                  <span style={{"margin":"20px", "display":"flex", "flexDirection": "row", "justifyContent": "center", "alignItems": "center"}}>
                  <Button type="submit" style={{ margin:"20px",alignSelf:"center" }} variant="contained" color="primary" >Submit</Button>
                    </span>
                    <div>
                        Note:
                        <ul>
                            <li>You can leave out choices, it that case they will be given a preference of zero.</li>
                            <li>Filling out as many choices as you can will lead to a better matching.</li>
                        </ul>
                    </div></form></Grid>
      )
   }
}
class Item extends React.Component {
    constructor(props) {
        super(props);

  }
    render() {
        return (
            <ListItem style={{ "justifyContent": "center", "alignItems": "center" }}>
                <Paper>
                <div style={{"display":"flex", "flexDirection": "row", "alignItems": "center"}}>
                <Typography align ='center' style={ {margin:'20px'}}>{this.props.name}</Typography>
                        <TextField style={{ minWidth:"170px" }} required={true} onChange={ this.props.onPref} InputProps={{inputProps: {  max: 10, min: 0   }}} type="number" label="Preference (0-10)"></TextField>
                <IconButton aria-label="delete" onClick={this.props.onClick}>
          <DeleteIcon fontSize="large" />
        </IconButton></div></Paper></ListItem>
 
      )
   }
}
export default FillPreference;

