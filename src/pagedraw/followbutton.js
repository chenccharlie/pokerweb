// Generated by main.pagedraw.json
import React from 'react';
import Button from './button';
import './followbutton.css';


export default class Followbutton extends React.Component {
  render() {
    return (
      <div className="followbutton-followbutton-7">
          <div className="followbutton-0">
              <div onClick={() => {this.props.betAction(this.props.amount);}} className="followbutton-button-8">
                  <Button text={("CALL " + this.props.amount.toString())} /> 
              </div>
              <div className="followbutton-0-1" /> 
          </div>
      </div>
    );
  }
};
