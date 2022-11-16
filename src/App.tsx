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

  const [appData, setAppData] = React.useState<AppData>();

  React.useEffect(() => {
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