// Generated by main.pagedraw.json
import React from 'react';
import Playercards from './playercards';
import Chips from './chips';
import Useractions from './useractions';
import './pokergameview.css';


export default class Pokergameview extends React.Component {
  render() {
    return (
      <div className="pokergameview-pokergameview-2">
          <div className="pokergameview-0">
              <div className="pokergameview-0-0" /> 
              <div className="pokergameview-player_cards-1">
                  <Playercards cards={this.props.cards} toggleShowCards={this.props.toggleShowCards} show_cards={this.props.show_cards} /> 
              </div>
              <div className="pokergameview-0-2" /> 
          </div>
          <div className="pokergameview-1">
              <div className="pokergameview-chips-3">
                  <Chips amount={this.props.amount_available} /> 
              </div>
          </div>
          <div className="pokergameview-2">
              <div className="pokergameview-2-0" /> 
              <div className="pokergameview-user_actions-3">
                  <Useractions action_type={(this.props.user_action || "")} betAction={this.props.betAction} checkAction={this.props.checkAction} foldAction={this.props.foldAction} min_bet={this.props.min_bet} amount_available={this.props.amount_available} cur_bet={this.props.cur_bet} handleSliderChange={this.props.handleSliderChange} /> 
              </div>
              <div className="pokergameview-2-2" /> 
          </div>
          <div className="pokergameview-3" /> 
      </div>
    );
  }
};