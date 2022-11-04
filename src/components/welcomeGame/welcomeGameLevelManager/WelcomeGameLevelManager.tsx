import * as React from 'react';
import WelcomeGameGoal from '../welcomeGameGoal/WelcomeGameGoal';
import WelcomeGameStar from '../welcomeGameStar/WelcomeGameStar';
import './WelcomeGameLevelManager.css'

interface IWelcomeGameLevelManagerProps {
  reportRoundComplete(): void,
  phrase: string
}

export interface IWord {
  index: number,
  word: string,
}

function WelcomeGameLevelManager(props: IWelcomeGameLevelManagerProps): JSX.Element {

  const words = breakIntoWords(props.phrase);
  const [score, setScore] = React.useState(0);
  const [completedGoals, setCompletedGoals] = React.useState<boolean[]>([]);

  function breakIntoWords(phrase: string ): IWord[] {
    const iWords: IWord[] = [];
    const words: string[] = phrase.split(' ');
    for (let i = 0; i < words.length; i++) {
      iWords.push({
        index: i,
        word: words[i]
      });
    }
    return iWords;
  }

  const handleGoal = (index: number): void => {
    setScore(s => s  + 1);
    const array = [...completedGoals];
    array[index] = true;
    setCompletedGoals(array);
  }

  React.useEffect(() => {
    if (score >= words.length) {
      props.reportRoundComplete();
    }
  }, [score]);

  React.useEffect(() => {
    function initializeRound(): void {
      setScore(0);
      const array = [];
      for (let i = 0; i < words.length; i++) {
        array.push(false);
      }
      setCompletedGoals(array);
    }
    initializeRound();
  }, [props.phrase])

  return (
    <>
      {words.map(
        word =>
        <WelcomeGameStar complete={completedGoals[word.index]} key={'welcome-game-star_' + word.index} reportGoal={handleGoal} word={word} />
      )}
      <div className='welcome-game-goals-wrapper' id='welcome-game-goals-wrapper'>
      {words.map(
        word =>
        <WelcomeGameGoal complete={completedGoals[word.index]} key={'welcome-game-goal_' + word.index} word={word} />
      )}
      </div>
    </>
  );
}

export default WelcomeGameLevelManager;