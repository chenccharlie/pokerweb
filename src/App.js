import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import axios from "axios";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/dashboard/">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/play/">
            <Play />
          </Route>
          <Route path="/dashboard/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

class SigninForm extends React.Component {
  state = {
    room_key: "",
    name: "",
  };

  signIn = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/signin/", this.state).then(() => {
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

function Home() {
  const history = useHistory();

  return (
    <div>
      <SigninForm history={history}/>
    </div>
  );
}

function Play() {
  return (
    <div>
      <h2>Play</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
