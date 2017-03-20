import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import {renderFooter} from '../../components/footer';
import {renderNav} from '../../components/nav';
import {Button, Block} from '../../components';

class Home extends Component {
  render() {
    const star = id => {
      return {__html: `<use xlink:href="/assets/img/stars.svg#${id}"></use>`};
    };
    return (
      <main className="main main--home home">
        <header className="home-hero">
          <div className="block">
            <div className="home-hero__logo">
              <h1>David Bushell &#8211; Web Design &amp; Front-end Development (based in Manchester, UK)</h1>
              <img src="/assets/img/david-bushell.svg" alt="David Bushell"/>
            </div>
            <div className="home-hero__burst"/>
            <div className="home-hero__crane"/>
            <svg className="home-star" role="presentation" dangerouslySetInnerHTML={star('star')}/>
            <svg className="home-star" role="presentation" dangerouslySetInnerHTML={star('burst')}/>
            <svg className="home-star" role="presentation" dangerouslySetInnerHTML={star('star')}/>
          </div>
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
          <div className="home-sectors">
            <article className="home-sectors__item home-businesses">
              <svg className="home-sectors__star" role="presentation" dangerouslySetInnerHTML={star('right')}/>
              <h2>For Businesses</h2>
              <p className="p--large">Have an idea?</p>
              <p>Let’s discuss your requirements, share ideas, and figure out what’s best for your new website together.</p>
              <Button href="/working-with-clients/" text="How I can help" bg2 shadow/>
            </article>
            <article className="home-sectors__item home-agencies">
              <svg className="home-sectors__star" role="presentation" dangerouslySetInnerHTML={star('left')}/>
              <h2>Web Agencies</h2>
              <p className="p--large">Need a hand?</p>
              <p>I’m reliable and flexible, priding myself in communication and initiative to ensure smooth delivery.</p>
              <Button href="/working-with-agencies/" text="What I can do" bg1 shadow/>
            </article>
          </div>
        </Block>
        <div className="home-folio">
          <Block>
            <h2><a href="/showcase/">Featured Projects</a></h2>
            <div className="folio">
              <ul className="folio__list">
                <li className="folio__item" style={{backgroundColor: '#b72817'}}>
                  <a className="folio__link" href="/2016/10/10/building-a-shopify-theme/">
                    <span className="folio__label">Shopify Theme</span>
                    <img className="folio__image" src="/assets/img/portfolio/stshopify.png" alt="Building a Shopify Theme"/>
                  </a>
                </li>
                <li className="folio__item" style={{backgroundColor: '#d8ac59'}}>
                  <a className="folio__link" href="/2015/03/18/responsive-design-for-houden/">
                    <span className="folio__label">Houden</span>
                    <img className="folio__image" src="/assets/img/portfolio/houden.png" alt="Houden"/>
                  </a>
                </li>
                <li className="folio__item" style={{backgroundColor: '#993300'}}>
                  <a className="folio__link" href="/2014/05/07/responsive-design-for-uwe-wittwer/">
                    <span className="folio__label">Uwe Wittwer</span>
                    <img className="folio__image" src="/assets/img/portfolio/uwewittwer.png" alt="Uwe Wittwer"/>
                  </a>
                </li>
              </ul>
            </div>
          </Block>
        </div>
        <div className="home-clients u-dark">
          <Block>
            <div className="prose">
              <h2>What my clients say:</h2>
              <blockquote className="home-clients__quote">
                <p className="p--large p--quote">Highly skilled, personable, helpful and dedicated: David exceeded my expectations to deliver for us on a key project.</p>
                <p className="p--small"><cite>Frank Fenton &ndash; Head of Digital &ndash; Dinosaur UK Ltd.</cite></p>
              </blockquote>
              <blockquote className="home-clients__quote">
                <p className="p--large p--quote">David honestly was the integral component that allowed us to finally launch. We continue to go to him for any development work for our site, because he goes above &amp; beyond what you’d ever expect.</p>
                <p className="p--small"><cite>Alexandra Adina &ndash; SwingVoterz.com</cite></p>
              </blockquote>
              <blockquote className="home-clients__quote">
                <p className="p--large p--quote">David provided us with beautiful and cost effective templates for our CMS that surpassed our high expectations from both the design and the tech perspective.</p>
                <p className="p--small"><cite>Kevin Mueller &ndash; Studio Manager &ndash; <a href="/2014/05/07/responsive-design-for-uwe-wittwer/">Uwe Wittwer</a></cite></p>
              </blockquote>
              <br/>
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

export default Home;
