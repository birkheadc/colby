import * as React from 'react';
import './WelcomeGame.css';
import WelcomeGameLevelManager from './welcomeGameLevelManager/WelcomeGameLevelManager';

interface IWelcomeGameProps {
  phrases: string[]
}
function WelcomeGame(props: IWelcomeGameProps): JSX.Element {

  const [currentRound, setCurrentRound] = React.useState(0);

  const handleRoundComplete = (): void => {
    setCurrentRound(c => c + 1);
    console.log('round won');
  }

  return (
    <div className='welcome-game-wrapper'>
      <WelcomeGameLevelManager reportRoundComplete={handleRoundComplete} phrase={props.phrases[currentRound]} />
    </div>
  );
}

export default WelcomeGame;