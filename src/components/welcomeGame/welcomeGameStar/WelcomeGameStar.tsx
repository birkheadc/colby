import * as React from 'react';
import './WelcomeGameStar.css';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { IWord } from '../welcomeGameLevelManager/WelcomeGameLevelManager';

interface IWelcomeGameStarProps {
  word: IWord,
  reportGoal(index: number): void
}

function WelcomeGameStar(props: IWelcomeGameStarProps): JSX.Element {

  const initialPosition: {x: number, y: number} = getInitialPosition();

  function getInitialPosition(): {x: number, y: number} {
    // TODO: make this randomly select a good initial position
    return {
      x: 0,
      y: 0
    }
  }

  const [dragging, setDragging] = React.useState(false);
  const [position, setPosition] = React.useState(initialPosition);
  const [active, setActive] = React.useState(true);

  const styles = {
    dragging: {
      color: 'var(--clr-accent-b)'
    },
    notDragging: {
      color: 'var(--clr-accent-c)'
    },
    disabled: {
      display: 'none'
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', () => setPosition(initialPosition));
  }, []);

  function isMouseOverGoal(): boolean {
    const star = document.querySelector('#welcome-game-star_' + props.word.index);
    const goal = document.querySelector('#welcome-game-goal_' + props.word.index);
    const rect1 = star?.getBoundingClientRect();
    const rect2 = goal?.getBoundingClientRect();

    if (!rect1 || !rect2) {
      return false;
    }
    
    return !(
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.bottom < rect2.top ||
      rect1.left > rect2.right
    );
  }

  const dragHandler = (e: DraggableEvent, data: DraggableData): void => {
    setPosition({x: data.x, y: data.y})
  }

  const dragStopHandler = (e: DraggableEvent, data: DraggableData): void => {
    setDragging(false);
    if (isMouseOverGoal() === true) {
      setActive(false);
      props.reportGoal(props.word.index);
    }
  }

  return (
    <div className='welcome-game-star-wrapper'>
      <Draggable disabled={!active} position={position} onStart={() => setDragging(true)} onDrag={dragHandler} onStop={dragStopHandler} scale={parseFloat(document.documentElement.style.getPropertyValue('--nav-scale'))}>
        <div className='welcome-game-star' id={'welcome-game-star_' + props.word.index} style={active ? (dragging ? styles.dragging : styles.notDragging) : styles.disabled}>
          {props.word.word}
        </div>
      </Draggable>
    </div>
  );
}

export default WelcomeGameStar;