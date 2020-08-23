// Generated by main.pagedraw.json
import React from 'react';
import Basecard from './basecard';
import './card.css';
import heart from "../images/card-heart.svg"
import spade from "../images/card-spade.svg"
import club from "../images/card-club.svg"
import diamond from "../images/card-diamond.svg"
import cardback from "../images/card-back.svg"

export default class Card extends React.Component {
  render() {
    return (
      <div className="card">
          { (this.props.color === "spade") ?
              <div className="card-spade-0">
                  <div className="card-0-0-0">
                      <div className="card-card-2">
                          <Basecard text={this.props.text} img_src={spade} /> 
                      </div>
                  </div>
              </div>
          : null}
          { (this.props.color === "heart") ?
              <div className="card-heart-2">
                  <div className="card-1-0-0">
                      <div className="card-card-22">
                          <Basecard text={this.props.text} img_src={heart} /> 
                      </div>
                  </div>
              </div>
          : null}
          { (this.props.color === "club") ?
              <div className="card-club-4">
                  <div className="card-2-0-0">
                      <div className="card-card-5">
                          <Basecard text={this.props.text} img_src={club} /> 
                      </div>
                  </div>
              </div>
          : null}
          { (this.props.color === "") ?
              <div className="card-component-5">
                  <div className="card-3-0-0">
                      <div className="card-image-3" style={{"backgroundImage": ("url('"+(cardback)+"')")}} /> 
                  </div>
              </div>
          : null}
          { (this.props.color === "diamond") ?
              <div className="card-diamond-8">
                  <div className="card-4-0-0">
                      <div className="card-card-4">
                          <Basecard text={this.props.text} img_src={diamond} /> 
                      </div>
                  </div>
              </div>
          : null}
      </div>
    );
  }
};
