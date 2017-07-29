import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Goblin from './Goblin';
// import Input from './Input';
// import Calculations from '../../components/Calculations';
import { loadRepos } from '../App/actions';
import { changeNonSeason, changeSeason, changeWantToBe } from './actions';
import { selectNonSeason, selectSeason, selectWantToBe } from './selectors';

export class GoblinsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const goblins = [
      'Treasure Goblin',
      'Blood Thief',
      'Gem Hoarder',
      'Gelatinous Sire',
      'Gilded Baron',
      'Insufferable Miscreant',
      'Odious Collector',
      'Rainbow Goblin',
      'Malevolent Tormentor',
      'Menagerist',
    ];
    return (
      <article>
        <Helmet title="D3 - Goblins" />
        <div>
          {goblins.map((goblin) => <Goblin name={goblin} />)}
        </div>
      </article>
    );
  }
}

GoblinsPage.propTypes = {
  onSubmitForm: React.PropTypes.func,
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
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}
//
const mapStateToProps = createStructuredSelector({
  nonSeason: selectNonSeason(),
  season: selectSeason(),
  wantToBe: selectWantToBe(),
});
//
// // Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(GoblinsPage);
