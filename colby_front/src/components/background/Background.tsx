import * as React from 'react';
import './Background.css';
import StarIcon from '../starIcon/StarIcon';

function Background() {
  return (
    <div id='background'>
      <StarIcon color='white' scale={0.5} rotate={0}/>
    </div>
  );
}

export default Background;