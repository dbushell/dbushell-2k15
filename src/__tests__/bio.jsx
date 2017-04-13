import React from 'react';
import {Bio} from '../components';
import {outerHTML} from './utils';

describe('Bio component', () => {
  it(`renders with defaults`, () => {
    expect(
      outerHTML(
        <Bio/>
      )
    ).toMatchSnapshot();
  });
});
