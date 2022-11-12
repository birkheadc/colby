import * as React from 'react';
import './ProjectTechnologies.css'

interface IProjectTechnologiesProps {
  technologies: string[],
  projectId: string
}

function ProjectTechnologies(props: IProjectTechnologiesProps): JSX.Element {

  const joined = props.technologies.join(' ');
  const WORD_SPACING = 40;

  return (
    <div className='project-technologies-wrapper'>
      {props.technologies.map(
        (tech, i) =>  
        <svg key={'svg_' + props.projectId + '_' + i} viewBox='0 0 500 500'>
          <path id={'curve_' + props.projectId + '_' + i} fill='transparent' d='M25,250A225,225 0 1 1475,250A225,225 0 1 125,250M250,250' />
          <text className='project-technologies-text' width='500'>
            <textPath startOffset={(i * (100 / props.technologies.length)) + '%'} xlinkHref={'#curve_' + props.projectId + '_' + i}>
                {tech}
            </textPath>
          </text>
        </svg>
      )}
    </div>
  );
}

export default ProjectTechnologies;