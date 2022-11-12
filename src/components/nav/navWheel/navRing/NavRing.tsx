import * as React from 'react';
import { animated, useSpring } from 'react-spring';
import { INavOption } from '../navOption/INavOption';
import NavIcons from './navIcon/NavIcons';
import './NavRing.css'

interface INavRingProps {
  options: INavOption[],
  select(selection: INavOption): void,
  selection: number
}

function NavRing(props: INavRingProps): JSX.Element {

  let startAngle = 0;
  const ROTATION_INCREMENT: number = 360 / props.options.length;

  let prevRotation: number = (props.selection * -1 + props.options.length) * ROTATION_INCREMENT;
  const [rotation, setRotation] = React.useState((props.selection * -1 + props.options.length) * ROTATION_INCREMENT);
  const [isRotating, setRotating] = React.useState(false);
  const [selection, setSelection] = React.useState(props.selection);

  const [ringSpring, ringSpringApi] = useSpring(() => ({
    from: {
      transform: 'rotate(' + rotation + 'deg)',
    }
  }));

  function animateRotation(degree: number): void {
    ringSpringApi.start({
      to: {
        transform: 'rotate(' + degree + 'deg)'
      },
      config: {
        mass: 0.5,
        tension: 600,
        friction: 50,
        clamp: true
      }
    });
  }

  function animateSnap(degree: number): void {
    ringSpringApi.start({
      to: {
        transform: 'rotate(' + degree + 'deg)'
      },
      config: {
        mass: 5,
        tension: 600,
        friction: 100,
        clamp: true
      }
    });
  }

  React.useEffect(() => {
    let newSelection = (Math.round(rotation / ROTATION_INCREMENT) * -1 + props.options.length) % props.options.length;
    if (newSelection < 0) {
      newSelection += props.options.length;
    }
    if (newSelection === props.options.length) {
      newSelection = 0;
    }
    if (newSelection !== selection) {
      setSelection(newSelection);
    }
    if (isRotating) {
      animateRotation(rotation);
    }
    else {
      animateSnap(rotation);
    }
  }, [rotation, isRotating])

  React.useEffect(() => {
    props.select(props.options[selection]);
  }, [selection]);

  React.useEffect(() => {
    if (isRotating === false) {
      const target = Math.round(rotation / ROTATION_INCREMENT) * ROTATION_INCREMENT;
      setRotation(target);
    }
  }, [isRotating]);

  function calculateAngleFromScreenCenterToCursor(clientX: number, clientY: number): number {
    const screenCenter = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
    const x = clientX - screenCenter.x;
    const y = (clientY - screenCenter.y) * -1;
    let angle = (Math.atan(y / x) * (180 / Math.PI) - 90) * -1;
    if (x < 0) {
      angle += 180;
    }
    return angle;
  }

  const handleBeginRotate = (e: React.MouseEvent): void => {
    prevRotation = rotation;
    const angle = calculateAngleFromScreenCenterToCursor(e.clientX, e.clientY);
    startAngle = angle - rotation;

    window.addEventListener('pointermove', handleRotate);
    window.addEventListener('pointerup', handleStopRotate);

    document.body.style.setProperty('overscroll-behavior', 'none');
  }

  const handleRotate = (e: PointerEvent): void => {
    e.stopPropagation();
    setRotating(true);
    const angle = calculateAngleFromScreenCenterToCursor(e.clientX, e.clientY);
    let target = angle - startAngle;
    while (Math.abs(target - prevRotation) > 180) {
      target = target > prevRotation ? target - 360 : target + 360;
    }
    prevRotation = target;
    setRotation(target);
  }

  const handleStopRotate = (): void => {
    window.removeEventListener('pointermove', handleRotate);
    window.removeEventListener('pointerup', handleStopRotate);
    document.body.style.setProperty('overscroll-behavior', 'auto');
    setRotating(false);
  }

  const handleRotateRDegrees = (r: number): void => {
    const relativeR = (r - (360 - rotation)) % 360;

    // It is possible for the user to trigger this rotation while also dragging slightly if they are fast,
    // So we do some fancy math to ensure the final rotation is an even number.
    setRotation(ro => Math.round((ro - relativeR) / ROTATION_INCREMENT) * ROTATION_INCREMENT);
  }

  return (
    <animated.div className='nav-ring' onPointerDown={handleBeginRotate} style={ringSpring}>
      <NavIcons options={props.options} select={handleRotateRDegrees} selection={props.options[props.selection]} />
    </animated.div>
  );
}

export default NavRing;