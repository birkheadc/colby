import * as React from 'react';
import { IWord } from '../welcomeGameLevelManager/WelcomeGameLevelManager';
import './WelcomeGameGoal.css'

interface IWelcomeGameGoalProps {
  words: IWord[]
}

function WelcomeGameGoal(props: IWelcomeGameGoalProps): JSX.Element {
  return (
    <div className='welcome-game-goal'>
      {props.words.map(
        word =>
        <span id={'welcome-game-goal_' + word.index} key={word.index}>{word.word}</span>
      )}
    </div>
  );
}

export default WelcomeGameGoal;