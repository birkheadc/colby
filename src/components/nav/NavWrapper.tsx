import * as React from 'react';
import './NavWrapper.css'
import { animated, useSpring } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import NavWheel from './navWheel/NavWheel';
import useScrollDirection from '../../hooks/useScrollDirection';
import { Bars3Icon } from '@heroicons/react/24/outline'

interface INavWrapperProps {

}

function NavWrapper(props: INavWrapperProps) {

  const navigate = useNavigate();
  const [isOpen, setOpen] = React.useState(false);
  const scrollDirection = useScrollDirection();
  const navAnimationStates = {
    closed: {
      backdropFilter: 'blur(0px)'
    },
    open: {
      backdropFilter: 'blur(2px)'
    }
  };

  const [navSpring, navSpringApi] = useSpring(() => ({
    from: navAnimationStates.closed
  }));
  const navWrapperAnimationStates = {
    closed: {
      transform: 'translate(0%, 0%) scale(var(--nav-scale))',
      width: 75,
      height: 75,
      top: '1%',
      right: '2%'
    },
    open: {
      transform: 'translate(50%, -50%) scale(var(--nav-scale))',
      width: 500,
      height: 500,
      top: '50%',
      right: '50%'
    }
  };

  const [navHideSpring, navHideSpringApi] = useSpring(() => ({

  }));

  const [navWrapperSpring, navWrapperSpringApi] = useSpring(() => ({
    from: navWrapperAnimationStates.closed
  }));

  function animateOpenNav(): void {
    navWrapperSpringApi.start({
      to: navWrapperAnimationStates.open
    });
    navSpringApi.start({
      to: navAnimationStates.open
    });
  };

  function animateCloseNav(): void {
    navWrapperSpringApi.start({
      to: navWrapperAnimationStates.closed
    });
    navSpringApi.start({
      to: navAnimationStates.closed
    });
  };

  function animateHideNav(): void {
    navHideSpringApi.start({
      from: {
        transform: 'translate(0vh, 0vh)'
      },
      to: {
        transform: 'translate(0vh, -20vh)'
      },
      config: {
        mass: 5,
        tension: 100,
        clamp: true
      }
    });
  }

  function animateShowNav(): void {
    navHideSpringApi.start({
      from: {
        transform: 'translate(0vh, -20vh)'
      },
      to: {
        transform: 'translate(0vh, 0vh)'
      },
      config: {
        tension: 500,
        clamp: true
      }
    });
  }

  React.useEffect(() => {
    scrollDirection === "down" ? animateHideNav() : animateShowNav();
  }, [scrollDirection])

  React.useEffect(() => {
    if (isOpen) {
      animateOpenNav();
    }
    else {
      animateCloseNav();
    }
  }, [isOpen]);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      setOpen(false);
    });
    window.addEventListener('mousedown', () => {
      const elements = document.querySelectorAll(":hover");
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('nav-wrapper')) {
          return;
        }
      }
      setOpen(false);
    });
  }, []);

  const handleNavigate = (to: string): void => {
    setOpen(false);
    navigate(to);
  }

  function generateNavContents(): JSX.Element {
    if (isOpen) {
      return (
        <NavWheel navigate={handleNavigate}/>
      );
    }
    return (
      <animated.button className='nav-open-button' onClick={() => setOpen(true)} style={navHideSpring}><Bars3Icon /></animated.button>
    );
  }

  return (
    <animated.nav style={navSpring}>
      <animated.div className='nav-wrapper' style={navWrapperSpring}>
        {generateNavContents()}
      </animated.div>
    </animated.nav>
  );
}

export default NavWrapper;