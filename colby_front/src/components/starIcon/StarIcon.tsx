import * as React from 'react';
import './StarIcon.css';

export interface IStarData {
  color: string,
  scale: number,
  rotate: number,
  location: {
    x: number,
    y: number
  },
}

interface IStarIconProps {
  data: IStarData,
  opacity: number
}
function StarIcon(props: IStarIconProps): JSX.Element {
  return (
    <div className='star-icon-wrapper' style={{transform: 'translate(-50%, -50%) scale(' + props.data.scale + ') rotate(' + props.data.rotate + 'deg)', left: props.data.location.x + '%', top: 100 - props.data.location.y + '%', opacity: props.opacity}}>
      <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1">
        <defs>
          <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_2_blur">
          <feGaussianBlur stdDeviation="4" in="SourceGraphic"/>
          </filter>
        </defs>
        <g>
          <path fill={props.data.color} filter="url(#svg_2_blur)" id="svg_2" clipRule="evenodd" fillRule="evenodd" d="m40.65162,78.44l-1.30324,0c0,-10.10426 -3.97555,-18.93846 -11.92006,-26.49007c-7.94451,-7.55161 -17.23176,-11.33054 -27.86832,-11.33054l0,-1.23879c10.63656,0 19.92381,-3.77893 27.86832,-11.34931c7.94451,-7.57038 11.92006,-16.39831 11.92006,-26.4713l1.30324,0c0,10.10426 3.97555,18.93846 11.92006,26.49007c7.94451,7.55161 17.23176,11.33054 27.86832,11.33054l0,1.23879c-10.62998,0 -19.92381,3.77893 -27.86832,11.33054c-7.94451,7.55161 -11.92006,16.37954 -11.92006,26.49007l0,0z" className="st0"/>
        </g>
      </svg>
    </div>
  );
}

export default StarIcon;