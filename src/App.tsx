import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Api from './api/Api';
import { AppData } from './api/AppData';
import './App.css'
import Background from './components/background/Background';
import MainWindow from './components/mainWindow/MainWindow';

interface IAppProps {

}

function App(props: IAppProps): JSX.Element  {

  const [navScale, setNavScale] = React.useState(calculateNavScale());

  const [appData, setAppData] = React.useState<AppData>();

  function calculateNavScale(): number {
    const hWidth = window.innerWidth / 2;
    const hHeight = window.innerHeight / 2;
    const SCALE = 0.003;

    return SCALE * Math.min(hWidth, hHeight);
  }

  React.useEffect(() => {
    document.documentElement.style.setProperty('--nav-scale', navScale.toString());
  }, [ navScale ]);

  React.useEffect(() => {
    window.addEventListener('resize', () => setNavScale(calculateNavScale()));
    async function fetchAppData(): Promise<void> {
      const data: AppData = await Api.fetchAppData();
      setAppData(data);
    }
    fetchAppData();
  }, []);

  return (
    <BrowserRouter>
      <Background />
      <MainWindow appData={appData}/>
    </BrowserRouter>
  );
}

export default App;