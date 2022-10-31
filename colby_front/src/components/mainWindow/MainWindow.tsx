import * as React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import NavWrapper from '../nav/NavWrapper';
import WelcomePage from './pages/welcomePage/WelcomePage';
import './MainWindow.css'
import AboutPage from './pages/about/AboutPage';
import BlogPage from './pages/blog/BlogPage';
import ProjectsPage from './pages/projects/ProjectsPage';
import ResumePage from './pages/resume/ResumePage';

interface IMainWindowProps {

}

function MainWindow(props: IMainWindowProps) {

  const location = useLocation();

  function generateNav(): JSX.Element | null {
    if (location.pathname === '/') {
      return null;
    }
    return (
      <NavWrapper />
    );
  }

  return (
    <>
      {generateNav()}
      <main>
        <Routes>
          <Route path='/about' element={<AboutPage />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/resume' element={<ResumePage />} />
          <Route path='/' element={<WelcomePage />} />
          <Route path='*' element={<Navigate replace={true} to={{pathname: '/'}} />} />
        </Routes>
      </main>
    </>
  );
}

export default MainWindow;