import React from 'react';
import container from '../';
import {Clients, Folio, Hero, Sectors, Steps} from '../../components';

const Home = () => {
  return (
    <main className="c-main c-main--home">
      <Hero/>
      <Steps/>
      <Sectors/>
      <Folio/>
      <Clients/>
    </main>
  );
};

export default container(Home);
