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
        <h2>{project.name}</h2>
        <div>
          <a href={project.site}>Site</a>
          <a href={project.source}>Source</a>
        </div>
      </div>
      <p>{project.shortDescriptions[0].content}</p>
      <ul>
      {project.technologies.map(
        tech =>
        <li key={tech}>{tech}</li>
      )}
      </ul>
      <p className='project-section-long-description'>{project.longDescriptions[0].content}</p>
    </div>
  );
}

export default ProjectSection;