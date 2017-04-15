import React from 'react';
import Footer from '../components/footer';
import {outerHTML} from './utils';

describe('Footer component', () => {
  it(`renders with defaults`, () => {
    expect(
      outerHTML(
        <Footer/>
      )
    ).toMatchSnapshot();
  });
  it(`renders without "for hire" element`, () => {
    expect(
      outerHTML(
        <Footer isHirable={false}/>
      )
    ).toMatchSnapshot();
  });
});
