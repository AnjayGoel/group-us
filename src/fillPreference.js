import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {Autocomplete, Alert} from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
    Paper,
    List,
    ListItem,
    Box,
    Typography,
    IconButton,
    Button,
    TextField,
} from "@material-ui/core";
import {api_url} from "./config";

class FillPreference extends React.Component {
    constructor(props) {
        super(props);
        this.handleTag = this.handleTag.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.delete = this.delete.bind(this);

        this.getNames = this.getNames.bind(this);
        this.getNames();

        this.state = {
            name: "Loading...",
            project_title: "Loading...",
            organizer_name: "Loading....",
            all: [],
            chosen: [],
            chosenPref: [],
            isLoading: true,
            isError: false,
            errorMsg: ""
        };
    }

    async getNames() {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state),
        };
        fetch(
            api_url + "/vote/" +
            this.props.match.params.id +
            "/" +
            this.props.match.params.secret,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                this.setState({isLoading: false});
                if (data["status"] === 0) {
                    this.setState({isError: true});
                    this.setState({errorMsg:data["message"]});
                    return;
                }
                this.setState({
                    name: data["name"],
                    project_title: data["project_title"],
                    organizer_name: data["organizer_name"],
                    all: data["names"].filter((item) => item !== data["name"]),
                    chosen: [],
                });
            })
            .catch(function (err) {
                this.setState({isLoading: false, isError: true});
            }.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();
        const chosenPref = this.state.chosenPref;
        var data = this.state.chosen.map(function (e, i) {
            return {"name": e, "score": chosenPref[i]};
        });
        this.setState({isLoading: true});
        var payload = {data: data};
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        };

        fetch(
            api_url + "/vote/" +
            this.props.match.params.id +
            "/" +
            this.props.match.params.secret,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if (data["status"] === 0) {
                    this.setState({isError: true});
                    return;
                } else {
                    this.props.history.push("/Done");
                }
            })
            .catch(function (err) {
                this.setState({isError: true});
                console.info(err + "------err------");
            }.bind(this));
    }

    delete(i) {
        const newChosen = this.state.chosen;
        newChosen.splice(i, 1);
        this.setState({chosen: newChosen});
    }

    pref(i, val) {
        const newChosenPref = this.state.chosenPref;
        newChosenPref[i] = parseInt(val);
        this.setState({chosenPref: newChosenPref});
    }

    handleTag(event, value) {
        if (!this.state.all.includes(value)) {
            return;
        }
        const newChosen = this.state.chosen;
        if (!newChosen.includes(value)) {
            newChosen.push(value);
            this.setState({chosen: newChosen});
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div style={{justifyContent: "center", display: "flex"}}>
                    <CircularProgress style={{margin: "20px"}}/>
                </div>
            );
        } else if (this.state.isError) {
            return (
                <div>
                    <Alert
                        severity="error"
                        style={{display: "flex", justifyContent: "center"}}
                    >
                        Error! {this.state.errorMsg}.
                    </Alert>
                </div>
            );
        }
        const items = [];

        for (const i in this.state.chosen) {
            items.push(
                <Item
                    key={i.toString()}
                    name={this.state.chosen[i]}
                    onClick={() => this.delete(i)}
                    onPref={(event) => this.pref(i, event.target.value)}
                />
            );
        }
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

            <Box id="main" style={{justifyContent: "center",display: "inline-block"}}>
                <Paper
                    elevation={3}
                    style={{
                        borderRadius: "10px",
                        margin: "10px",
                        padding: "10px",
                        paddingTop: "30px",
                    }}
                >
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            Hello {this.state.name},<br/>
                            Please fill out your preferences for {this.state.project_title}{" "}
                        </p>
                        <span
                            style={{
                                marginLeft:-100,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
              <Typography style={{margin: 10}}>Find Name:</Typography>
              <Autocomplete
                  onInputChange={this.handleTag}
                  options={this.state.all}
                  getOptionLabel={(option) => option}
                  style={{width: 300}}
                  onChange={this.onTagsChange}
                  renderInput={(params) => (
                      <TextField {...params} variant="outlined"/>
                  )}
              />{" "}
            </span>
                        <Paper elevation={0} style={{maxHeight: 400, overflow: "unset"}}>
                            <List style={{justifyContent: "center", alignItems: "center"}}>
                                {items}
                            </List>
                        </Paper>
                        <span
                            style={{
                                margin: "20px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
              <Button
                  type="submit"
                  style={{margin: "20px", alignSelf: "center"}}
                  variant="contained"
                  color="primary"
              >
                Submit
              </Button>
            </span>
                        <div>
                            Note:
                            <ul>
                                <li>
                                    You can leave out choices, it that case they will be assigned a
                                    preference of zero.
                                </li>
                                <li>
                                    Filling out as many choices as you can will lead to a better
                                    matching.
                                </li>
                            </ul>
                        </div>
                    </form>
                </Paper>
            </Box>
            </div>
        );
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListItem style={{justifyContent: "center", alignItems: "center"}}>
                <Paper>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Typography align="center" style={{margin: "20px"}}>
                            {this.props.name}
                        </Typography>
                        <TextField
                            style={{minWidth: "170px",marginBottom:"20px"}}
                            required={true}
                            onChange={this.props.onPref}
                            InputProps={{inputProps: {max: 10, min: 0}}}
                            type="number"
                            label="Preference (0-10)"
                        />
                        <IconButton aria-label="delete" onClick={this.props.onClick}>
                            <DeleteIcon fontSize="large"/>
                        </IconButton>
                    </div>
                </Paper>
            </ListItem>
        );
    }
}

export default FillPreference;
