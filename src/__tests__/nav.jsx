import React from 'react';
import Nav from '../components/nav';
import {outerHTML} from './utils';

describe('Nav component', () => {
  it(`renders with defaults`, () => {
    expect(
      outerHTML(
        <Nav/>
      )
    ).toMatchSnapshot();
  });
});
