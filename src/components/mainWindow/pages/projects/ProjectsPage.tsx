import * as React from 'react';
import { IProject } from '../../../../api/AppData';
import Loading from '../../../loading/Loading';
import Slider from '../../../slider/Slider';
import ProjectSelection from './projectSection/ProjectSection';
import './ProjectsPage.css'

interface IProjectsPageProps {
  projects: IProject[] | undefined
}

function ProjectsPage(props: IProjectsPageProps) {

  if (props.projects == null) return <Loading />;
  
  return (
    <div className='main-content-wrapper'>
      <div className='projects-wrapper'>
        <h1>Projects</h1>
        <a href='https://github.com/birkheadc?tab=repositories' target='_blank' rel='noreferrer'>Visit My Github</a>
        <Slider interval={5000}>
          {props.projects.map(
            project =>
            <ProjectSelection key={project.id} project={project}/>
          )}
        </Slider>
      </div>
    </div>
  );
}

export default ProjectsPage;