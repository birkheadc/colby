import * as React from 'react';
import './WelcomeGameStar.css';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { IWord } from '../welcomeGameLevelManager/WelcomeGameLevelManager';

interface IWelcomeGameStarProps {
  word: IWord
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

  const styles = {
    dragging: {
      color: 'var(--clr-accent-b)'
    },
    notDragging: {
      color: 'var(--clr-accent-c)'
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', () => setPosition(initialPosition));
  }, []);

  const dragHandler = (e: DraggableEvent, data: DraggableData): void => {
    setPosition({x: data.x, y: data.y})
  }

  return (
    <div className='welcome-game-star-wrapper'>
      <Draggable position={position} onStart={() => setDragging(true)} onDrag={dragHandler} onStop={() => setDragging(false)} scale={parseFloat(document.documentElement.style.getPropertyValue('--nav-scale'))}>
        <div className='welcome-game-star' id={'welcome-game-star_' + props.word.index} style={dragging ? styles.dragging : styles.notDragging}>
          {props.word.word}
        </div>
      </Draggable>
    </div>
  );
}

export default WelcomeGameStar;