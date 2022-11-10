import * as React from 'react';
import { IProject } from '../../../../../api/AppData';
import './ProjectSection.css';
import ProjectTechnologies from './projectTechnologies/ProjectTechnologies';

interface IProjectSectionProps {
  project: IProject
}
function ProjectSection(props: IProjectSectionProps): JSX.Element {

  const project: IProject = props.project;

  return (
    <div className='project-section-wrapper'>
      <div className='project-section-header'>
        <h2 draggable='false'>{project.name}</h2>
        <div className='project-section-header-links'>
          <a draggable='false' href={project.site} target='_blank' rel='noreferrer'>Site</a>
          <a draggable='false' href={project.source} target='_blank' rel='noreferrer'>Source</a>
        </div>
      </div>
      <p draggable='false' className='project-section-short-description'>{project.shortDescriptions[0].content}</p>
      <div className='project-description-wrapper'>
        <ProjectTechnologies technologies={props.project.technologies}/>
        <div className='project-section-long-description-wrapper'>
          <p draggable='false' className='project-section-long-description'>{project.longDescriptions[0].content}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectSection;