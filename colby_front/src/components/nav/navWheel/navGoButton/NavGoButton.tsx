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

  const [hoverSpring, hoverSpringApi] = useSpring(() => ({
    from: {
      color: 'var(--clr-accent-c)',
      fontSize: '1.5rem'
    }
  }));

  const animateButtonHover = (): void => {
    hoverSpringApi.start({
      from: {
        color: 'var(--clr-accent-c)',
        fontSize: '1.5rem'
      },
      to: {
        color: 'var(--clr-accent-b)',
        fontSize: '2rem'
      },
      config: {
        duration: 150
      }
    });
  }

  const animateButtonLeave = (): void => {
    hoverSpringApi.start({
      to: {
        color: 'var(--clr-accent-c)',
        fontSize: '1.5rem'
      },
      from: {
        color: 'var(--clr-accent-b)',
        fontSize: '2rem'
      },
      config: {
        duration: 150
      }
    });
  }

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
      <animated.button className='nav-go-button' onClick={props.navigate} onPointerEnter={animateButtonHover} onPointerLeave={animateButtonLeave} style={{...hoverSpring, ...navButtonSpring}}>{props.selection.title}</animated.button>
      <animated.p style={navButtonSpring}>{props.selection.description}</animated.p>
    </div>
  )
}

export default NavGoButton;