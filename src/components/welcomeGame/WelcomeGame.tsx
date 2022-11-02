import * as React from 'react';
import './WelcomeGame.css';
import WelcomeGameLevelManager from './welcomeGameLevelManager/WelcomeGameLevelManager';
import WelcomeGameStar from './welcomeGameStar/WelcomeGameStar';

interface IWelcomeGameProps {
  phrases: string[]
}
function WelcomeGame(props: IWelcomeGameProps): JSX.Element {
  return (
    <div className='welcome-game-wrapper'>
      <WelcomeGameLevelManager phrase={props.phrases[0]} />
    </div>
  );
}

export default WelcomeGame;