import React from 'react';
import Blog from '../components/blog';
import blogDefaults from '../components/blog/defaults';
import {outerHTML} from './utils';

describe('Blog component', () => {
  it(`renders with defaults`, () => {
    expect(
      outerHTML(
        <Blog {...blogDefaults}/>
      )
    ).toMatchSnapshot();
  });
});
