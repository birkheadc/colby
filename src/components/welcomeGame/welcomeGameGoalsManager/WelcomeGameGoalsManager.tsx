import * as React from 'react';
import { IWordData } from '../WelcomeGame';
import WelcomeGameGoal from '../welcomeGameGoal/WelcomeGameGoal';
import './WelcomeGameGoalsManager.css';
import { animated, useSpring } from 'react-spring';

interface IWelcomeGameGoalsManagerProps {
  goals: IWordData[][],
  round: number
}
function WelcomeGameGoalsManager(props: IWelcomeGameGoalsManagerProps): JSX.Element {

  const [round, setRound] = React.useState(0);

  const [spring, springApi] = useSpring(() => ({
    
  }));

  React.useEffect(() => {
    springApi.start({
      from: {
        opacity: 1
      },
      to: {
        opacity: 0
      },
      config: {
        duration: 1000
      },
      onRest: () => {
        setRound(r => r + 1);
      }
    });
  }, [props.round]);

  React.useEffect(() => {
    springApi.start({
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      },
      config: {
        duration: 1000
      }
    });
  }, [round]);

  return (
    <animated.div className='welcome-game-goals-wrapper' id='welcome-game-goals-wrapper' style={spring}>
      {props.goals[round].map(
        word =>
        <WelcomeGameGoal key={'welcome-game-goal_' + word.index} word={word}/>
      )}
    </animated.div>
  );
}

export default WelcomeGameGoalsManager;