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

  const [startSelection, setStartSelection] = React.useState<number>(0);
  const [current, setCurrent] = React.useState<number>(0);
  const [isAuto, setAuto] = React.useState<boolean>(true);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timer>();
  const [isDragging, setDragging] = React.useState<boolean>(false);
  const [dragX, setDragX] = React.useState<number>(0);
  let startX: number = 0;
  
  const SNAP_DISTANCE: number = (((document.querySelector('#slider-wrapper-inner')?.clientWidth ?? 0) / props.children.length) / 2) * 0.5;

  const [outerSpring, outerSpringApi] = useSpring(() => ({
    from: { transform: 'translate(0%, 0%)'}
  }));

  const [innerSpring, innerSpringApi] = useSpring(() => ({
    from: { transform: 'translate(0px, 0px)'}
  }));

  function goTo(index: number): void {
    if (index < 0) {
      return;
    }
    if (index >= props.children.length) {
      return;
    }
    setCurrent(index);
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
      }, props.interval);
      setIntervalId(interval);
      return () => clearInterval(interval);
    }
  }, [isAuto]);

  React.useEffect(() => {
    if (isDragging === false) {
      outerSpringApi.start({
        to: { transform: 'translate(' + (100 / props.children.length) * current * -1 + '%, 0%)' }
      });
    }
  }, [current, isDragging, dragX]);

  React.useEffect(() => {
    innerSpringApi.start({
      to: { transform: 'translate(' + dragX + 'px, 0px)' }
    });
    if (dragX < (SNAP_DISTANCE * -1)) {
      goTo(startSelection + 1);
      return;
    }
    else if (dragX > SNAP_DISTANCE) {
      goTo(startSelection - 1);
      return;
    }
    if (isDragging === true) {
      goTo(startSelection);
    }
  }, [dragX]);

  const handleSelect = (index: number): void => {
    setAuto(false);
    goTo(index);
  }

  const handleBeginDrag = (e: React.MouseEvent): void => {
    window.addEventListener('pointermove', handleDrag);
    window.addEventListener('pointerup', handleStopDrag);
    startX = e.clientX;
    setStartSelection(current);
    setDragging(true);
  }

  const handleDrag = (e: MouseEvent): void => {
    clearInterval(intervalId);
    setAuto(false);
    setDragX(Math.max(Math.min(e.clientX - startX, SNAP_DISTANCE * 2), SNAP_DISTANCE * -2));
  }

  const handleStopDrag = (): void => {
    setDragging(false);
    window.removeEventListener('pointermove', handleDrag);
    setDragX(0);
    // todo Snap to nearest selection
  }

  if (props.children.length < 1) {
    return <></>;
  }

  return (
    <div className='slider-wrapper'>
      <animated.div className='slider-wrapper-inner' id='slider-wrapper-inner' style={outerSpring}>
        <animated.div className='slider-inner' onPointerDown={handleBeginDrag} style={innerSpring}>
          {props.children}
        </animated.div>
      </animated.div>
      <SliderIcons handleSelect={handleSelect} length={props.children.length} current={current}/>
      <SliderStatusIcon isAuto={isAuto} toggleLock={() => setAuto(a => !a)} />
    </div>
  );
}

export default Slider;