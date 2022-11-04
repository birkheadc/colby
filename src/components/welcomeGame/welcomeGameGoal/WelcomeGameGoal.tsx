import * as React from 'react';
import { IWord } from '../welcomeGameLevelManager/WelcomeGameLevelManager';
import './WelcomeGameGoal.css'

interface IWelcomeGameGoalProps {
  complete: boolean
  word: IWord
}

function WelcomeGameGoal(props: IWelcomeGameGoalProps): JSX.Element {

  return (
    <div className={props.complete ? 'welcome-game-goal goal-complete' : 'welcome-game-goal'} id={'welcome-game-goal_' + props.word.index}>
      {props.word.word}
    </div>
  );
}

export default WelcomeGameGoal;