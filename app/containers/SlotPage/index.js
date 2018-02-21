import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import H1 from 'components/H1';
import Button from 'components/Button';
import SlotOdds from './Slot/Odds';

import {
  random, difference, flattenDeep, isEqual, flatten,
} from 'lodash';

const red = new Array(8).fill('RED');
const green = new Array(4).fill('GREEN');
const blue = new Array(2).fill('BLUE');
// const yellow = new Array(1).fill('YELLOW');
const whatCanIHit = [
  ...red,
  ...green,
  ...blue,
  // ...yellow,
];
const uniqueTokens = new Set(whatCanIHit);
const OneSlot = styled.div`
  border-left: 1px solid black;
  line-height: 100px;
  flex-grow: 1;
  background-color: ${props => props.color};
  color: ${props => props.winnerLine ? 'gold' : 'black'};
  transition: all 1000ms;
  width: 25%;
`;

const Winner = styled.div`
  background-color: ${props => props.color};
  text-align: center;
  font-size: 50px;
  border: 1px solid black;
  border-top: none;
  position: absolute;
  width: 100%;
`;

const SlotContainer = styled.div`
  border: 1px solid black;
  border-left: none;
  border-bottom: none;
`;

const Line = styled.div`
  display: flex;
  text-align: center;
  border-bottom: 1px solid black;
`;

const winningLines = [
  [true, true, true],
  [false, false, false, true, true, true],
  [false, false, false, false, false, false, true, true, true],
  [true, false, false, false, true, false, false, false, true],
  [false, false, true, false, true, false, true, false, false],
];

const getWinningLines = (lines) => {
  const tokens = flattenDeep(lines);

  const howto = [...uniqueTokens].map(a => {
    return winningLines.map(b => {
      return b.map(el => el && a);
    })
  });

  const what = howto.map((a) => {
    const test = a.filter(b => {
      const hej = b.map((color, index) => {
        return color === tokens[index] && color;
      });

      return isEqual(hej, b);
    })

    return test;
  });

  return flatten(what);
}
const calcNumber = (token, line) => {
  if(line == 0) return token;

  const nextLine = ([...uniqueTokens].length);

  return token + (nextLine * line);
}

const SlotMachine = ({ curBet, curSpin }) => {
  const multiplier = 1000;
  // const uniqueTokens = new Set(whatCanIHit);
  const lines = [
    [...uniqueTokens].fill(0).map(() => whatCanIHit[random(0, whatCanIHit.length - 1 )]),
    [...uniqueTokens].fill(0).map(() => whatCanIHit[random(0, whatCanIHit.length - 1 )]),
    [...uniqueTokens].fill(0).map(() => whatCanIHit[random(0, whatCanIHit.length - 1 )]),
  ]

  const winnings = getWinningLines(lines);

  const w = flatten(winnings.map((s) => {
    const horse = s.map((o, i) => {
      return o !== false && i;
    }).filter(f => typeof f === 'number')

    return horse;
  }));

  return (
    <div style={{position: 'relative'}}>
      <SlotContainer>
        {lines.map((l, li) => <Line>{l.map((t, i) => <OneSlot winnerLine={w.indexOf(calcNumber(i, li)) >= 0} color={t}>{t}</OneSlot>)}</Line>)}
      </SlotContainer>
      <SlotOdds tokens={whatCanIHit} multiplier={multiplier} />
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
        <div>
          <H1>Slot Machine</H1>
        </div>
        <SlotMachine curBet={this.state.bet} curSpin={this.state.spins} />
        <Button onClick={this.onClick}>SPIN</Button>
      </article>
    );
  }
}
export default SlotPage;
