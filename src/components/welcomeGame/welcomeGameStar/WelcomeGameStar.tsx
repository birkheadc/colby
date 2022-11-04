import * as React from 'react';
import './WelcomeGameStar.css';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import Helpers from '../../../helpers';
import { ISimpleRect } from '../../../helpers/calculateNonOverlappingQuadrants';
import { IWordData } from '../WelcomeGame';

interface IWelcomeGameStarProps {
  word: IWordData,
  reportGoal(goalIndex: number): void
}

function WelcomeGameStar(props: IWelcomeGameStarProps): JSX.Element {

  const [dragging, setDragging] = React.useState(false);
  const [initialPosition, setInitialPosition] = React.useState<{ x: number, y: number }>(getNewInitialPosition());
  const [position, setPosition] = React.useState({x: 0, y: 0});
  const [complete, setComplete] = React.useState(false);
  

  function getNewInitialPosition(): {x: number, y: number} {
    const spawnBox: DOMRect | undefined = document.querySelector('#welcome-game-spawner')?.getBoundingClientRect();
    const noSpawnBox: DOMRect | undefined = document.querySelector('#welcome-game-goals-wrapper')?.getBoundingClientRect();

    if (!spawnBox || !noSpawnBox) return { x: 0, y: 0 };

    const quadrants: ISimpleRect[] = Helpers.calculateNonOverlappingQuadrants(spawnBox, noSpawnBox);
    if (quadrants.length < 1) return { x: 0, y: 0 };

    const box: ISimpleRect = quadrants[Math.floor(Math.random() * quadrants.length)];
    return {
      x: Helpers.generateRandomNumberBetween(box.left, box.right),
      y: Helpers.generateRandomNumberBetween(box.top, box.bottom)
    };
  }

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
    setInitialPosition(getNewInitialPosition());
    window.addEventListener('resize', () => setInitialPosition(getNewInitialPosition()));
  }, []);

  function getOverlappingGoalIndex(): number | null {
    const star = document.querySelector('#welcome-game-star_' + props.word.index);
    const goals = document.querySelectorAll('[data-word="' + props.word.word + '"]');
    if (!star || goals.length < 1) {
      return null;
    }
    const starRect = star.getBoundingClientRect();
    for (let i = 0; i < goals.length; i++) {
      const goalRect = goals[i].getBoundingClientRect();
      if (Helpers.areRectsOverlapping(starRect, goalRect) === true) {
        const index = goals[i].getAttribute('data-index');
        return index ? parseInt(index) : null;
      }
    }
    return null;
  }

  const dragHandler = (e: DraggableEvent, data: DraggableData): void => {
    setPosition({x: data.x, y: data.y})
  }

  const dragStopHandler = (e: DraggableEvent, data: DraggableData): void => {
    setDragging(false);
    const goalIndex = getOverlappingGoalIndex();
    if (goalIndex != null) {
      props.reportGoal(goalIndex);
      setComplete(true);
    }
  }

  return (
    <div className='welcome-game-star-wrapper' style={{transform: 'translate(' + initialPosition.x + 'px, ' + initialPosition.y + 'px) scale(var(--nav-scale))'}}>
      <Draggable disabled={complete} position={position} onStart={() => setDragging(true)} onDrag={dragHandler} onStop={dragStopHandler} scale={parseFloat(document.documentElement.style.getPropertyValue('--nav-scale'))}>
        <div className='welcome-game-star' id={'welcome-game-star_' + props.word.index} style={complete ? styles.disabled : (dragging ? styles.dragging : styles.notDragging) }>
          {props.word.word}
        </div>
      </Draggable>
    </div>
  );
}

export default WelcomeGameStar;