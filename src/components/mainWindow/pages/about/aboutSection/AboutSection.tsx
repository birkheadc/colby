import * as React from 'react';
import './AboutSection.css';

interface IAboutSectionProps {
  text: string[],
  image: JSX.Element,
  isActive: boolean,
  imageGoesLeft: boolean
}
function AboutSection(props: IAboutSectionProps): JSX.Element {
  return (
    <section className={props.isActive ? 'about-section about-section-active' : 'about-section about-section-inactive'}>
      <div className={props.imageGoesLeft ? 'about-image-wrapper about-goes-left' : 'about-image-wrapper about-goes-right'}>
        {props.image}
      </div>
      <div className={props.imageGoesLeft ? 'about-text-wrapper about-goes-right' : 'about-text-wrapper about-goes-left'}>
        <div>
          {props.text.map(
            (t, index) =>
            <p key={index}>{t}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;