import * as React from 'react';
import { IProject } from '../../../../../api/AppData';
import './ProjectSelection.css';

interface IProjectSelectionProps {
  project: IProject
}
function ProjectSelection(props: IProjectSelectionProps): JSX.Element {
  return (
    <section className='project-section-wrapper'>
      {props.project.name}
    </section>
  );
}

export default ProjectSelection;