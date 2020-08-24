// Generated by main.pagedraw.json
import React from 'react';
import Betcheckaction from './betcheckaction';
import Betfoldaction from './betfoldaction';
import './useractions.css';


export default class Useractions extends React.Component {
  render() {
    return (
      <div className="useractions">
          { (this.props.action_type === "bet_or_check") ?
              <div className="useractions-bet_or_check-0">
                  <div className="useractions-0-0-0">
                      <div className="useractions-action-0">
                          <Betcheckaction checkAction={this.props.checkAction} min={this.props.min_bet} max={this.props.amount_available} value={this.props.cur_bet} betAction={this.props.betAction} handleSliderChange={this.props.handleSliderChange} /> 
                      </div>
                  </div>
              </div>
          : null}
          { (this.props.action_type === "") ?
              <div className="useractions-component-4" /> 
          : null}
          { (this.props.action_type === "bet_or_fold") ?
              <div className="useractions-bet_or_fold-9">
                  <div className="useractions-2-0-0">
                      <div className="useractions-action-3">
                          <Betfoldaction min={this.props.min_bet} max={this.props.amount_available} value={this.props.cur_bet} betAction={this.props.betAction} foldAction={this.props.foldAction} handleSliderChange={this.props.handleSliderChange} /> 
                      </div>
                  </div>
              </div>
          : null}
      </div>
    );
  }
};
