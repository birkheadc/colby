import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './WelcomePage.css'

interface IWelcomePageProps {

}

function WelcomePage(props: IWelcomePageProps) {
  return (
    <main>
      <h1>Welcome!</h1>
      <NavLink to="/about">ABOUT ME</NavLink>
    </main>
  );
}

export default WelcomePage;