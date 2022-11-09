import * as React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import NavWrapper from '../nav/NavWrapper';
import WelcomePage from './pages/welcomePage/WelcomePage';
import './MainWindow.css'
import AboutPage from './pages/about/AboutPage';
import BlogPage from './pages/blog/BlogPage';
import ProjectsPage from './pages/projects/ProjectsPage';
import ResumePage from './pages/resume/ResumePage';
import SandboxPage from './pages/sandbox/SandboxPage';
import { animated, useSpring } from 'react-spring';
import { AppData } from '../../api/AppData';

interface IMainWindowProps {
  appData: AppData | undefined
}

function MainWindow(props: IMainWindowProps) {

  const location = useLocation();

  const [spring, springApi] = useSpring(() => ({

  }));

  React.useEffect(() => {
    springApi.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 1000 }
    })
  }, [location]);

  function displayNav(): JSX.Element | null {
    if (location.pathname === '/') {
      return null;
    }
    return (
      <NavWrapper />
    );
  }

  return (
    <>
      {displayNav()}
      <animated.main style={spring}>
        <Routes>
          <Route path='/about' element={<AboutPage />} />
          <Route path='/blog' element={<BlogPage blurbs={props.appData?.blurbs}/>} />
          <Route path='/projects' element={<ProjectsPage projects={props.appData?.projects}/>} />
          <Route path='/resume' element={<ResumePage />} />
          <Route path='sandbox' element={<SandboxPage />}/>
          <Route path='/' element={<WelcomePage />} />
          <Route path='*' element={<Navigate replace={true} to={{pathname: '/'}} />} />
        </Routes>
      </animated.main>
    </>
  );
}

export default MainWindow;