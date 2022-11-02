import * as React from 'react';
import './WelcomeGameStar.css';
import Draggable from 'react-draggable';

interface IWelcomeGameStarProps {
  index: number,
  word: string
}

function WelcomeGameStar(props: IWelcomeGameStarProps): JSX.Element {

  const [dragging, setDragging] = React.useState(false);

  const styles = {
    dragging: {
      color: 'var(--clr-accent-b)'
    },
    notDragging: {
      color: 'var(--clr-accent-c)'
    }
  }

  return (
    <Draggable onStart={() => setDragging(true)} onStop={() => setDragging(false)}>
      <div className='welcome-game-star-wrapper' style={dragging ? styles.dragging : styles.notDragging}>
        {props.word}
      </div>
    </Draggable>
  );
}

export default WelcomeGameStar;