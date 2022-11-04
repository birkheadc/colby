import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeGame.css';
import WelcomeGameLevelManager from './welcomeGameLevelManager/WelcomeGameLevelManager';

interface IWelcomeGameProps {
  phrases: string[]
}
function WelcomeGame(props: IWelcomeGameProps): JSX.Element {

  const navigate = useNavigate();
  const [currentRound, setCurrentRound] = React.useState(0);

  const handleRoundComplete = (): void => {
    if (currentRound + 1 >= props.phrases.length) {
      navigate('/about');
    }
    else {
      setCurrentRound(c => c + 1);
    }
  }

  return (
    <div className='welcome-game-wrapper' id='welcome-game-wrapper'>
      <div className='welcome-game-spawner' id='welcome-game-spawner'></div>
      <WelcomeGameLevelManager reportRoundComplete={handleRoundComplete} phrase={props.phrases[currentRound]} />
    </div>
  );
}

export default WelcomeGame;