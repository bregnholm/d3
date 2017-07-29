import React from 'react';
import _ from 'lodash';
import p from './paragons';

export default class Calculations extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  calc(paragonA, paragonB) {
    const expForParagonB = this.convertToEXP(paragonB);
    const expForParagonA = this.convertToEXP(paragonA);
    return this.convertToParagon(expForParagonA + expForParagonB);
  }

  calcNeeded(seasonParagons, wantToBeParagons) {
    const expForParagonB = this.convertToEXP(wantToBeParagons);
    const expForParagonA = this.convertToEXP(seasonParagons);
    return this.convertToParagon(expForParagonB - expForParagonA);
  }

  convertToEXP(paragon) {
    const xp = _.find(p.paragon, { level: paragon });
    return xp.total;
  }

  convertToParagon(exp) {
    const xp = _.find(p.paragon, (o) => o.total >= exp);
    return xp.level;
  }
  render() {
    // Render the content into a list item
    return (
      <span>
        <span>Your paragons after season ends: </span>
        <span>{this.calc(this.props.season, this.props.nonSeason)}</span>
        <br />
        <span>You need in this season: </span>
        <span>{this.calcNeeded(this.props.nonSeason, this.props.wantToBe)}</span>
      </span>
    );
  }
}

Calculations.propTypes = {
  season: React.PropTypes.number,
  nonSeason: React.PropTypes.number,
  wantToBe: React.PropTypes.number,
};
