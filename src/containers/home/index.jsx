import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import {renderFooter} from '../../components/footer';
import {renderNav} from '../../components/nav';
import {Button, Block, Sector} from '../../components';

class Home extends Component {
  render() {
    const props = this.props;
    const star = id => {
      return {__html: `<use xlink:href="/assets/img/stars.svg#${id}"></use>`};
    };
    return (
      <main className="c-main home">
        <header className="home-hero">
          <Block>
            <div className="home-hero__logo">
              <h1>David Bushell &#8211; Web Design &amp; Front-end Development (based in Manchester, UK)</h1>
              <img src="/assets/img/david-bushell.svg" alt="David Bushell"/>
            </div>
            <div className="home-hero__burst"/>
            <div className="home-hero__crane"/>
            <svg className="home-star" role="presentation" dangerouslySetInnerHTML={star('star')}/>
            <svg className="home-star" role="presentation" dangerouslySetInnerHTML={star('burst')}/>
            <svg className="home-star" role="presentation" dangerouslySetInnerHTML={star('star')}/>
          </Block>
          <div className="home-hero__bg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg">
                <path className="st0" d="M3000 600H0V0z"/>
                <path className="st1" d="M-4.5 2.5l3005 601"/>
                <path className="st2" d="M-4.5 9.5l3005 601"/>
              </svg>
            </div>
          </div>
        </header>
        <Block>
          <div className="home-services">
            <article className="home-services__item">
              <h2 className="h4"><a href="/responsive-design/">Responsive Web Design</a></h2>
              <p>I design websites that work across all devices. They’re fluid and adaptive, just like my process.</p>
              <Button href="/contact/" text="Available for Hire"/>
            </article>
            <hr/>
            <article className="home-services__item">
              <h2 className="h4"><a href="/front-end-development/">Front-end Development</a></h2>
              <p>HTML, CSS, &amp; JavaScript - there’s web standards and then there’s browsers, and I know both.</p>
            </article>
            <hr/>
            <article className="home-services__item">
              <h2 className="h4"><a href="/services/">And a whole lot more&hellip;</a></h2>
              <p>Whether it’s WordPress, eCommerce, or simply advice, I have a depth of experience to help you.</p>
            </article>
          </div>
        </Block>
        <Block>
          <div className="c-sectors">
            <div className="c-sectors__item">
              <Sector {...props.sector[0]}/>
            </div>
            <div className="c-sectors__item">
              <Sector {...props.sector[1]}/>
            </div>
          </div>
        </Block>
        <Block>
          <div className="c-folio">
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
          </div>
        </Block>
        <div className="c-clients u-dark">
          <Block>
            <div className="c-clients__header">
              <h2>What my clients say:</h2>
            </div>
            <blockquote>
              <p className="p--large p--quote">Highly skilled, personable, helpful and dedicated: David exceeded my expectations to deliver for us on a key project.</p>
              <p className="p--small"><cite>Frank Fenton &ndash; Head of Digital &ndash; Dinosaur UK Ltd.</cite></p>
            </blockquote>
            <blockquote>
              <p className="p--large p--quote">David honestly was the integral component that allowed us to finally launch. We continue to go to him for any development work for our site, because he goes above &amp; beyond what you’d ever expect.</p>
              <p className="p--small"><cite>Alexandra Adina &ndash; SwingVoterz.com</cite></p>
            </blockquote>
            <blockquote>
              <p className="p--large p--quote">David provided us with beautiful and cost effective templates for our CMS that surpassed our high expectations from both the design and the tech perspective.</p>
              <p className="p--small"><cite>Kevin Mueller &ndash; Studio Manager &ndash; <a href="/2014/05/07/responsive-design-for-uwe-wittwer/">Uwe Wittwer</a></cite></p>
            </blockquote>
            <div className="c-clients__footer">
              <Button href="/contact/" text="Work with me" bg1/>
            </div>
          </Block>
        </div>
      </main>
    );
  }

  static renderBody(el) {
    return `
${ReactDOMServer.renderToStaticMarkup(el)}
${renderFooter()}
${renderNav()}
`;
  }
}

Home.defaultProps = require('./defaults');

export default Home;
