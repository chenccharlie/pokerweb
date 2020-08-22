import React from "react";

import axios from "axios";
import { Button } from "@material-ui/core"

import { API_URL } from "../Constants"

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
            this.props.refresh_data()
        });
    };

    render() {
        let seat_buttons = []
        if (this.props.game_data.available_slots != null) {
            for(const slot_idx of this.props.game_data.available_slots) {
                seat_buttons.push(
                    <Button 
                        variant="outlined" 
                        onClick={() => this.sitDown(slot_idx)} value={slot_idx}
                    >
                        Sit {slot_idx}
                    </Button>
                )
            }
        }

        return (
            <div>
                { seat_buttons }
            </div >
        );
    }
}

class PlayerView extends React.Component {
    constructor(props) {
        super(props)
        this.refresh_data = this.refresh_data.bind(this)
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
        // Refresh game data every 30 seconds
        this.refresh_data_interval = setInterval(this.refresh_data, 30000)
        this.refresh_data();
    }

    componentWillUnmount() {
        clearInterval(this.refresh_data_interval)
    }

    refresh_data = async function () {
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
                <div>
                    {JSON.stringify(this.state.game_data, null, '\t')}
                </div>
                {!this.is_in_game() && 
                    <SeatForm 
                        game_data={this.state.game_data} 
                        refresh_data={this.refresh_data} 
                    /> 
                }
            </div>
        );
    }
}

export default function Play() {
    return (
        <div>
            <h2>Play</h2>
            <div>
                <PlayerView />
            </div>
        </div>
    );
}