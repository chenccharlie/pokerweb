// Generated by main.pagedraw.json
import React from 'react';
import Betbutton from './betbutton';
import Foldbutton from './foldbutton';
import './betfoldaction.css';


export default class Betfoldaction extends React.Component {
  render() {
    return (
      <div className="betfoldaction-betfoldaction-3">
          <div className="betfoldaction-0">
              <div className="betfoldaction-0-0">
                  <div className="betfoldaction-0-0-0">
                      <input type="range" min={String(this.props.min)} max={String(this.props.max)} value={String(this.props.value)} onChange={this.props.handleSliderChange} className="betfoldaction-slider-5" /> 
                  </div>
              </div>
              <div className="betfoldaction-bet_button-6">
                  <Betbutton amount={this.props.value} betAction={this.props.betAction} max_bet={this.props.max} /> 
              </div>
          </div>
          <div className="betfoldaction-1">
              <div className="betfoldaction-fold_button-5">
                  <Foldbutton foldAction={this.props.foldAction} /> 
              </div>
          </div>
      </div>
    );
  }
};