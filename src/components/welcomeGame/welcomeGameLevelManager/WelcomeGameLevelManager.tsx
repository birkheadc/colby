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

  function highlightGoal(index: number): void {
    const goal = document.querySelector("#welcome-game-goal_" + index);
    goal?.classList.add('goal-complete');
  }

  const handleGoal = (index: number): void => {
    setScore(s => s  + 1);
    highlightGoal(index);
  }

  React.useEffect(() => {
    if (score >= words.length) {
      props.reportRoundComplete();
    }
  }, [score]);

  return (
    <>
      {words.map(
        word =>
        <WelcomeGameStar key={'welcome-game-star_' + word.index} reportGoal={handleGoal} word={word} />
      )}
      <div className='welcome-game-goals-wrapper'>
      {words.map(
        word =>
        <WelcomeGameGoal key={'welcome-game-goal_' + word.index} word={word} />
      )}
      </div>
    </>
  );
}

export default WelcomeGameLevelManager;