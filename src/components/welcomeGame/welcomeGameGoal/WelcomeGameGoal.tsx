import * as React from 'react';
import { IWordData } from '../WelcomeGame';
import './WelcomeGameGoal.css'

interface IWelcomeGameGoalProps {
  word: IWordData
}

function WelcomeGameGoal(props: IWelcomeGameGoalProps): JSX.Element {

  return (
    <div className={props.word.isComplete ? 'welcome-game-goal goal-complete' : 'welcome-game-goal'} data-index={props.word.index} data-word={props.word.word} id={'welcome-game-goal_' + props.word.index}>
      {props.word.word}
    </div>
  );
}

export default WelcomeGameGoal;