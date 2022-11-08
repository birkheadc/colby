import * as React from 'react';
import { IProject } from '../../../../api/AppData';
import ProjectSelection from './projectSection/ProjectSelection';
import './ProjectsPage.css'

interface IProjectsPageProps {
  projects: IProject[] | undefined
}

function ProjectsPage(props: IProjectsPageProps) {

  function displayProjects(): React.ReactElement {
    if (props.projects == null) {
      return (
        <p>loading...</p>
      );
    }
    return (
      <>
      {props.projects.map(
        project =>
        <ProjectSelection key={project.id} project={project}/>
      )}
      </>
    );
  }

  return (
    <div className='main-content-wrapper'>
      <div className='projects-wrapper'>
        <h1>Projects</h1>
        {displayProjects()}
      </div>
    </div>
  );
}

export default ProjectsPage;