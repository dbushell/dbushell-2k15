import React from 'react';
import {Block} from '../';

const Folio = () => {
  return (
    <div className="c-folio">
      <Block>
        <div className="c-folio__header">
          <h2><a href="/showcase/">Featured Projects</a></h2>
        </div>
        <div className="b-folio">
          <ul className="b-folio__list">
            <li className="b-folio__item" style={{backgroundColor: '#b72817'}}>
              <a className="b-folio__link" href="/2016/10/10/building-a-shopify-theme/">
                <span className="b-folio__label">Shopify Theme</span>
                <img className="b-folio__image" src="/assets/img/portfolio/stshopify.png" alt="Building a Shopify Theme"/>
              </a>
            </li>
            <li className="b-folio__item" style={{backgroundColor: '#d8ac59'}}>
              <a className="b-folio__link" href="/2015/03/18/responsive-design-for-houden/">
                <span className="b-folio__label">Houden</span>
                <img className="b-folio__image" src="/assets/img/portfolio/houden.png" alt="Houden"/>
              </a>
            </li>
            <li className="b-folio__item" style={{backgroundColor: '#993300'}}>
              <a className="b-folio__link" href="/2014/05/07/responsive-design-for-uwe-wittwer/">
                <span className="b-folio__label">Uwe Wittwer</span>
                <img className="b-folio__image" src="/assets/img/portfolio/uwewittwer.png" alt="Uwe Wittwer"/>
              </a>
            </li>
          </ul>
        </div>
      </Block>
    </div>
  );
};

export default Folio;
