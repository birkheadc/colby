import * as React from 'react';
import './AboutPage.css'
import AboutSection from './aboutSection/AboutSection';
import ABOUT_CONTENT, { IAboutSectionData } from './aboutSection/aboutContent/AboutPageContent';
import ContactWidget from '../../../contact/ContactWidget';

interface IAboutPageProps {

}

function AboutPage(props: IAboutPageProps) {

  const SECTIONS: IAboutSectionData[] = ABOUT_CONTENT.SHORT_CONTENT;

  const [current, setCurrent] = React.useState<number>(-1);

  function calculateCurrentByScroll(scroll: number): void {
    const wrapper: Element | null = document.querySelector('#about-wrapper');
    if (wrapper == null) return;
    const max = wrapper.clientHeight - window.innerHeight;
    const increment =  max / ((SECTIONS.length - 1) * 3);
    let section = Math.floor(window.scrollY / increment);
    if (((section - 1) % 3) === 0) {
      setCurrent(-1);
      return;
    }
    setCurrent(Math.ceil(section / 3));
  }

  React.useEffect(() => {
    window.addEventListener('scroll', () => calculateCurrentByScroll(window.scrollY));
    const timer = setTimeout(() => {
      calculateCurrentByScroll(window.scrollY);
    }, 500)
    return () => {
      window.removeEventListener('scroll', () => calculateCurrentByScroll(window.scrollY));
      clearTimeout(timer);
    }
  }, []);

  return (
    <div className='main-content-wrapper'>
      <div className='about-wrapper' id='about-wrapper'>
        <h1>About Me</h1>
        <div>
          {SECTIONS.map(
            (section, index) =>
            <AboutSection key={'about-section_' + index} image={section.image} imageGoesLeft={index % 2 === 0 ? true : false} isActive={index === current} text={section.text}/>
          )}
        </div>
      </div>
      <div className='about-contacts-wrapper'>
          <ContactWidget />
        </div>
    </div>
  );
}

export default AboutPage;