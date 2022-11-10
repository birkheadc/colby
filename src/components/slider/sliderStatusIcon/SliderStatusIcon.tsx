import * as React from 'react';
import './SliderStatusIcon.css';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';


interface ISliderStatusIconProps {
  isAuto: boolean,
  toggleLock(): void
}
function SliderStatusIcon(props: ISliderStatusIconProps): JSX.Element {

  return (
    <button className='slider-status-icon-wrapper' onClick={props.toggleLock}>
      {props.isAuto ? <LockOpenIcon /> : <LockClosedIcon />}
    </button>
  );
}

export default SliderStatusIcon;