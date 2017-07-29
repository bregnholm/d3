/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('goblins');

const selectNonSeason = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('nonSeason')
);

const selectWantToBe = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('wantToBe')
);

const selectSeason = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('season')
);

export {
  selectHome,
  selectNonSeason,
  selectSeason,
  selectWantToBe,
};
