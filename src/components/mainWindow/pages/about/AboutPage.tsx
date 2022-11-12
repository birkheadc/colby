import * as React from 'react';
import './AboutPage.css'

interface IAboutPageProps {

}

function AboutPage(props: IAboutPageProps) {
  return (
    <div className='main-content-wrapper'>
      <div className='about-wrapper'>
        <h1>About Me</h1>
      </div>
    </div>
  );
}

export default AboutPage;