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
  const [isHidden, setHidden] = React.useState(false);
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
      transform: 'translate(0%, 0%)',
      width: 'min(5vh, 8vw)',
      height: 'min(5vh, 8vw)',
      top: '1%',
      right: '2%',
      transition: 'top 200ms linear, right 200ms linear'
    },
    open: {
      transform: 'translate(50%, -50%)',
      width: 'min(80vh, 80vw)',
      height: 'min(80vh, 80vw)',
      top: '50%',
      right: '50%',
      transition: 'width 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275), height 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275), top 200ms linear, right 200ms linear'
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

  React.useEffect(() => {
    scrollDirection === "down" ? setHidden(true) : setHidden(false);
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
      <button className='nav-open-button' onClick={() => setOpen(true)} style={{ transform: isHidden ? 'translate(0vh, -20vh)' : 'translate(0vh, 0vh)' }}><Bars3Icon /></button>
    );
  }

  return (
    <nav>
      <div className='nav-wrapper' style={isOpen ? navWrapperAnimationStates.open : navWrapperAnimationStates.closed}>
        {generateNavContents()}
      </div>
    </nav>
  );
}

export default NavWrapper;