import React from 'react';
import Blog from '../components/blog';
import {outerHTML} from './utils';

describe('Blog component', () => {
  it(`renders with defaults`, () => {
    expect(
      outerHTML(
        <Blog/>
      )
    ).toMatchSnapshot();
  });
});
