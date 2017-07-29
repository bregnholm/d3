/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  CHANGE_NONSEASON,
  CHANGE_SEASON,
  CHANGE_WANTTOBE,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  nonSeason: 0,
  season: 0,
  wantToBe: 1000,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NONSEASON:
      // Delete prefixed '@' from the github username
      return state
        .set('nonSeason', parseInt(action.paragon, 10));
    case CHANGE_SEASON:
      // Delete prefixed '@' from the github username
      return state
        .set('season', parseInt(action.paragon, 10));
    case CHANGE_WANTTOBE:
      // Delete prefixed '@' from the github username
      return state
        .set('wantToBe', parseInt(action.paragon, 10));
    default:
      return state;
  }
}

export default homeReducer;
