import * as React from 'react';
import { animated, useSpring } from 'react-spring';
import { INavOption } from '../navOption/INavOption';
import './NavGoButton.css'

interface INavGoButtonProps {
  selection: INavOption,
  navigate(): void,
}

function NavGoButton(props: INavGoButtonProps): JSX.Element {

  const [navButtonSpring, navButtonSpringApi] = useSpring(() => ({

  }));

  React.useEffect(() => {
    navButtonSpringApi.start({
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      },
      config: {
        duration: 150
      }
    })
  }, [props.selection]);

  return (
    <div className='nav-go-button-wrapper'>
      <animated.button onClick={props.navigate} style={navButtonSpring}>{props.selection.title}</animated.button>
      <animated.p style={navButtonSpring}>{props.selection.description}</animated.p>
    </div>
  );
}

export default NavGoButton;