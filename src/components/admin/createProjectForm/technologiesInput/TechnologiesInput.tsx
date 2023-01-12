import * as React from 'react';
import './TechnologiesInput.css'

interface ITechnologiesInputProps {
  technologies: string[],
  handleUpdate: (technologies: string[]) => void
}

function TechnologiesInput(props: ITechnologiesInputProps): JSX.Element {

  const addTechnology = () => {
    const technology: string | null = prompt('Technology: ');
    if (technology == null) return;
    if (doesTechnologyAlreadyExist(technology) === true) {
      alert('That technology is already listed!');
      return;
    }
    props.handleUpdate([...props.technologies, technology]);
  }

  function doesTechnologyAlreadyExist(technology: string): boolean {
    for (let i = 0; i < props.technologies.length; i++) {
      if (props.technologies[i] === technology) return true;
    }
    return false;
  }

  const removeTechnology = (event: React.MouseEvent<HTMLButtonElement>) => {
    const technology: string | null = event.currentTarget.getAttribute('data-technology');
    if (technology == null) return;
    const newTechnologies = props.technologies.filter(
      t => t !== technology
    );
    props.handleUpdate(newTechnologies);
  }
  
  return (
    <div>
      {props.technologies.map(
        technology =>
        <button key={technology} data-technology={technology} onClick={removeTechnology} type='button'>{technology}</button>
      )}
      <button onClick={addTechnology} type='button'>+</button>
    </div>
  );
}

export default TechnologiesInput;