import React from "react";

import axios from "axios";
import { Button } from "@material-ui/core"

import { API_URL } from "../Constants"
import ShowPoker from "./Poker"
import Header from "../pagedraw/header"

class GameInfoView extends React.Component {
    render() {
        let game = this.props.game_data
        return (
            <div>
                <h4>ROOM KEY: <b>{game.room_key}</b></h4>
                <h4>PLAYER NAME: <b>{game.name}</b></h4>
            </div>
        )
    }
}

class SeatForm extends React.Component {
    sitDown = function(slot_idx) {
        let post_data = {
            "slot_idx": slot_idx
        }

        axios.post(
            API_URL + "sit/",
            post_data,
            { withCredentials: true }
        ).then(() => {
            window.location.reload(false);
        });
    };

    render() {
        let seat_buttons = []
        if (this.props.game_data.available_slots != null) {
            for(const slot_idx of this.props.game_data.available_slots) {
                seat_buttons.push(
                    <Button 
                        key={slot_idx.toString()}
                        variant="outlined" 
                        onClick={() => this.sitDown(slot_idx)}
                    >
                        Sit {slot_idx}
                    </Button>
                )
            }
        }

        return (
            <div>
                <h4>YOUR SEAT: {this.props.game_data.slot_idx}</h4>
                { seat_buttons }
            </div >
        );
    }
}

class GameView extends React.Component {
    render() {
        let game = this.props.game_data
        if(game.game_type === "poker" && game.poker_state != null)
            return ShowPoker(game)
        return <div></div>
    }
}

class PlayerView extends React.Component {
    constructor(props) {
        super(props)
        this.refreshData = this.refreshData.bind(this)
    }

    state = {
        game_data: ""
    }

    is_in_game = function() {
        if(this.state.game_data.game_type === "poker" && this.is_in_poker_game())
            return true
        return false
    };

    is_in_poker_game = function () {
        if(this.state.game_data.poker_state == null) return false
        return this.state.game_data.poker_state.game_status === "playing"
    };

    componentDidMount() {
        // Refresh game data every 60 seconds
        this.refreshData_interval = setInterval(this.refreshData, 60000)
        this.refreshData();
    }

    componentWillUnmount() {
        clearInterval(this.refreshData_interval)
    }

    refreshData = async function () {
        try {
            let response = await axios.get(API_URL + "view/", {
                withCredentials: true
            });
            console.log(JSON.stringify(response.data, null, '\t'))
            this.setState({
                game_data: response.data
            })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <Header room_key={this.state.game_data.room_key} name={this.state.game_data.name} />
                {!this.is_in_game() && 
                    <SeatForm 
                        game_data={this.state.game_data} 
                    /> 
                }
                <GameView game_data={this.state.game_data} />
            </div>
        );
    }
}

export default function Play() {
    return (
        <PlayerView />
    );
}