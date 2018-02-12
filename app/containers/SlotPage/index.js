/* eslint-disable */

import React from 'react';
import Helmet from 'react-helmet';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import { random, difference, fill, countBy } from 'lodash';

const OneSlot = ({ token }) => {
  const style = {
    flexGrow: 1,
    borderLeft: '1px solid black',
    lineHeight: '100px',
    backgroundColor: token
  };

  return (
    <div style={style}>{token}</div>
  );
}

const Winner = ({ token }) => <div style={{
  backgroundColor: token,
  textAlign: 'center',
  fontSize: 50,
  marginBottom: 50,
}}>{token}</div>;
const SlotMachine =  ({ curBet, curSpin }) => {
  console.log(curBet, curSpin);
  const multiplier = 1000;
  const whatCanIHit = [
    'RED', 'RED', 'RED', 'RED',
    'RED', 'RED', 'RED', 'RED',
    'GREEN', 'GREEN',
    'GREEN', 'GREEN',
    'BLUE',
    'BLUE',
    'BLUE',
    'YELLOW',
  ];
  const theSet = new Set(whatCanIHit);
  const multiplierByToken = Object.keys(countBy(whatCanIHit)).map((key, value) =>  multiplier / value);
  console.log(multiplierByToken, countBy(whatCanIHit));
  const tokens = [...theSet].fill(0).map(() => whatCanIHit[random(0, whatCanIHit.length - 1 )]);
  const allGood = ([...theSet].map(k => difference(tokens, [k, k, k]))).map(x => x.length === 0);

  return (
    <div>
      {allGood.map((k,v) => k && <Winner token={whatCanIHit[v]} />)}
      <div style={{
        display: 'flex',
        textAlign: 'center',
        border: '1px solid black',
        borderLeft: 'none',
      }}>
        {tokens.map(t => <OneSlot token={t} />)}
      </div>
      {[...theSet].map(v => <div>{v}: {curBet} x {multiplier / countBy(whatCanIHit)[v]}</div>)}
    </div>
  );
}

class SlotPage extends React.Component {
  state = {
    bet: 0,
    spins: 0,
  }

  onClick = () => this.setState({
    bet: 1000,
    spins: this.state.spins + 1,
  });

  render() {
    return (
      <article>
        <Helmet title="SLOT MACHINE" />
        <h1>Slot Machine</h1>
        <SlotMachine curBet={this.state.bet} curSpin={this.state.spins} />
        <button onClick={this.onClick}>CLICKME</button>
      </article>
    );
  }
}
//
// const SlotPage = ({}) => (
//   <article>
//     <Helmet title="SLOT MACHINE" />
//     <h1>Slot Machine</h1>
//     <SlotMachine />
//     <button onClick=()>CLICKME</button>
//   </article>
// );

// SlotPage.propTypes = {
//   goblins: React.PropTypes.array,
//   c: React.PropTypes.func,
// };
//
// export function mapDispatchToProps(dispatch) {
//   return {
//     c: (addOrRemove, what) => dispatch(changeGoblins(addOrRemove, what)),
//   };
// }
// //
// const mapStateToProps = createStructuredSelector({
//   goblins: selectGoblins(),
// });
//
// // Wrap the component to inject dispatch and state into it
// export default connect(mapStateToProps, mapDispatchToProps)(SlotPage);
export default SlotPage;
