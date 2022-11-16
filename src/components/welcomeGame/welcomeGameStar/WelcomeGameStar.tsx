import * as React from 'react';
import './WelcomeGameStar.css';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import Helpers from '../../../helpers';
import { ISimpleRect } from '../../../helpers/calculateNonOverlappingQuadrants';
import { IWordData } from '../WelcomeGame';
import { animated, useSpring} from 'react-spring';

interface IWelcomeGameStarProps {
  word: IWordData,
  reportGoal(goalIndex: number): void
}

function WelcomeGameStar(props: IWelcomeGameStarProps): JSX.Element {

  const FADE_MIN: number = 1000;
  const FADE_MAX: number = 3000;

  const [dragging, setDragging] = React.useState(false);
  const [initialPosition, setInitialPosition] = React.useState<{ x: number, y: number }>(getNewInitialPosition());
  const [position, setPosition] = React.useState({x: 0, y: 0});
  const [complete, setComplete] = React.useState(false);

  const [textSpring, textSpringApi] = useSpring(() => ({
    from: { opacity: 0 }
  }));

  const [starSpring, starSpringApi] = useSpring(() => ({
    from: { opacity: 0 }
  }));

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
  
  const fadeInText = (): void => {
    textSpringApi.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: Helpers.generateRandomNumberBetween(FADE_MIN, FADE_MAX)},
      onRest: fadeOutText
    });
  }

  const fadeOutText = (): void => {
    textSpringApi.start({
      from: { opacity: 1 },
      to: { opacity: 0 },
      config: { duration: Helpers.generateRandomNumberBetween(FADE_MIN, FADE_MAX)},
      onRest: fadeInStar
    });
  }

  const fadeInStar = (): void => {
    starSpringApi.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: Helpers.generateRandomNumberBetween(FADE_MIN, FADE_MAX)},
      onRest: fadeOutStar
    });
  }

  const fadeOutStar = (): void => {
    starSpringApi.start({
      from: { opacity: 1 },
      to: { opacity: 0 },
      config: { duration: Helpers.generateRandomNumberBetween(FADE_MIN, FADE_MAX)},
      onRest: fadeInText
    });
  }

  React.useEffect(() => {
    setInitialPosition(getNewInitialPosition());
    window.addEventListener('resize', () => setInitialPosition(getNewInitialPosition()));
    fadeInStar();
  }, []);

  function getOverlappingGoalIndex(): number | null {
    const star = document.querySelector('#welcome-game-star_' + props.word.index);
    const goals = document.querySelectorAll('[data-word="' + props.word.word + '"][data-complete="false"');
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
    <div className='welcome-game-star-wrapper' style={{transform: 'translate(' + initialPosition.x + 'px, ' + initialPosition.y + 'px)'}}>
      <Draggable disabled={complete} position={position} onStart={() => setDragging(true)} onDrag={dragHandler} onStop={dragStopHandler} >
        <div className='welcome-game-star' id={'welcome-game-star_' + props.word.index} style={complete ? styles.disabled : (dragging ? styles.dragging : styles.notDragging) }>
          <animated.div style={ dragging ? { } : textSpring}>{props.word.word}</animated.div>
          <animated.div style={dragging ? { transform: 'scale(0.5)', opacity: 0 } : { transform: 'scale(0.5)', ...starSpring}}>
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox='0 0 80 80'>
              <defs>
                <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_2_blur">
                <feGaussianBlur stdDeviation="4" in="SourceGraphic"/>
                </filter>
              </defs>
              <g>
                <path fill={dragging ? styles.dragging.color : styles.notDragging.color} filter="url(#svg_2_blur)" id="svg_2" clipRule="evenodd" fillRule="evenodd" d="m40.65162,78.44l-1.30324,0c0,-10.10426 -3.97555,-18.93846 -11.92006,-26.49007c-7.94451,-7.55161 -17.23176,-11.33054 -27.86832,-11.33054l0,-1.23879c10.63656,0 19.92381,-3.77893 27.86832,-11.34931c7.94451,-7.57038 11.92006,-16.39831 11.92006,-26.4713l1.30324,0c0,10.10426 3.97555,18.93846 11.92006,26.49007c7.94451,7.55161 17.23176,11.33054 27.86832,11.33054l0,1.23879c-10.62998,0 -19.92381,3.77893 -27.86832,11.33054c-7.94451,7.55161 -11.92006,16.37954 -11.92006,26.49007l0,0z" className="st0"/>
              </g>
            </svg>
          </animated.div>
        </div>
      </Draggable>
    </div>
  );
}

export default WelcomeGameStar;