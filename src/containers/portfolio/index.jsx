import React from 'react';
import Block from '../../components/block';
import Post from '../../components/post';
import Title from '../../components/title';
import LazyImage from '../../components/lazyimage';

const Portfolio = (props) => {
  return (
    <Block isMain>
      <Block>
        <Post>
          <Title heading={props.pageHeading} />
          <div className='b-post__body'>
            <p>Selected web design and front-end development projects.</p>
            <div className='b-folio'>
              <ul className='b-folio__list'>
                <li
                  className='b-folio__item'
                  style={{backgroundColor: '#1e1f2a'}}
                >
                  <a
                    className='b-folio__link'
                    href='/2020/06/08/pwa-web-crypto-encryption-auto-sign-in-redux-persist/'
                  >
                    <span className='b-folio__label'>Mute Swan PWA</span>
                    <img
                      className='b-folio__image'
                      loading='lazy'
                      srcset='
                      /assets/img/portfolio/muteswan@1x.png,
                      /assets/img/portfolio/muteswan@2x.png 2x'
                      src='/assets/img/portfolio/muteswan@1x.png'
                      alt='Mute Swan - Progressive Web App'
                      width='330 '
                      height='220'
                    />
                  </a>
                </li>
                <li
                  className='b-folio__item'
                  style={{backgroundColor: '#29313d'}}
                >
                  <a
                    className='b-folio__link'
                    href='/2016/07/14/building-a-wordpress-theme/'
                  >
                    <span className='b-folio__label'>
                      Base Creative / WordPress
                    </span>
                    <LazyImage
                      className='b-folio__image'
                      src='/assets/img/portfolio/bcwordpress.png'
                      alt='Building a WordPress Theme designed by Base Creative, London'
                    />
                  </a>
                </li>
                <li
                  className='b-folio__item'
                  style={{backgroundColor: '#d8ac59'}}
                >
                  <a
                    className='b-folio__link'
                    href='/2015/03/18/responsive-design-for-houden/'
                  >
                    <span className='b-folio__label'>Houden</span>
                    <LazyImage
                      className='b-folio__image'
                      src='/assets/img/portfolio/houden.png'
                      alt='Houden'
                    />
                  </a>
                </li>
                <li
                  className='b-folio__item'
                  style={{backgroundColor: '#993300'}}
                >
                  <a
                    className='b-folio__link'
                    href='/2014/05/07/responsive-design-for-uwe-wittwer/'
                  >
                    <span className='b-folio__label'>Uwe Wittwer</span>
                    <LazyImage
                      className='b-folio__image'
                      src='/assets/img/portfolio/uwewittwer.png'
                      alt='Uwe Wittwer'
                    />
                  </a>
                </li>
                <li
                  className='b-folio__item'
                  style={{backgroundColor: '#b72817'}}
                >
                  <a
                    className='b-folio__link'
                    href='/2016/10/10/building-a-shopify-theme/'
                  >
                    <span className='b-folio__label'>Shopify Theme</span>
                    <LazyImage
                      className='b-folio__image'
                      src='/assets/img/portfolio/stshopify.png'
                      alt='Building a Shopify Theme'
                    />
                  </a>
                </li>
                <li
                  className='b-folio__item'
                  style={{backgroundColor: '#f05b26'}}
                >
                  <a
                    className='b-folio__link'
                    href='/2016/01/04/css-framework-for-partsgiant/'
                  >
                    <span className='b-folio__label'>PartsGiant</span>
                    <LazyImage
                      className='b-folio__image'
                      src='/assets/img/portfolio/partsgiant.jpg'
                      alt='PartsGiant'
                    />
                  </a>
                </li>
              </ul>
            </div>
            <br />
            <h2>Graphic Design</h2>
            <p>
              Print, advertising, and editorial — these projects from my
              university degree helped develop my understanding of fundamental
              design principles.
            </p>
            <div className='b-folio'>
              <ul className='b-folio__list'>
                <li
                  className='b-folio__item'
                  style={{backgroundColor: '#45b0e5'}}
                >
                  <a
                    className='b-folio__link'
                    href='/showcase/origami-unfolded/'
                  >
                    <span className='b-folio__label'>Origami Unfolded</span>
                    <LazyImage
                      className='b-folio__image'
                      src='/assets/img/portfolio/origami.jpg'
                      alt='Origami Unfolded'
                    />
                  </a>
                </li>
                <li
                  className='b-folio__item'
                  style={{backgroundColor: '#661f1f'}}
                >
                  <a className='b-folio__link' href='/showcase/machinal/'>
                    <span className='b-folio__label'>Machinal</span>
                    <LazyImage
                      className='b-folio__image'
                      src='/assets/img/portfolio/machinal.jpg'
                      alt='Machinal'
                    />
                  </a>
                </li>
                <li
                  className='b-folio__item'
                  style={{backgroundColor: '#e57300'}}
                >
                  <a className='b-folio__link' href='/showcase/space-opera/'>
                    <span className='b-folio__label'>Space Opera</span>
                    <LazyImage
                      className='b-folio__image'
                      src='/assets/img/portfolio/space.jpg'
                      alt='Space Opera'
                    />
                  </a>
                </li>
                <li
                  className='b-folio__item'
                  style={{backgroundColor: '#e5c72e'}}
                >
                  <a className='b-folio__link' href='/showcase/seized/'>
                    <span className='b-folio__label'>Seized</span>
                    <LazyImage
                      className='b-folio__image'
                      src='/assets/img/portfolio/seized.jpg'
                      alt='Seized'
                    />
                  </a>
                </li>
                <li
                  className='b-folio__item'
                  style={{backgroundColor: '#47b247'}}
                >
                  <a
                    className='b-folio__link'
                    href='/showcase/digital-legibility/'
                  >
                    <span className='b-folio__label'>Digital Legibility</span>
                    <LazyImage
                      className='b-folio__image'
                      src='/assets/img/portfolio/digital.jpg'
                      alt='Digital Legibility'
                    />
                  </a>
                </li>
                <li
                  className='b-folio__item'
                  style={{backgroundColor: '#3c3c3c'}}
                >
                  <a
                    className='b-folio__link'
                    href='/showcase/tamed-aggression/'
                  >
                    <span className='b-folio__label'>Tamed Aggression</span>
                    <LazyImage
                      className='b-folio__image'
                      src='/assets/img/portfolio/tamed.jpg'
                      alt='Tamed Aggression'
                    />
                  </a>
                </li>
              </ul>
            </div>
            <hr id='more' />
            <h2>Older Website Projects</h2>
            <p>
              Web design and front-end development from previous agencies I’ve
              worked at.
            </p>
            <ul>
              <li>
                <a href='/2014/02/17/introducing-tales/'>
                  Tales WordPress theme
                </a>
              </li>
              <li>
                <a href='/2013/08/09/responsive-design-for-kings-transfer/'>
                  King’s Transfer
                </a>
              </li>
              <li>
                <a href='/2012/06/17/passenger-focus-responsive-web-design-case-study/'>
                  Passenger Focus
                </a>
              </li>
              <li>
                <a href='/2013/01/28/gloople-responsive-design-review/'>
                  Gloople
                </a>
              </li>
              <li>
                <a href='/showcase/atherton-cox/'>Atherton Cox</a>
              </li>
              <li>
                <a href='/showcase/brucar/'>Brucar</a>
              </li>
              <li>
                <a href='/showcase/eden-anglo-french/'>Eden Anglo French</a>
              </li>
              <li>
                <a href='/showcase/my-life-listed/'>MyLifeListed</a>
              </li>
              <li>
                <a href='/showcase/peerless-av-europe/'>Peerless AV Europe</a>
              </li>
              <li>
                <a href='/showcase/shane-global/'>Shane Global</a>
              </li>
            </ul>
          </div>
        </Post>
      </Block>
    </Block>
  );
};

Portfolio.defaultProps = {
  pageHeading: 'Portfolio'
};

export default Portfolio;
