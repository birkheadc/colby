import * as React from 'react';
import { IDescription, IProject } from '../../../api/AppData';
import IApiResult from '../../../api/IApiResponse';
import ProjectsApi, { INewProject } from '../../../api/ProjectsApi';
import FormMessage from '../formMessage/FormMessage';
import './CreateProjectForm.css'
import DescriptionsInput from './descriptionsInput/DescriptionsInput';
import TechnologiesInput from './technologiesInput/TechnologiesInput';

interface ICreateProjectFormProps {
  setWorking: (isWorking: boolean) => void
}

function CreateProjectForm(props: ICreateProjectFormProps): JSX.Element {

  const [project, setProject] = React.useState<INewProject>(
    {
      name: '',
      shortDescriptions: [],
      longDescriptions: [],
      technologies: [],
      site: '',
      source: '',
      favoriteLevel: 0
    }
  );
  const [message, setMessage] = React.useState<IApiResult>({ message: '', errorCode: -1 });

  const updateProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProject(values => ({...values, [event.target.name]: event.target.value}));
  }

  const updateShortDescriptions = (descriptions: IDescription[]) => {
    setProject(values => ({...values, shortDescriptions: descriptions}));
  }

  const updateLongDescriptions = (descriptions: IDescription[]) => {
    setProject(values => ({...values, longDescriptions: descriptions}));
  }

  const updateTechnologies = (technologies: string[]) => {
    setProject(values => ({...values, technologies: technologies}));
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    async function submitProject(project: INewProject) {
      props.setWorking(true);
      const result = await ProjectsApi.submitProject(project);
      setMessage(result);
      props.setWorking(false);
    }
    event.preventDefault();
    submitProject(project);
  }

  return (
    <form onSubmit={submit}>
      <h2>Create New Project</h2>
      <FormMessage result={message}/>
      <div>
        <label htmlFor='create-project-form-name'>Project Name</label>
        <input id='create-project-form-name' name='name' onChange={updateProject} value={project.name}></input>
      </div>
      <div>
        <label>Short Description</label>
        <DescriptionsInput descriptionType='short' handleUpdate={updateShortDescriptions} descriptions={project.shortDescriptions} />
      </div>
      <div>
        <label>Long Description</label>
        <DescriptionsInput descriptionType='long' handleUpdate={updateLongDescriptions} descriptions={project.longDescriptions} />
      </div>
      <div>
        <label>Technologies</label>
        <TechnologiesInput technologies={project.technologies} handleUpdate={updateTechnologies}/>
      </div>
      <div>
        <label htmlFor='create-project-form-site'>Site</label>
        <input id='create-project-form-site' name='site' onChange={updateProject} value={project.site}></input>
      </div>
      <div>
        <label htmlFor='create-project-form-source'>Source</label>
        <input id='create-project-form-source' name='source' onChange={updateProject} value={project.source}></input>
      </div>
      <div>
        <label htmlFor='create-project-form-favorite-level'>Favorite Level</label>
        <input id='create-project-form-favorite-level' name='favoriteLevel' onChange={updateProject} step='1' type='number' value={project.favoriteLevel}></input>
      </div>
      <div>
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
}

export default CreateProjectForm;