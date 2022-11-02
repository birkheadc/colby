import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import NavGoButton from './navGoButton/NavGoButton';
import { INavOption } from './navOption/INavOption';
import NavIcons from './navRing/navIcon/NavIcons';
import NavRing from './navRing/NavRing';
import './NavWheel.css'
import { HomeIcon, UserIcon, CommandLineIcon, IdentificationIcon, NewspaperIcon, EnvelopeIcon, RectangleStackIcon } from '@heroicons/react/24/outline'

interface INavWheelProps {
  navigate(to: string): void
}

function NavWheel(props: INavWheelProps): JSX.Element {

  const NAV_OPTIONS: INavOption[] = [
    {
      icon: <HomeIcon key='0'/>,
      title: 'Home',
      description: 'Replay the welcome page',
      to: '/'
    },
    {
      icon: <UserIcon key='1'/>,
      title: 'About',
      description: 'Read all about me, Colby',
      to: '/about'
    },
    {
      icon: <CommandLineIcon key='2'/>,
      title: 'Projects',
      description: 'Information on projects I have made',
      to: '/projects'
    },
    {
      icon: <IdentificationIcon key='3'/>,
      title: 'Resume',
      description: "View Colby's Resume",
      to: '/resume'
    },
    {
      icon: <NewspaperIcon key='4'/>,
      title: 'Blog',
      description: "Overview of my recent blog articles",
      to: '/blog'
    },
    {
      icon: <EnvelopeIcon key='5'/>,
      title: 'Contact',
      description: "Contact Me",
      to: '/contact'
    },
    {
      icon: <RectangleStackIcon key='6'/>,
      title: 'Sandbox',
      description: "A page where my stray widgets gather and play",
      to: '/sandbox'
    },
  ];

  const ROTATION_INCREMENT: number = 360 / NAV_OPTIONS.length;

  const navWheelSpring = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    },
    config: {
      duration: 1000
    }
  });

  const [navButtonSpring, navButtonSpringApi] = useSpring(() => ({
    
  }));

  const location = useLocation();

  const [currentSelection, setCurrentSelection] = React.useState(getCurrentPage());

  function getCurrentPage(): INavOption {
    const path = location.pathname;
    return NAV_OPTIONS.find(s => s.to === path) || NAV_OPTIONS[0];
  }

  const handleNavigate = (): void => {
    props.navigate(currentSelection.to);
  }

  return (
    <animated.div className='nav-wheel' style={navWheelSpring}>
      <NavRing selection={NAV_OPTIONS.findIndex(o => o.title === currentSelection.title)} navIcons={<NavIcons options={NAV_OPTIONS} selection={currentSelection}/>} options={NAV_OPTIONS} select={(selection: INavOption) => {setCurrentSelection(selection)}} />
        <NavGoButton navigate={handleNavigate} selection={currentSelection}/>
    </animated.div>
  );
}

export default NavWheel;