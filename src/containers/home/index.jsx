import React from 'react';
import {Block, Clients, Folio, Hero, Sectors, Steps} from '../../components';

const Home = () => {
  return (
    <Block isMain classList={['c-main--home']}>
      <Hero/>
      <Steps/>
      <Sectors/>
      <Folio/>
      <Clients/>
    </Block>
  );
};

Home.defaultProps = {
  pageHeading: 'David Bushell – Web Design & Front-end Development (based in Manchester, UK)'
};

export default Home;

