import React from 'react';
import { random, difference, fill, countBy } from 'lodash';
import styled from 'styled-components';


const Odds = styled.div`
  display: flex;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  div {
    flex-basis: 50%;
    text-align: center;

    &:first-child {
      text-align: left;
    }

    &:last-child {
      text-align: right;
    }
  }
`;

const SlotOdds = ({ tokens, multiplier }) => {
  const uniqueTokens = new Set(tokens);
  const multiplierByToken = [...uniqueTokens].map((name, key) =>  {
    const count = countBy(tokens)[name];
    const data = {
      chance: Math.pow((tokens.length / count), uniqueTokens.size),
      multiplier: multiplier / count,
      name,
    }
    data.percentage = ((1 / data.chance) * 100);
    return data;
  });

  return (
    <div style={{ marginTop: 80 }}>
      <Odds bold>
        <div>NAME</div>
        {/* <div>IN-A-ROW</div> */}
        <div>MULTIPLIER</div>
        <div>CHANCE</div>
      </Odds>
      {
        Object
          .keys(multiplierByToken)
          .map(k => (
            <Odds>
              <div>{multiplierByToken[k].name}</div>
              {/* <div>4</div> */}
              <div>{multiplierByToken[k].multiplier}</div>
              <div title={`${multiplierByToken[k].percentage}%`}>{Math.round(multiplierByToken[k].percentage * 1000) / 1000}%</div>
            </Odds>
          )
        )
      }
    </div>
  );
}

export default SlotOdds;
