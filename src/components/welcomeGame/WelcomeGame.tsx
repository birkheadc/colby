import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeGame.css';
import WelcomeGameGoalsManager from './welcomeGameGoalsManager/WelcomeGameGoalsManager';
import WelcomeGameStar from './welcomeGameStar/WelcomeGameStar';
import { animated, useSpring } from 'react-spring';

export interface IWordData {
  word: string,
  index: number,
  isComplete: boolean
}

interface IWelcomeGameProps {
  phrases: string[]
}
function WelcomeGame(props: IWelcomeGameProps): JSX.Element {

  const navigate = useNavigate();
  const [round, setRound] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [stars, setStars] = React.useState<IWordData[]>();
  const [goals, setGoals] = React.useState<IWordData[][]>();
  const [needHint, setNeedHint] = React.useState<boolean>(true);

  const [spring, springApi] = useSpring(() => ({
    from: { opacity: 1 }
  }));

  const [hintSpring, hintSpringApi] = useSpring(() => ({
    from: { opacity: 0 }
  }));

  React.useEffect(() => {
    let stars: IWordData[] = [];
    let goalPhrases: IWordData[][] = [];
    let index = 0;
    for (let i = 0; i < props.phrases.length; i++) {
      const words = props.phrases[i].split(' ');
      let goalPhrase: IWordData[] = [];
      for (let j = 0; j < words.length; j++) {
        const iWord: IWordData = {
          word: words[j],
          index: index,
          isComplete: false
        };
        stars.push(iWord);
        goalPhrase.push(iWord);
        index++;
      }
      goalPhrases.push(goalPhrase);
    }
    setStars(stars);
    setGoals(goalPhrases);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      hintSpringApi.start({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 }
      });
    }, 7500);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (goals == null) return;
    if (score >= goals[round].length) {
      handleRoundComplete();
    }
  }, [score]);

  const handleReportGoal = (goalIndex: number): void => {
    if (goals == null) return;
    const newGoals: IWordData[][] = [...goals];
    const thisRound: IWordData[] = newGoals[round];
    let goal = thisRound.find(g => g.index === goalIndex);
    if (goal == null) return;
    goal.isComplete = true;
    setGoals(newGoals);
    setScore(s => s + 1);
    setNeedHint(false);
  }

  const handleRoundComplete = (): void => {
    if (round + 1 >= props.phrases.length) {
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
        onRest: () => navigate('/about')
      });
    }
    else {
      setScore(0);
      setRound(c => c + 1);
    }
  }

  return (
    <animated.div className='welcome-game-wrapper' id='welcome-game-wrapper' style={spring}>
      <div className='welcome-game-spawner' id='welcome-game-spawner'></div>
      {
        stars?.map(
          star =>
          <WelcomeGameStar key={'welcome-game-star_' + star.index} word={star} reportGoal={handleReportGoal} />
        )
      }
      { goals ? <WelcomeGameGoalsManager goals={goals} round={round} /> : null}
      <animated.p className='welcome-game-hint' style={needHint ? { ...hintSpring } : { ...hintSpring, display: 'none' }}>(Drag the stars to the center)</animated.p>
    </animated.div>
  );
}

export default WelcomeGame;