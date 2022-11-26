import * as React from 'react';
import { animated, useSpring } from 'react-spring';
import { INavOption } from '../navOption/INavOption';
import './NavGoButton.css'

interface INavGoButtonProps {
  title: string,
  description: string,
  navigate(): void,
}

function NavGoButton(props: INavGoButtonProps): JSX.Element {

  const [navButtonSpring, navButtonSpringApi] = useSpring(() => ({
    from: { opacity: 0 }
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
        duration: 500
      }
    })
  });

  return (
    <div className='nav-option-contents-wrapper'>
      <animated.button className='nav-go-button' onClick={props.navigate} style={navButtonSpring}>{props.title}</animated.button>
      <animated.p style={navButtonSpring}>{props.description}</animated.p>
    </div>
  )
}

export default NavGoButton;