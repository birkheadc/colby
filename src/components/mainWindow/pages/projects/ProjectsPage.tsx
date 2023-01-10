import * as React from 'react';
import { IProject } from '../../../../api/AppData';
import Loading from '../../../loading/Loading';
import Slider from '../../../slider/Slider';
import ProjectSection from './projectSection/ProjectSection';
import './ProjectsPage.css'

interface IProjectsPageProps {
  projects: IProject[] | undefined
}

function ProjectsPage(props: IProjectsPageProps) {

  if (props.projects == null) return <Loading />;

  function getProjectSections(): JSX.Element | null {
    if (props.projects == null || props.projects.length < 1) return null;
    return (
      <Slider interval={5000}>
        {props.projects.map(
          project =>
          <ProjectSection key={project.id} project={project}/>
        )}
      </Slider>
    );
  }
  
  return (
    <div className='projects-wrapper'>
      <h1>Projects</h1>
      <a href='https://github.com/birkheadc?tab=repositories' target='_blank' rel='noreferrer'>Visit My Github</a>
        {getProjectSections()}
    </div>
  );
}

export default ProjectsPage;