import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavGoButton from './navGoButton/NavGoButton';
import { INavOption } from './navOption/INavOption';
import NavIcons from './navRing/navIcon/NavIcons';
import NavRing from './navRing/NavRing';
import './NavWheel.css'

interface INavWheelProps {
  navigate(to: string): void
}

function NavWheel(props: INavWheelProps): JSX.Element {

  const NAV_OPTIONS: INavOption[] = [
    {
      icon: <FontAwesomeIcon key='0' icon='home'/>,
      title: 'Home',
      description: 'Replay the welcome page',
      to: '/'
    },
    {
      icon: <FontAwesomeIcon key='1' icon='address-card'/>,
      title: 'About',
      description: 'Read all about me, Colby',
      to: '/about'
    },
    {
      icon: <FontAwesomeIcon key='2' icon='diagram-project'/>,
      title: 'Projects',
      description: 'Information on projects I have made',
      to: '/projects'
    },
    {
      icon: <FontAwesomeIcon key='3' icon='file'/>,
      title: 'Resume',
      description: "View Colby's Resume",
      to: '/resume'
    },
  ];

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
    <div className='nav-wheel'>
      <NavRing navIcons={<NavIcons options={NAV_OPTIONS} />} options={NAV_OPTIONS} select={(selection: INavOption) => {setCurrentSelection(selection)}} />
      <NavGoButton navigate={handleNavigate} selection={currentSelection}/>
    </div>
  );
}

export default NavWheel;