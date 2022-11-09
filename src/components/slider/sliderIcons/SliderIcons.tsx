import * as React from 'react';
import './SliderIcons.css'

interface ISliderIconsProps {
  length: number,
  current: number,
  handleSelect(index: number): void
}

function SliderIcons(props: ISliderIconsProps): JSX.Element {

  function generateIcons(): JSX.Element[] {
    let icons: JSX.Element[] = [];

    for (let i = 0; i < props.length; i++) {
      icons.push(
        <div onClick={() => props.handleSelect(i)} key={'slider-icon_' + i} className={props.current === i ? 'slider-icon slider-icon-active' : 'slider-icon'}></div>
      );
    }

    return icons;
  }

  return (
    <div className='slider-icons-wrapper'>
      {generateIcons()}
    </div>
  );
}

export default SliderIcons;