import * as React from 'react';
import './Slider.css';
import { animated, useSpring, config } from 'react-spring';

interface ISliderProps {
  children: React.ReactElement[],
  interval: number
}

function Slider(props: ISliderProps): JSX.Element {

  const [prev, setPrev] = React.useState<number>(props.children.length - 1);
  const [current, setCurrent] = React.useState<number>(0);
  const [auto, setAuto] = React.useState<boolean>(true);
  
  const [spring, springApi] = useSpring(() => ({
    from: { transform: 'translate(-50%, 0%)' }
  }));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPrev(p => p + 1 >= props.children.length ? 0 : p + 1);
      setCurrent(c => c + 1 >= props.children.length ? 0 : c + 1);
      springApi.start({
        from: { transform: 'translate(0%, 0%)' },
        to: { transform: 'translate(-50%, 0%)' },
        config: config.slow,
      })
      
    }, props.interval)
  }, [])

  if (props.children.length < 1) {
    return <></>;
  }

  return (
    <div className='slider-wrapper'>
      <animated.div className='slider-wrapper-inner' style={spring}>
        <div>{props.children[prev]}</div>
        <div>{props.children[current]}</div>
      </animated.div>
    </div>
  );
}

export default Slider;