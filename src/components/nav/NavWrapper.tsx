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
  // Contents refers to what to show in the wrapper.
  // If the nav 'inOpen', show the 'nav', else, show 'button'.
  // We use a separate state from 'isOpen' in order to delay changing the contents.
  const [contents, setContents] = React.useState('button');
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
      transform: 'translate(50%, -50%) scale(7%)',
      top: '5%',
      right: '5%',
      transition: 'top 300ms cubic-bezier(0.39, 0.575, 0.565, 1) 100ms, right 300ms cubic-bezier(0.39, 0.575, 0.565, 1) 100ms, transform 300ms cubic-bezier(0.39, 0.575, 0.565, 1) 0ms'
    },
    open: {
      transform: 'translate(50%, -50%) scale(100%)',
      top: '50%',
      right: '50%',
      transition: 'top 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0ms, right 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0ms, transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 200ms'
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
      setContents('nav')
    }
    else {
      animateCloseNav();
      setTimeout(() => {
        if (isOpen === false) setContents('button')
      }, 300)
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
    if (contents === 'nav') {
      return (
        <NavWheel navigate={handleNavigate}/>
      );
    }
    return (
      <button className='nav-open-button' onClick={() => setOpen(true)} style={{ transform: isHidden ? 'translate(0vh, -200vh)' : 'translate(0vh, 0vh)' }}><Bars3Icon /></button>
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