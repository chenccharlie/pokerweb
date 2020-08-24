import React from "react";

import axios from "axios";

import { API_URL } from "../Constants"
import PokerGameView from "../pagedraw/pokergameview"

import "../css/cards.css"

class PokerView extends React.Component {
    constructor(props) {
        super(props)
        this.toggleShowCards = this.toggleShowCards.bind(this)
        this.handleSliderChange = this.handleSliderChange.bind(this)
        this.checkAction = this.checkAction.bind(this)
        this.foldAction = this.foldAction.bind(this)
        this.betAction = this.betAction.bind(this)
    }

    state = {
        show_cards: false,
        cur_bet: 0,
    }

    toggleShowCards = function () {
        this.setState({
            show_cards: !this.state.show_cards
        })
    }

    handleSliderChange = function(event) {
        this.setState({
            cur_bet: event.target.value
        })
    };

    checkAction = function () {
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

    foldAction = function () {
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

    betAction = function (amount) {
        let post_data = {
            "poker_action": {
                "action_type": "bet",
                "amount_bet": amount,
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
                text = "K"
            card.number = text
        }
        let user_action = ""
        let min_bet = game.poker_state.min_bet
        let amount_available = game.poker_state.amount_available + game.poker_state.pot_won
        if (game.poker_state.is_your_turn) {
            if (min_bet === 0) {
                min_bet = Math.min(game.poker_state.small_blind, amount_available)
                user_action = "bet_or_check"
            } else {
                user_action = "bet_or_fold"
            }
            this.state.cur_bet = Math.max(min_bet, this.state.cur_bet)
        }

        return (
            <div>
                <PokerGameView 
                    cards={game.poker_state.cards} 
                    toggleShowCards={this.toggleShowCards} 
                    show_cards={this.state.show_cards}
                    amount_available={amount_available}
                    min_bet={min_bet}
                    cur_bet={this.state.cur_bet}
                    user_action={user_action}
                    betAction={this.betAction}
                    checkAction={this.checkAction}
                    foldAction={this.foldAction}
                    handleSliderChange={this.handleSliderChange}
                />
            </div>
        )
    }
}

export default function ShowPoker(game_data) {
    return (
        <PokerView game_data={game_data}/>
    );
}