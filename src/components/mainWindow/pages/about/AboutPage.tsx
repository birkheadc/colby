import * as React from 'react';
import './AboutPage.css'
import AboutSection from './aboutSection/AboutSection';
import image01 from '../../../../assets/images/me/me02.png';

interface IAboutSectionData {
  image: JSX.Element,
  text: string[]
}

const SECTIONS: IAboutSectionData[] = [
  {
    image: <img src={image01}></img>,
    text: [
      "That's me, Colby Birkhead. Or at least, it was me almost 10 years ago. I really need to find some more recent photos. Also something with a few more pixels.",
      "Anyway, thanks for visiting my site. I hope you enjoy your stay. Use the hamburger icon up above to open the nav, or continue scrolling to learn who I am and what I do."
    ]
  },
  {
    image: <img src={image01}></img>,
    text: [
      "That's me, Colby Birkhead. Or at least, it was me almost 10 years ago. I really need to find some more recent photos. Also something with a few more pixels.",
      "Anyway, thanks for visiting my site. I hope you enjoy your stay. Use the hamburger icon up above to open the nav, or continue scrolling to learn who I am and what I do."
    ]
  },
  {
    image: <img src={image01}></img>,
    text: [
      "That's me, Colby Birkhead. Or at least, it was me almost 10 years ago. I really need to find some more recent photos. Also something with a few more pixels.",
      "Anyway, thanks for visiting my site. I hope you enjoy your stay. Use the hamburger icon up above to open the nav, or continue scrolling to learn who I am and what I do."
    ]
  },
  {
    image: <img src={image01}></img>,
    text: [
      "That's me, Colby Birkhead. Or at least, it was me almost 10 years ago. I really need to find some more recent photos. Also something with a few more pixels.",
      "Anyway, thanks for visiting my site. I hope you enjoy your stay. Use the hamburger icon up above to open the nav, or continue scrolling to learn who I am and what I do."
    ]
  },
  {
    image: <img src={image01}></img>,
    text: [
      "That's me, Colby Birkhead. Or at least, it was me almost 10 years ago. I really need to find some more recent photos. Also something with a few more pixels.",
      "Anyway, thanks for visiting my site. I hope you enjoy your stay. Use the hamburger icon up above to open the nav, or continue scrolling to learn who I am and what I do."
    ]
  },
]

interface IAboutSectionData {
  image: JSX.Element,
  text: string[]
}

interface IAboutPageProps {

}

function AboutPage(props: IAboutPageProps) {

  const [scroll, setScroll] = React.useState<number>(0);
  const [current, setCurrent] = React.useState<number>(0);

  function calculateCurrent(): void {
    const wrapper: Element | null = document.querySelector('#about-wrapper');
    if (wrapper == null) return;
    //setCurrent(0);
  }

  React.useEffect(() => {
    console.log(current);
  }, [current]);

  React.useEffect(() => {
    calculateCurrent();
    // const wrapper: Element | null = document.querySelector('#about-wrapper');
    // if (wrapper == null) return;
    // setCurrent(Math.floor(scroll / (wrapper.clientHeight / SECTIONS.length)));
  }, [scroll]);

  React.useEffect(() => {
    window.addEventListener('scroll', () => setScroll(window.scrollY));
    return () => window.removeEventListener('scroll', () => setScroll(window.scrollY));
  }, []);

  return (
    <div className='main-content-wrapper'>
      <div className='about-wrapper' id='about-wrapper'>
        <h1>About Me</h1>
        {SECTIONS.map(
          (section, index) =>
          <AboutSection key={'about-section_' + index} image={section.image} imageGoesLeft={index % 2 === 0 ? true : false} isActive={index === current} text={section.text}/>
        )}
      </div>
    </div>
  );
}

export default AboutPage;