/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Form from './Form';
import Input from './Input';
import Calculations from '../../components/Calculations';
// import { loadRepos } from '../App/actions';
import { changeNonSeason, changeSeason, changeWantToBe } from './actions';
import { selectNonSeason, selectSeason, selectWantToBe } from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <article>
        <Helmet title="D3 - Calc" />
        <div>
          <Form>
            <label htmlFor="nonSeason">
              Non season paragons:
              <Input
                id="nonSeason"
                type="number"
                placeholder="ie. 700"
                value={this.props.nonSeason}
                onChange={this.props.onChangeNonSeason}
              />
            </label>
            <br />
            <label htmlFor="season">
              Season paragons:
              <Input
                id="season"
                type="number"
                placeholder="ie. 700"
                value={this.props.season}
                onChange={this.props.onChangeSeason}
              />
            </label>
            <br />
            <label htmlFor="season">
              I want to be:
              <Input
                id="wantToBe"
                type="number"
                placeholder="ie. 1000"
                value={this.props.wantToBe}
                onChange={this.props.onChangeWantToBe}
              />
            </label>
          </Form>
          You current paragons for non season: {this.props.nonSeason}
          <br />
          You current paragons for season: {this.props.season}
          <br />
          I want to be: {this.props.wantToBe}
          <br />
          <br />

          <Calculations {...this.props} />
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  nonSeason: React.PropTypes.number,
  season: React.PropTypes.number,
  wantToBe: React.PropTypes.number,
  onChangeNonSeason: React.PropTypes.func,
  onChangeSeason: React.PropTypes.func,
  onChangeWantToBe: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeNonSeason: (evt) => dispatch(changeNonSeason(evt.target.value)),
    onChangeSeason: (evt) => dispatch(changeSeason(evt.target.value)),
    onChangeWantToBe: (evt) => dispatch(changeWantToBe(evt.target.value)),
  };
}

const mapStateToProps = createStructuredSelector({
  nonSeason: selectNonSeason(),
  season: selectSeason(),
  wantToBe: selectWantToBe(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
