import React from "react";
import validator from "validator";
import {Alert} from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
    Paper,
    Button,
    Box,
    Grid,
    TextField,
} from "@material-ui/core";
import {api_url} from "./config";

class InitForm extends React.Component {
    constructor() {
        super();
        this.state = {isLoading: false, isError: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let val = event.target.value;
        if (name === "member_emails") {
            this.setState({member_emails: val.trim().split(/\r?\n/)});
        } else if (name === "member_names") {
            this.setState({member_names: val.trim().split(/\r?\n/)});
        } else if (name === "deadline") {
            this.setState({deadline: Date.parse(val) / 1000});
        } else if (name === "grp_size") {
            this.setState({grp_size: parseInt(val)});
        } else {
            this.setState({[name]: val});
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        for (const i of this.state["member_emails"]) {
            if (!validator.isEmail(i.trim())) {
                alert(
                    "Please Check Member Emails For Error (Invalid Email-Id,Empty Rows etc)"
                );
                return;
            }
        }
        for (const i of this.state["member_names"]) {
            if (i === "") {
                alert("Please Check Member Names For Error (Empty Rows etc)");
                return;
            }
        }
        if (
            this.state.member_emails.length === 0 ||
            this.state.member_names.length === 0
        ) {
            alert("Please Fill All Fields");
            return;
        }
        if (this.state.member_emails.length !== this.state.member_names.length) {
            alert("Different Number Of Names And Email");
            return;
        }

        if (this.state.deadline< Date.now()/1000) {
            alert("Please Enter Valid Deadline");
            return;
        }

        this.setState({isLoading: true});
        let payload = {...this.state};
        delete payload["isError"];
        delete payload["isLoading"];
        delete payload["member_emails"];
        delete payload["member_names"];
        payload["members"] = Array()

        for (let i = 0; i < this.state.member_emails.length; i++) {
            payload["members"].push({
                "name": this.state.member_names[i],
                "email": this.state.member_emails[i]
            })
        }
        console.log(payload);
        console.log("----------");
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        };
        fetch(api_url + "/create", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                this.setState({isLoading: false});
                if (data["status"] === 0) {
                    this.setState({isError: true});
                    return;
                }
                this.props.history.push("/Done");
            })
            .catch(function (err) {
                this.setState({isLoading: false, isError: true});
                console.info(err + "------err------");
            }.bind(this));
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
                        Error! Something Happened. Please Try Again.
                    </Alert>
                </div>
            );
        }

        return (
            <Box id="main">
                <Paper
                    elevation={3}
                    style={{
                        borderRadius: "10px",
                        margin: "10px",
                        padding: "10px",
                        paddingTop: "30px",
                    }}
                >
                    <ul>
                        <li>
                            <b>Whats this app about?</b>
                            <ul>
                                <li>
                                    It automates group formation for
                                    projects/presentations/assignments etc, based on individual preferences.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p>
                                <b>But why not just ask other participants instead?</b>
                                <br/>
                                <ul>
                                    <li>
                                        Asking dozens of people to see if they are
                                        available is really annoying.
                                    </li>
                                    <li>
                                        You might feel that you would have been better off with some other choice.
                                    </li>
                                    <li>
                                        A situation might arise where everyone is grouped but some groups are left with
                                        vacancies.
                                    </li>

                                    <li>
                                        By letting an app do the matching, you also avoid all those
                                        awkward moments where you have to reject someone or get
                                        rejected.
                                    </li>
                                </ul>
                            </p>
                        </li>

                        <li>
                            <b>How to use?</b>
                            <br/>
                            <ul>
                                <li>You fill out this form.</li>
                                <li>
                                    The app will mail a form to every participants, asking them
                                    to assign a preference (on a scale of 1 to 10) to all the other participants they
                                    would like to be grouped with.
                                </li>
                                <li>
                                    Once everyone has filled their choices (or the deadline is reached),
                                    the app will form optimal groups and send emails to all the participants,
                                    informing them of their respective groups.
                                    Additionally it will also send you a mail containing all group allocations.
                                </li>
                            </ul>
                            <br/>
                        </li>
                        <li>
                            <b>How does it work?</b>
                            <ul>
                                <li>
                                    See&nbsp;
                                    <a href="https://github.com/AnjayGoel/Stable-Roommate-Generalised">
                                        this
                                    </a>. Suggestions, PRs are welcomed.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </Paper>
                <br/>
                <Paper
                    elevation={3}
                    style={{
                        borderRadius: "10px",
                        margin: "10px",
                        padding: "10px",
                    }}
                >
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        style={{
                            padding: "40px",
                        }}
                    >
                        <form id="mainForm" onSubmit={this.handleSubmit}>
                            <p>Your Name</p>
                            <TextField
                                name="organizer_name"
                                type="text"
                                required={true}
                                data-parse="uppercase"
                                onChange={this.handleChange}
                            />
                            <p>Your Email</p>
                            <TextField
                                name="organizer_email"
                                type="email"
                                required={true}
                                onChange={this.handleChange}
                            />
                            <p>Title of Project</p>
                            <TextField
                                name="project_title"
                                type="text"
                                required={true}
                                onChange={this.handleChange}
                            />
                            <p>Group Size</p>
                            <TextField
                                name="grp_size"
                                type="number"
                                InputProps={{inputProps: {min: 2}}}
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
                            <div style={{display: "flex"}}>
                <span style={{margin: "20px", marginLeft: "0px"}}>
                  <p>Participants Names</p>
                  <TextField
                      multiline={true}
                      required={true}
                      rows={5}
                      rowsMax={10}
                      onChange={this.handleChange}
                      label="Participant Names"
                      variant="outlined"
                      name="member_names"
                      helperText="Seperated by a new line"
                  />
                </span>
                                <span style={{margin: "20px"}}>
                                    <p>Participant Emails</p>
                  <TextField
                      multiline={true}
                      required={true}
                      rows={5}
                      rowsMax={10}
                      onChange={this.handleChange}
                      label="Participant Emails"
                      variant="outlined"
                      name="member_emails"
                      helperText="Ensure same order as names"
                  />
                </span>
                                <p/>
                            </div>
                            <Button type="Submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </form>
                    </Grid>
                </Paper>
            </Box>
        );
    }
}

export default InitForm;
