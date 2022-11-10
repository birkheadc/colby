import * as React from 'react';
import './Slider.css';
import { animated, useSpring, config } from 'react-spring';
import SliderIcons from './sliderIcons/SliderIcons';
import SliderStatusIcon from './sliderStatusIcon/SliderStatusIcon';

interface ISliderProps {
  children: React.ReactElement[],
  interval: number
}

function Slider(props: ISliderProps): JSX.Element {

  const [current, setCurrent] = React.useState<number>(0);
  const [isAuto, setAuto] = React.useState<boolean>(true);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timer>();
  const [isDragging, setDragging] = React.useState<boolean>(false);
  const [dragX, setDragX] = React.useState<number>(0);
  let startX: number = 0;
  
  const selectionWidth: number = (document.querySelector('#slider-wrapper-inner')?.clientWidth ?? 0) / props.children.length;

  const [spring, springApi] = useSpring(() => ({
    from: { transform: 'translate(0px, 0px)'}
  }));



  function goTo(index: number): void {
    console.log("Going to: ", index);
  }

  function goNext(): void {
    setCurrent(c => c + 1 >= props.children.length ? 0 : c + 1);
  }

  React.useEffect(() => {
    if (isAuto === false) {
      clearInterval(intervalId);
    }
    else {
      const interval = setInterval(() => {
        goNext();
      }, 2000);
      setIntervalId(interval);
      return () => clearInterval(interval);
    }
  }, [isAuto]);

  React.useEffect(() => {
    springApi.start({
      to: { transform: 'translate(' + current * selectionWidth * -1 + 'px, 0px)' }
    });
  }, [current]);

  const handleSelect = (index: number): void => {
    setAuto(false);
    goTo(index);
  }

  const handleBeginDrag = (e: React.MouseEvent): void => {
    window.addEventListener('pointermove', handleDrag);
    window.addEventListener('pointerup', handleStopDrag);
    startX = e.clientX;
    setDragging(true);
  }

  const handleDrag = (e: MouseEvent): void => {
    clearInterval(intervalId);
    setAuto(false);
    setDragX(e.clientX - startX);
  }

  const handleStopDrag = (): void => {
    setDragging(false);
    window.removeEventListener('pointermove', handleDrag);
    // todo Snap to nearest selection
  }

  if (props.children.length < 1) {
    return <></>;
  }

  return (
    <div className='slider-wrapper'>
      <animated.div className='slider-wrapper-inner' id='slider-wrapper-inner' style={spring}>
        <animated.div className='slider-inner' onPointerDown={handleBeginDrag} style={ {transform: 'translate(' + dragX + 'px, 0px)' } }>
          {props.children}
        </animated.div>
      </animated.div>
      <SliderIcons handleSelect={handleSelect} length={props.children.length} current={current}/>
      <SliderStatusIcon isAuto={isAuto} toggleLock={() => setAuto(a => !a)} />
    </div>
  );
}

export default Slider;