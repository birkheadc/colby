import * as React from 'react';
import './NavWrapper.css'
import { animated, useSpring } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import NavWheel from './navWheel/NavWheel';

interface INavWrapperProps {

}

function NavWrapper(props: INavWrapperProps) {

  const navigate = useNavigate();
  const [isOpen, setOpen] = React.useState(false);

  const navAnimationStates = {
    closed: {
      transform: 'translate(0%, 0%) scale(var(--nav-scale))',
      width: 100,
      height: 100,
      top: '0%',
      right: '0%'
    },
    open: {
      transform: 'translate(50%, -50%) scale(var(--nav-scale))',
      width: 500,
      height: 500,
      top: '50%',
      right: '50%'
    }
  };

  const [navSpring, navSpringApi] = useSpring(() => ({
    from: navAnimationStates.closed
  }));

  function animateOpenNav(): void {
    navSpringApi.start({
      to: navAnimationStates.open
    });
  };

  function animateCloseNav(): void {
    navSpringApi.start({
      to: navAnimationStates.closed
    });
  };

  React.useEffect(() => {
    isOpen ? animateOpenNav() : animateCloseNav();
  }, [isOpen]);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {setOpen(false)});
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
      <button className='nav-open-button' onClick={() => setOpen(true)}>OPEN</button>
    );
  }

  return (
    <nav>
      <animated.div className='nav-wrapper' style={navSpring}>
        {generateNavContents()}
      </animated.div>
    </nav>
  );
}

export default NavWrapper;