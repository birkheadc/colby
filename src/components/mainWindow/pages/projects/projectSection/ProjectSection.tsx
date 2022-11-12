import { colors } from '@react-spring/shared';
import * as React from 'react';
import { IProject } from '../../../../../api/AppData';
import Helpers from '../../../../../helpers';
import './ProjectSection.css';
import ProjectTechnologies from './projectTechnologies/ProjectTechnologies';

interface IProjectSectionProps {
  project: IProject
}
function ProjectSection(props: IProjectSectionProps): JSX.Element {

  const project: IProject = props.project;
  const color: number = Helpers.convertStringToNumber(project.name, 0, 360);
  const colorString: string = 'hsl(' + color + 'deg 95% 90%)';

  return (
    <div className='project-section-wrapper' style={{ "--project-color": colorString } as React.CSSProperties}>
      
      <div className='project-section-header'>
        <h2 draggable='false'>{project.name}</h2>
        <div className='project-section-header-links'>
          <a draggable='false' href={project.site} target='_blank' rel='noreferrer'>Site</a>
          <a draggable='false' href={project.source} target='_blank' rel='noreferrer'>Source</a>
        </div>
      </div>
      <p draggable='false' className='project-section-short-description'>{project.shortDescriptions[0].content}</p>
      <div className='project-description-wrapper'>
        <ProjectTechnologies projectId={props.project.id} technologies={props.project.technologies}/>
        <div className='project-section-long-description-wrapper'>
          <p draggable='false' className='project-section-long-description'>{project.longDescriptions[0].content}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectSection;