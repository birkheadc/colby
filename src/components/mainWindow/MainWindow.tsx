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
import RemoveTrailingSlash from '../removeTrailingSlash/RemoveTrailingSlash';
import Footer from '../footer/Footer';
import MainWrapper from './MainWrapper';

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
      <RemoveTrailingSlash />
      <animated.main style={spring}>
        <Routes>
          <Route path='/about' element={<MainWrapper contents={<AboutPage />}/>} />
          <Route path='/blog' element={<MainWrapper contents={<BlogPage blurbs={props.appData?.blurbs}/>} />} />
          <Route path='/projects' element={<MainWrapper contents={<ProjectsPage projects={props.appData?.projects}/>} />} />
          <Route path='/resume' element={<MainWrapper contents={<ResumePage />} />} />
          <Route path='/' element={<WelcomePage />} />
          <Route path='*' element={<Navigate replace={true} to={{pathname: '/'}} />} />
        </Routes>
      </animated.main>
    </>
  );
}

export default MainWindow;