import * as React from 'react';
import Helpers from '../../helpers';
import StarIcon, { IStarData } from './StarIcon';
import './StarSpawner.css';
import { animated, useSpring} from 'react-spring';

interface IStarSpawnerProps {

}

function StarSpawner(props: IStarSpawnerProps): JSX.Element {

  const COLOR_MIN: number = 200;
  const COLOR_MAX: number = 255;
  const SCALE_MIN: number = 0.1;
  const SCALE_MAX: number = 0.4;
  const LOCATION_MIN: number = 10;
  const LOCATION_MAX: number = 90;
  const FADE_MIN: number = 1000;
  const FADE_MAX: number = 3000;

  const [starData, setStarData] = React.useState<IStarData>(generateRandomStarData());

  function generateRandomStarData(): IStarData {
    return {
      color: 'rgb(' + Helpers.generateRandomNumberBetween(COLOR_MIN, COLOR_MAX) + ', ' + Helpers.generateRandomNumberBetween(COLOR_MIN, COLOR_MAX) + ', ' + Helpers.generateRandomNumberBetween(COLOR_MIN, COLOR_MAX) + ')',
      scale: Helpers.generateRandomNumberBetween(SCALE_MIN, SCALE_MAX),
      rotate: 0,
      location: {
        x: Helpers.generateRandomNumberBetween(LOCATION_MIN, LOCATION_MAX),
        y: Helpers.generateRandomNumberBetween(LOCATION_MIN, LOCATION_MAX)
      }
    };
  }

  const [spring, springApi] = useSpring(() => ({
    from: { opacity: 0 }
  }));

  const fadeIn = (): void => {
    setStarData(generateRandomStarData());
    springApi.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: Helpers.generateRandomNumberBetween(FADE_MIN, FADE_MAX)},
      onRest: fadeOut
    });
  }

  const fadeOut = (): void => {
    springApi.start({
      from: { opacity: 1 },
      to: { opacity: 0 },
      config: { duration: Helpers.generateRandomNumberBetween(FADE_MIN, FADE_MAX)},
      onRest: fadeIn
    });
  }

  React.useEffect(() => {
    fadeIn();
  }, []);

  return (
    <animated.div style={spring}>
      <StarIcon data={starData}/>
    </animated.div>
  );
}

export default StarSpawner;