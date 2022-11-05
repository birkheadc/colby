import * as React from 'react';
import './UnderConstruction.css'
import {FaceFrownIcon } from '@heroicons/react/24/outline'

interface IUnderConstructionProps {

}

function UnderConstruction(props: IUnderConstructionProps): JSX.Element {
  return (
    <div className='main-content-wrapper'>
      <div className='under-construction-wrapper'>
        <h1>Under Construction</h1>
        <FaceFrownIcon className='under-construction-icon'/>
        <p>Sorry, this page isn't ready yet!</p>
      </div>
    </div>
  );
}

export default UnderConstruction;