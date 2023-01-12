import * as React from 'react';
import IApiResult from '../../api/IApiResponse';
import ProjectsApi from '../../api/ProjectsApi';
import './AdminPage.css'
import CreateProjectForm from './createProjectForm/CreateProjectForm';
import LoginForm from './loginForm/LoginForm';
import LogoutForm from './logoutForm/LogoutForm';

interface IAdminPageProps {

}

function AdminPage(props: IAdminPageProps): JSX.Element {

  const [isWorking, setWorking] = React.useState<boolean>(true);
  const [isLoggedIn, setLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function checkLogIn() {
      const token = window.localStorage.getItem("SESSION_TOKEN");
      const isValid = await ProjectsApi.isTokenValid(token);
      if (isValid === true) {
        setLoggedIn(true);
      }
      setWorking(false);

    }
    checkLogIn();
  }, []);

  const login = (password: string) => {
    async function fetchToken(password: string) {
      const result: IApiResult = await ProjectsApi.fetchToken(password);
      if (result.errorCode === 0) {
        window.localStorage.setItem("SESSION_TOKEN", result.message);
        setLoggedIn(true);
      }
    }
    fetchToken(password);
  }

  const logout = () => {
    window.localStorage.removeItem("SESSION_TOKEN");
    setLoggedIn(false);
  }

  function getContents(): JSX.Element {
    if (isWorking === true) {
      return (
        <h2>Working...</h2>
      );
    }
    if (isLoggedIn === false) {
      return (
        <LoginForm handleLogin={login} />
      );
    }
    return (
      <>
      <CreateProjectForm setWorking={setWorking }/>
      <LogoutForm handleLogout={logout} />
      </>
    );
  }

  return (
    <div className='admin-page-wrapper'>
      {getContents()}
    </div>
  );
}

export default AdminPage;