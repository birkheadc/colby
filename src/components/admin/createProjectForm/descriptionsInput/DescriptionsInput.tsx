import * as React from 'react';
import { IDescription } from '../../../../api/AppData';
import './DescriptionsInput.css'

interface IDescriptionsInputProps {
  descriptionType: string,
  handleUpdate: (descriptions: IDescription[]) => void,
  descriptions: IDescription[]
}

function DescriptionsInput(props: IDescriptionsInputProps): JSX.Element {

  const addDescription = () => {
    const language = prompt('Language:');
    if (language == null) return;
    const newDescription: IDescription = {
      language: language,
      content: ''
    };
    props.handleUpdate([...props.descriptions, newDescription]);
  }

  function generateIdForLanguage(language: string): string {
    return 'create-project-form-description' + props.descriptionType + '-' + language;
  }

  const updateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    const language: string | null = event.target.getAttribute('data-language');
    if (language == null) {
      console.log('DATA-LANGUAGE is NULL');
      return;
    }
    const newDescriptions = props.descriptions.map(
      (description => (description.language !== language) ? description : {...description, content: event.target.value})
    );
    props.handleUpdate(newDescriptions);
  }

  return (
    <div>
      {props.descriptions.map(
        description =>
        <div key={description.language}>
          <label htmlFor={generateIdForLanguage(description.language)}>{description.language}</label>
          <input data-language={description.language} id={generateIdForLanguage(description.language)} name={props.descriptionType + '-' + description.language} onChange={updateDescription} value={description.content}></input>
        </div>
      )}
      <button onClick={addDescription} type='button'>+</button>
    </div>
  );
}

export default DescriptionsInput;