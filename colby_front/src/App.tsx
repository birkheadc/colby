import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import MainWindow from './components/mainWindow/MainWindow';

interface IAppProps {

}

function App(props: IAppProps): JSX.Element  {

  const [navScale, setNavScale] = React.useState(calculateNavScale());

  function calculateNavScale(): number {
    const hWidth = window.innerWidth / 2;
    const hHeight = window.innerHeight / 2;
    const MAX_WIDTH = 500;
    const SCALE = 0.003;

    return SCALE * Math.min(hWidth, hHeight, MAX_WIDTH);
  }

  React.useEffect(() => {
    document.documentElement.style.setProperty('--nav-scale', navScale.toString());
  }, [ navScale ]);

  React.useEffect(() => {
    window.addEventListener('resize', () => setNavScale(calculateNavScale()));
  }, []);

  return (
    <BrowserRouter>
    <div id='background'></div>
      <MainWindow />
    </BrowserRouter>
  );
}

export default App;