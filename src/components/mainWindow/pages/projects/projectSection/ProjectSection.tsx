import * as React from 'react';
import { IProject } from '../../../../../api/AppData';
import './ProjectSection.css';

interface IProjectSectionProps {
  project: IProject
}
function ProjectSection(props: IProjectSectionProps): JSX.Element {

  const project: IProject = props.project;

  return (
    <div className='project-section-wrapper'>
      <div>
        <h2 draggable='false'>{project.name}</h2>
        <div>
          <a draggable='false' href={project.site} target='_blank' rel='noreferrer'>Site</a>
          <a draggable='false' href={project.source} target='_blank' rel='noreferrer'>Source</a>
        </div>
      </div>
      <p draggable='false' className='project-section-short-description'>{project.shortDescriptions[0].content}</p>
      <ul>
      {project.technologies.map(
        tech =>
        <li draggable='false' key={tech}>{tech}</li>
      )}
      </ul>
      <p draggable='false' className='project-section-long-description'>{project.longDescriptions[0].content}</p>
    </div>
  );
}

export default ProjectSection;