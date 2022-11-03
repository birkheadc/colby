import * as React from 'react';
import { IWord } from '../welcomeGameLevelManager/WelcomeGameLevelManager';
import './WelcomeGameGoal.css'

interface IWelcomeGameGoalProps {
  word: IWord
}

function WelcomeGameGoal(props: IWelcomeGameGoalProps): JSX.Element {
  return (
    <div className='welcome-game-goal' id={'welcome-game-goal_' + props.word.index}>
      {props.word.word}
    </div>
  );
}

export default WelcomeGameGoal;