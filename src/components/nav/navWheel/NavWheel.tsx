import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import NavGoButton from './navGoButton/NavGoButton';
import { INavOption } from './navOption/INavOption';
import NavIcons from './navRing/navIcon/NavIcons';
import NavRing from './navRing/NavRing';
import './NavWheel.css'
import { HomeIcon, UserIcon, CommandLineIcon, IdentificationIcon, NewspaperIcon, EnvelopeIcon, RectangleStackIcon } from '@heroicons/react/24/outline'
import ContactWidget from '../../contact/ContactWidget';

interface INavWheelProps {
  navigate(to: string): void
}

function NavWheel(props: INavWheelProps): JSX.Element {

  const NAV_OPTIONS: INavOption[] = [
    {
      icon: <HomeIcon key='0'/>,
      title: 'Home',
      contents: <NavGoButton navigate={() => props.navigate('/')} description={'Replay the welcome page'} title={'Home'}/>,
      to: '/'
    },
    {
      icon: <UserIcon key='1'/>,
      title: 'About',
      contents: <NavGoButton navigate={() => props.navigate('/about')} description={'Read all about me, Colby'} title={'About'}/>,
      to: '/about'
    },
    {
      icon: <CommandLineIcon key='2'/>,
      title: 'Projects',
      contents: <NavGoButton navigate={() => props.navigate('/projects')} description={'Information on projects I have made'} title={'Projects'}/>,
      to: '/projects'
    },
    {
      icon: <IdentificationIcon key='3'/>,
      title: 'Resume',
      contents: <NavGoButton navigate={() => props.navigate('/resume')} description={"View my resume"} title={'Resume'}/>,
      to: '/resume'
    },
    {
      icon: <NewspaperIcon key='4'/>,
      title: 'Blog',
      contents: <NavGoButton navigate={() => props.navigate('/blog')} description={'Overview of my recent blog articles'} title={'Blog'}/>,
      to: '/blog'
    },
    {
      icon: <EnvelopeIcon key='5'/>,
      title: 'Contact',
      contents: <div className='nav-option-contents-wrapper'><ContactWidget /></div>,
      to: '/contact'
    }
  ];

  const location = useLocation();

  const [currentSelection, setCurrentSelection] = React.useState(getCurrentPage());

  function getCurrentPage(): INavOption {
    const path = location.pathname;
    return NAV_OPTIONS.find(s => s.to === path) || NAV_OPTIONS[0];
  }

  return (
    <div className='nav-wheel'>
      <NavRing selection={NAV_OPTIONS.findIndex(o => o.title === currentSelection.title)} options={NAV_OPTIONS} select={(selection: INavOption) => {setCurrentSelection(selection)}} />
        {currentSelection.contents}
    </div>
  );
}

export default NavWheel;