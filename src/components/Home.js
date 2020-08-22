import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useHistory } from "react-router-dom";

import axios from "axios";

import { API_URL } from "../Constants"

class SigninForm extends React.Component {
    state = {
        room_key: "",
        name: "",
    };

    signIn = e => {
        e.preventDefault();
        axios.post(
            API_URL + "signin/", 
            this.state, 
            {withCredentials: true}
        ).then((response) => {
            this.props.history.push("/play/");
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    render() {
        return (
            <Form onSubmit={this.signIn}>
                <FormGroup>
                    <Label for="room_key">Room Key:</Label>
                    <Input
                        type="text"
                        name="room_key"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.room_key)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name:</Label>
                    <Input
                        type="text"
                        name="name"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.name)}
                    />
                </FormGroup>
                <Button>Join</Button>
            </Form>
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