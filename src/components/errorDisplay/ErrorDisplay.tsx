import { FaceFrownIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import './ErrorDisplay.css';

interface IErrorDisplayProps {
  message: string
}
function ErrorDisplay(props: IErrorDisplayProps): JSX.Element {
  return (
    <div className='error-display-wrapper'>
      <h1>Sorry!</h1>
      <FaceFrownIcon className='error-display-icon'/>
      <p>{props.message}</p>
    </div>
  );
}

export default ErrorDisplay;