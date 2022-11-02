import * as React from 'react';
import StarIcon, { IStarData } from './StarIcon';
import './StarSpawner.css';

interface IStarSpawnerProps {

}

function StarSpawner(props: IStarSpawnerProps): JSX.Element {

  const COLOR_MIN: number = 200;
  const COLOR_MAX: number = 255;
  const SCALE_MIN: number = 0.1;
  const SCALE_MAX: number = 0.4;
  const LOCATION_MIN: number = 10;
  const LOCATION_MAX: number = 90;

  const OPACITY_INCREMENT_MIN: number = 0.01;
  const OPACITY_INCREMENT_MAX: number = 0.05;

  const [starData, setStarData] = React.useState<IStarData>(generateRandomStarData());
  const [opacity, setOpacity] = React.useState(0);
  const [opacityIncrement, setOpacityIncrement] = React.useState(generateRandomNumberBetween(OPACITY_INCREMENT_MIN, OPACITY_INCREMENT_MAX));
  const [fadeIn, setFadeIn] = React.useState(true);
  const [timer, setTimer] = React.useState(0);

  function generateRandomStarData(): IStarData {
    return {
      color: 'rgb(' + generateRandomNumberBetween(COLOR_MIN, COLOR_MAX) + ', ' + generateRandomNumberBetween(COLOR_MIN, COLOR_MAX) + ', ' + generateRandomNumberBetween(COLOR_MIN, COLOR_MAX) + ')',
      scale: generateRandomNumberBetween(SCALE_MIN, SCALE_MAX),
      rotate: 0,
      location: {
        x: generateRandomNumberBetween(LOCATION_MIN, LOCATION_MAX),
        y: generateRandomNumberBetween(LOCATION_MIN, LOCATION_MAX)
      }
    };
  }

  function generateRandomNumberBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (timer < 0) {
      return;
    }
    if (fadeIn === true) {
      setOpacity(timer * opacityIncrement);
      if (opacity >= 1) {
        setFadeIn(false);
        setTimer(0);
      }
    }
    else {
      setOpacity(1 - (timer * opacityIncrement));
      if (opacity <= 0) {
        setFadeIn(true);
        setTimer(generateRandomNumberBetween(-15, 0));
        setStarData(generateRandomStarData());
        setOpacityIncrement(generateRandomNumberBetween(OPACITY_INCREMENT_MIN, OPACITY_INCREMENT_MAX));
      }
    }
  }, [timer, opacity, fadeIn])

  return (
    <StarIcon data={starData} opacity={opacity}/>
  );
}

export default StarSpawner;