import * as React from 'react';
import { animated, useSpring } from 'react-spring';
import { INavOption } from '../navOption/INavOption';
import NavIcons from './navIcon/NavIcons';
import './NavRing.css'

interface INavRingProps {
  options: INavOption[],
  navIcons: JSX.Element,
  select(selection: INavOption): void
}

function NavRing(props: INavRingProps): JSX.Element {

  const ROTATION_INCREMENT: number = 360 / props.options.length;

  const [ringSpring, ringSpringApi] = useSpring(() => ({
    from: {
      transform: 'rotate(0deg)'
    }
  }));

  function animateRotate(degree: number): void {
    // console.log("ROTATING TO: " + degree);
    ringSpringApi.start({
      to: {
        transform: 'rotate(' + degree + 'deg)'
      }
    })
  }
  
  let startAngle: number = 0;
  let currentRotation: number = 0;

  function snapToNearestIncrement(): void {
    const target = Math.round(currentRotation / ROTATION_INCREMENT) * ROTATION_INCREMENT;
    currentRotation = target;
    animateRotate(target);
  }

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

  const handleRotateStart = (e: React.MouseEvent): void => {
    const angle = calculateAngleFromScreenCenterToCursor(e.clientX, e.clientY);
    startAngle = angle - currentRotation;

    window.addEventListener('pointermove', handleRotate);
    window.addEventListener('pointerup', handleRotateStop);

    document.body.style.setProperty('overscroll-behavior', 'contain');
  }

  const handleRotate = (e: PointerEvent): void => {
    e.preventDefault();

    const angle = calculateAngleFromScreenCenterToCursor(e.clientX, e.clientY);
    let target = angle - startAngle;

    while (Math.abs(target - currentRotation) > 180) {
      target = target > currentRotation ? target - 360 : target + 360;
    }
    currentRotation = target;
    animateRotate(target);
    console.log("CURRENT: " + currentRotation + " | TARGET: " + target + " | START: " + startAngle);
  }

  const handleRotateStop = (): void => {
    window.removeEventListener('pointermove', handleRotate);
    document.body.style.setProperty('overscroll-behavior', 'auto');
    snapToNearestIncrement();
  }

  return (
    <animated.div className='nav-ring' onPointerDown={handleRotateStart} style={ringSpring}>
      {props.navIcons}
    </animated.div>
  );
}

export default NavRing;