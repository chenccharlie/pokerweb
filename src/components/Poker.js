import React from "react";

import axios from "axios";
import { Button, Card, CardContent, Grid, Input, Slider, Typography } from "@material-ui/core"

import { API_URL } from "../Constants"

class CardView extends React.Component {
    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        <b>{this.props.card.color}</b>
                    </Typography>
                    <Typography color="textSecondary">
                        <b>{this.props.card.number}</b>
                    </Typography>
                    <Typography variant="body2" component="p">
                        {this.props.card.color} {this.props.card.number}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

class CardsView extends React.Component {
    render() {
        return (
            <div>
                <CardView card={this.props.cards[0]} />
                <CardView card={this.props.cards[1]} />
            </div>
        )
    }
}

class BetActionView extends React.Component {
    constructor(props) {
        super(props)
        this.handleSliderChange = this.handleSliderChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    state = {
        amount: this.props.min_bet
    }

    handleSliderChange = (event, newValue) => {
        this.setState({
            amount: newValue
        })
    };

    handleInputChange = (event) => {
        let amount = (event.target.value === '' ? '' : Number(event.target.value))
        this.setState({
            amount: amount
        })
    };

    handleBlur = (value) => {
        if (value < this.min_bet) {
            this.setState({
                amount: this.min_bet
            })
        } else if (value > this.max_bet) {
            this.setState({
                amount: this.max_bet
            })
        }
    };

    makeBet = function (amount) {
        let post_data = {
            "poker_action": {
                "action_type": "bet",
                "amount_bet": amount
            }
        }

        axios.post(
            API_URL + "action/",
            post_data,
            { withCredentials: true }
        ).then(() => {
            window.location.reload(false);
        });
    };

    render() {
        return (
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Button
                        variant="outlined"
                        onClick={() => this.makeBet(this.state.amount)}
                    >
                        Bet {this.state.amount}
                    </Button>
                </Grid>
                <Grid item xs>
                    <Slider
                        id="bet_amount_slider"
                        value={typeof this.state.amount === 'number' ? this.state.amount : 0}
                        onChange={this.handleSliderChange}
                        aria-labelledby="input-slider"
                        min={this.props.min_bet}
                        max={this.props.max_bet}
                    />
                </Grid>
                <Grid item>
                    <Input
                        id="bet_amount_input"
                        value={this.state.amount}
                        margin="dense"
                        onChange={this.handleInputChange}
                        onBlur={() => this.handleBlur(this.state.amount)}
                        inputProps={{
                            step: 10,
                            min: this.props.min_bet,
                            max: this.props.max_bet,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        )
    }
}

class CheckActionView extends React.Component {
    makeCheck = function (amount) {
        let post_data = {
            "poker_action": {
                "action_type": "check",
            }
        }

        axios.post(
            API_URL + "action/",
            post_data,
            { withCredentials: true }
        ).then(() => {
            window.location.reload(false);
        });
    };

    render() {
        return (
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Button
                        variant="outlined"
                        onClick={() => this.makeCheck()}
                    >
                        Check
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

class FoldActionView extends React.Component {
    makeCheck = function (amount) {
        let post_data = {
            "poker_action": {
                "action_type": "fold",
            }
        }

        axios.post(
            API_URL + "action/",
            post_data,
            { withCredentials: true }
        ).then(() => {
            window.location.reload(false);
        });
    };

    render() {
        return (
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Button
                        variant="outlined"
                        onClick={() => this.makeCheck()}
                    >
                        Fold
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

class PokerActionView extends React.Component {
    render() {
        if(this.props.min_bet === 0) {
            return (
                <div>
                    <BetActionView min_bet={10} max_bet={this.props.poker_state.amount_available} />
                    <CheckActionView />
                </div>
            )
        }
        return (
            <div>
                <BetActionView min_bet={this.props.poker_state.min_bet} max_bet={this.props.poker_state.amount_available} />
                <FoldActionView />
            </div>
        )
    }
}

class PokerGameView extends React.Component {
    render() {
        let game = this.props.game_data
        return (
            <div>
                <CardsView cards={game.poker_state.cards} />
                <h5>Tokens Available: <b>{game.poker_state.amount_available + game.poker_state.pot_won}</b></h5>
                {game.poker_state.is_your_turn && <PokerActionView poker_state={game.poker_state} />}
            </div>
        )
    }
}

export default function ShowPoker(game_data) {
    return (
        <PokerGameView game_data={game_data}/>
    );
}