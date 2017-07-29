/**
 * Tests for HomePage sagas
 */

import expect from 'expect';
import { takeLatest } from 'redux-saga';
import { take, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getRepos, getReposWatcher, githubData } from '../sagas';

import { LOAD_REPOS } from 'containers/App/constants';


describe('getReposWatcher Saga', () => {
  const getReposWatcherGenerator = getReposWatcher();

  it('should watch for LOAD_REPOS action', () => {
    const takeDescriptor = getReposWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(fork(takeLatest, LOAD_REPOS, getRepos));
  });
});

describe('githubDataSaga Saga', () => {
  const githubDataSaga = githubData();

  let forkDescriptor;

  it('should asyncronously fork getReposWatcher saga', () => {
    forkDescriptor = githubDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(getReposWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = githubDataSaga.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel() the forked getReposWatcher saga',
     function* githubDataSagaCancellable() {
      // reuse open fork for more integrated approach
       forkDescriptor = githubDataSaga.next(put(LOCATION_CHANGE));
       expect(forkDescriptor.value).toEqual(cancel(forkDescriptor));
     }
   );
});
