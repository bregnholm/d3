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
  CHANGE_GOBLINS,
} from './constants';
import { fromJS, Map } from 'immutable';

function goblins() {
  const goblins = localStorage.getItem('goblins');
  if(goblins) return JSON.parse(goblins);

  return [
      {name: 'Treasure Goblin', count: 0},
      {name: 'Blood Thief', count: 0},
      {name: 'Gem Hoarder', count: 0},
      {name: 'Gelatinous Sire', count: 0},
      {name: 'Gilded Baron', count: 0},
      {name: 'Insufferable Miscreant', count: 0},
      {name: 'Odious Collector', count: 0},
      {name: 'Rainbow Goblin', count: 0},
      {name: 'Malevolent Tormentor', count: 0},
      {name: 'Menagerist', count: 0}
    ];
}

const initialState = fromJS({
  goblins: goblins(),
});

function goblinsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_GOBLINS:
      const goblins = state.get('goblins').map((goblin) => {
        const g = goblin.toObject();
        if(goblin.get('name') === action.what){
          g.count = action.addOrRemove == 'add' ? g.count+1 : g.count-1;
        }

        g.count = g.count < 0 ? 0 : g.count;

        return Map(g);
       })


      localStorage.setItem('goblins', JSON.stringify(goblins))

      return state.set('goblins', goblins);

    default:
      return state;
  }
}

export default goblinsReducer;
