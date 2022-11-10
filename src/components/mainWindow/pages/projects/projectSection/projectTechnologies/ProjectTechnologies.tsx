import * as React from 'react';
import './ProjectTechnologies.css'

interface IProjectTechnologiesProps {
  technologies: string[]
}

function ProjectTechnologies(props: IProjectTechnologiesProps): JSX.Element {

  const joined = props.technologies.join(' ');
  const WORD_SPACING = 40;

  return (
    <div className='project-technologies-wrapper'>
      <svg viewBox='0 0 500 500'>
        <path id='curve' fill='transparent' d='M25,250A225,225 0 1 1475,250A225,225 0 1 125,250M250,250' />
        <text className='project-technologies-text' style={{wordSpacing: WORD_SPACING}} width='500'>
          <textPath xlinkHref='#curve'>
            {joined}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export default ProjectTechnologies;