import * as React from 'react';
import { NavLink } from 'react-router-dom';
import WelcomeGame from '../../../welcomeGame/WelcomeGame';
import './WelcomePage.css'

interface IWelcomePageProps {

}

function WelcomePage(props: IWelcomePageProps) {
  return (
    <main>
      <div className='welcome-page-wrapper'>
        <WelcomeGame phrases={['welcome', "my name is Colby", 'this is my virtual space']} />
        <NavLink className='welcome-page-skip-link' to='/about'>Very flashy intro, but I'm in a hurry, please let me out.</NavLink>
      </div>
    </main>
  );
}

export default WelcomePage;