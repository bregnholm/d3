import React from 'react';

const Goblin = ({ name, add, remove, count, totalCount }) => {
  return (
  <div style={{lineHeight: '30px', borderBottom: '1px solid black'}}>
    <span style={{float:'right', marginLeft: 10}}>({totalCount > 0 ? Math.round(count / totalCount * 100, 0) : 0}%)</span>
    <span style={{float:'right'}}>{count}</span>
    <span style={{cursor: 'pointer', fontSize: 30}} onClick={add}>+</span>
    <span style={{cursor: 'pointer', fontSize: 30, marginLeft: 10}} onClick={remove}>-</span>
    <span style={{marginLeft: '1em'}}>{name}</span>
  </div>
)};

export default Goblin;
