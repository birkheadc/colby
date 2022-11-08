import * as React from 'react';
import { IProject } from '../../../../api/AppData';
import Loading from '../../../loading/Loading';
import ProjectSelection from './projectSection/ProjectSelection';
import './ProjectsPage.css'

interface IProjectsPageProps {
  projects: IProject[] | undefined
}

function ProjectsPage(props: IProjectsPageProps) {

  if (props.projects == null) {
    return (
      <Loading />
    );
  }
  return (
    <div className='main-content-wrapper'>
      <div className='projects-wrapper'>
        <h1>Projects</h1>
        {props.projects.map(
          project =>
          <ProjectSelection key={project.id} project={project}/>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;