import React from "react";

import axios from "axios";
import { Button, Grid, Input, Slider } from "@material-ui/core"

import { API_URL } from "../Constants"
import PlayerCards from "../pagedraw/playercards"

import "../css/cards.css"

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
    constructor(props) {
        super(props)
        this.toggleShowCards = this.toggleShowCards.bind(this)
    }

    state = {
        show_cards: false
    }

    toggleShowCards = function () {
        this.setState({
            show_cards: !this.state.show_cards
        })
    }

    render() {
        let game = this.props.game_data
        let cards = game.poker_state.cards
        for(var card of cards) {
            let text = card.number.toString()
            if (card.number === 1)
                text = "A"
            if (card.number === 11)
                text = "J"
            if (card.number === 12)
                text = "Q"
            if (card.number === 13)
                card.number = "K"
            card.number = text
        }
        return (
            <div>
                <PlayerCards cards={game.poker_state.cards} toggleShowCards={this.toggleShowCards} show_cards={this.state.show_cards} />
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