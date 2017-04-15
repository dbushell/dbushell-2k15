import React from 'react';
import Block from '../../components/block';
import Clients from '../../components/clients';
import Folio from '../../components/folio';
import Hero from '../../components/hero';
import Sectors from '../../components/sectors';
import Steps from '../../components/steps';

const Home: React.SFC<any> = () => {
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

