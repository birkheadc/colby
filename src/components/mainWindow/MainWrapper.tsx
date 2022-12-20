import * as React from 'react';
import Footer from '../footer/Footer';

interface IMainWrapperProps {
  contents: JSX.Element
}

function MainWrapper(props: IMainWrapperProps): JSX.Element {
  return (
    <div className='main-content-wrapper'>
      {props.contents}
      <Footer />
    </div>
  );
}

export default MainWrapper;