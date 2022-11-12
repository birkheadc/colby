import * as React from 'react';
import { INavOption } from '../../navOption/INavOption';
// import { animated, useSpring} from 'react-spring';
import './NavIcons.css'

interface INavIconsProps {
  options: INavOption[],
  selection: INavOption,
  select(deg: number): void
}

interface IIconRenderData {
  icon: JSX.Element,
  rotation: number,
  color: string
}

function NavIcons(props: INavIconsProps): JSX.Element {

  const ROTATION_INCREMENT = 360 / props.options.length;
  const MAXIMUM_DELTA_TIME: number = 250;
  const MAXIMUM_DELTA_SPACE: number = 5;

  function calculateIconRenderData(): IIconRenderData[] {
    let data: IIconRenderData[] = [];
    for (let i = 0; i < props.options.length; i++) {
      const rotation: number = ROTATION_INCREMENT * i;
      data.push({
        icon: props.options[i].icon,
        rotation: rotation,
        color: props.options[i].title === props.selection.title ? 'var(--clr-accent-c)' : 'var(--clr-text-a)'
      });
    }
    return data;
  }

  const data: IIconRenderData[] = calculateIconRenderData();

  const handlePointerDown = (e: React.MouseEvent, degrees: number): void => {
    const startSpace = { x: e.clientX, y: e.clientY };
    const startTime = +new Date();
    window.addEventListener('pointerup', (e: PointerEvent) => handlePointerUp(e, startSpace, startTime, degrees));
  }

  const handlePointerUp = (e: PointerEvent, startSpace: { x: number, y: number}, startTime: number, degrees: number): void => {
    const deltaTime: number = Math.abs(+new Date() - startTime);
    const deltaSpace: { x: number, y: number } = { x: Math.abs(startSpace.x - e.clientX), y: Math.abs(startSpace.y - e.clientY) };
    if (deltaTime <= MAXIMUM_DELTA_TIME && deltaSpace.x <= MAXIMUM_DELTA_SPACE && deltaSpace.y <= MAXIMUM_DELTA_SPACE) {
      props.select(degrees);
    }
    window.removeEventListener('pointerup', () => handlePointerUp(e, startSpace, startTime, degrees));
  }

  return (
    <>
      {data.map(
        icon => 
        <div className='nav-icon-wrapper' key={icon.icon.key} style={{transform: 'rotate(' + icon.rotation + 'deg)', color: icon.color}}>
          <button onPointerDown={(e: React.MouseEvent) => handlePointerDown(e, icon.rotation)} >{icon.icon}</button>
        </div>
      )}
    </>
  );
}

export default NavIcons;