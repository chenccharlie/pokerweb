import React from "react";
import { Button, TextField } from "@material-ui/core"
import { useHistory } from "react-router-dom";

import axios from "axios";

import { API_URL } from "../Constants"

class SigninForm extends React.Component {
    constructor(props) {
        super(props)
        this.signIn = this.signIn.bind(this)
    }

    state = {
        room_key: "",
        name: "",
    };

    signIn = function() {
        axios.post(
            API_URL + "signin/", 
            this.state, 
            {withCredentials: true}
        ).then((response) => {
            this.props.history.push("/play/");
        });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    render() {
        return (
            <div>
                <TextField
                    variant="outlined"
                    id="room_key"
                    label="Room Key"
                    onChange={this.onChange}
                    value={this.defaultIfEmpty(this.state.room_key)}
                />
                <TextField
                    variant="outlined"
                    id="name"
                    label="Your Name"
                    onChange={this.onChange}
                    value={this.defaultIfEmpty(this.state.name)}
                />
                <Button variant="outlined" onClick={this.signIn}>Join</Button>
            </div>
        );
    }
}

export default function Home() {
    const history = useHistory();

    return (
        <div>
            <SigninForm history={history} />
        </div>
    );
}