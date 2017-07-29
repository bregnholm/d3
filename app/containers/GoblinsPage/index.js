import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Goblin from './Goblin';
// import Input from './Input';
// import Calculations from '../../components/Calculations';
import { loadRepos } from '../App/actions';
import { changeGoblins } from './actions';
import { selectGoblins } from './selectors';

export class GoblinsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const totalCount = this.props.goblins.reduce((n,g) => n + g.get('count'), 0);
    return (
      <article>
        <Helmet title="D3 - Goblins" />
        <h1>Goblins</h1>
        <div>
          {this.props.goblins.map(
            (goblin) =>
            <Goblin
              name={goblin.get('name')}
              count={goblin.get('count')}
              add={this.props.c.bind(this, 'add', goblin.get('name'))}
              remove={this.props.c.bind(this, 'remove', goblin.get('name'))}
              totalCount={totalCount}
            />)}
        </div>
        <br />
        <div>
          <span>Total:</span>
          <span style={{float:'right'}}>{totalCount}</span>
        </div>
      </article>
    );
  }
}

GoblinsPage.propTypes = {
  goblins: React.PropTypes.array,
};

export function mapDispatchToProps(dispatch) {
  return {
    c: (addOrRemove, what) => dispatch(changeGoblins(addOrRemove, what)),
  };
}
//
const mapStateToProps = createStructuredSelector({
  goblins: selectGoblins(),
});
//
// // Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(GoblinsPage);
