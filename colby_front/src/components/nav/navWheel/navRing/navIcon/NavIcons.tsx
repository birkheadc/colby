import * as React from 'react';
import { INavOption } from '../../navOption/INavOption';
// import { animated, useSpring} from 'react-spring';
import './NavIcons.css'

interface INavIconsProps {
  options: INavOption[]
}

interface IIconRenderData {
  icon: JSX.Element,
  transform: string
}

function NavIcons(props: INavIconsProps): JSX.Element {

  const ROTATION_INCREMENT = 360 / props.options.length;

  function calculateIconRenderData(): IIconRenderData[] {
    let data: IIconRenderData[] = [];
    for (let i = 0; i < props.options.length; i++) {
      const rotation: number = ROTATION_INCREMENT * i;
      data.push({
        icon: props.options[i].icon,
        transform: 'rotate(' + rotation + 'deg)'
      });
    }
    return data;
  }

  const data: IIconRenderData[] = calculateIconRenderData();

  return (
    <>
      {data.map(
        icon => 
        <div className='nav-icon' key={icon.icon.key} style={{transform: icon.transform}}>
          {icon.icon}
        </div>
      )}
    </>
  );
}

export default NavIcons;