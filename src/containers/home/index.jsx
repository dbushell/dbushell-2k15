import React from 'react';
import {Block, Clients, Folio, Hero, Sectors, Steps} from '../../components';

const Home = () => {
  return (
    <Block main classList={['c-main--home']}>
      <Hero/>
      <Steps/>
      <Sectors/>
      <Folio/>
      <Clients/>
    </Block>
  );
};

export default Home;

