import * as React from 'react';
import './UnderConstruction.css'

interface IUnderConstructionProps {

}

function UnderConstruction(props: IUnderConstructionProps): JSX.Element {
  return (
    <div>
      <h1>Under Construction</h1>
      <p>Sorry, this page isn't ready yet!</p>
    </div>
  );
}

export default UnderConstruction;