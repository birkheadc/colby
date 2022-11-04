import * as React from 'react';
import './WelcomeGameStar.css';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { IWord } from '../welcomeGameLevelManager/WelcomeGameLevelManager';
import Helpers from '../../../helpers';
import { ISimpleRect } from '../../../helpers/calculateNonOverlappingQuadrants';

interface IWelcomeGameStarProps {
  complete: boolean,
  word: IWord,
  reportGoal(index: number): void
}

function WelcomeGameStar(props: IWelcomeGameStarProps): JSX.Element {

  const [dragging, setDragging] = React.useState(false);
  const [initialPosition, setInitialPosition] = React.useState<{ x: number, y: number }>(getNewInitialPosition());
  const [position, setPosition] = React.useState({x: 0, y: 0});
  

  function getNewInitialPosition(): {x: number, y: number} {

    const spawnBox: DOMRect | undefined = document.querySelector('#welcome-game-spawner')?.getBoundingClientRect();
    const noSpawnBox: DOMRect | undefined = document.querySelector('#welcome-game-goals-wrapper')?.getBoundingClientRect();

    if (!spawnBox || !noSpawnBox) {
      return {
        x: 0,
        y: 0
      }
    }

    const quadrants: ISimpleRect[] = Helpers.calculateNonOverlappingQuadrants(spawnBox, noSpawnBox);
    if (quadrants.length < 1) {
      return {
        x: 0,
        y: 0
      }
    }
    const box: ISimpleRect = quadrants[Math.floor(Math.random() * quadrants.length)];

    const location = {
      x: Helpers.generateRandomNumberBetween(box.left, box.right),
      y: Helpers.generateRandomNumberBetween(box.top, box.bottom)
    };

    return location;
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
    window.addEventListener('resize', () => setPosition({x: 0, y: 0}));
  }, []);

  React.useEffect(() => {
    setPosition({x: 0, y: 0});
  }, [initialPosition]);

  React.useEffect(() => {
    setInitialPosition(getNewInitialPosition())
  }, [props.complete]);

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
      props.reportGoal(props.word.index);
    }
  }

  return (
    <div className='welcome-game-star-wrapper' style={{transform: 'translate(' + initialPosition.x + 'px, ' + initialPosition.y + 'px) scale(var(--nav-scale))'}}>
      <Draggable disabled={props.complete} position={position} onStart={() => setDragging(true)} onDrag={dragHandler} onStop={dragStopHandler} scale={parseFloat(document.documentElement.style.getPropertyValue('--nav-scale'))}>
        <div className='welcome-game-star' id={'welcome-game-star_' + props.word.index} style={props.complete ? styles.disabled : (dragging ? styles.dragging : styles.notDragging) }>
          {props.word.word}
        </div>
      </Draggable>
    </div>
  );
}

export default WelcomeGameStar;