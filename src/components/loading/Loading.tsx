import * as React from 'react';
import './Loading.css';

interface ILoadingProps {

}
function Loading(props: ILoadingProps): JSX.Element {
  return (
    <div className='loading-wrapper'>
      <div className='loading-spinner'>

      </div>
      <h1>Loading</h1>
    </div>
  );
}

export default Loading;