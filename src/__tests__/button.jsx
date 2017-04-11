import React from 'react';
import {Button} from '../components';
import {outerHTML} from '../build/helpers';

describe('Button component', () => {
  it(`renders submit variant`, () => {
    expect(
      outerHTML(
        <Button submit text="Submit"/>
      )
    ).toMatchSnapshot();
  });
  it(`renders hyperlink variant`, () => {
    expect(
      outerHTML(
        <Button text="Hyperlink" href="/"/>
      )
    ).toMatchSnapshot();
  });
});
