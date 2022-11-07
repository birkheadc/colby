import * as React from 'react';
import './ResumePage.css'

interface IResumePageProps {

}

function ResumePage(props: IResumePageProps) {
  return (
    <div className='main-content-wrapper'>
      <div className='resume-wrapper'>
        <h1>Resume</h1>
        <div className='resume-pdf-link'>
          <a href='/resume/resume_en_swe.pdf' target='_blank' rel='noreferrer'>View Printable PDF</a>
        </div>
        <div className='resume-body'>

          <h2>Colby Birkhead</h2>
          <p>
            American expat and small business manager looking to return home and change gears. Developed software for use
            in production and advertising. Quick and eager to learn new languages and frameworks, driven to apply best
            practices and design clean code. Skilled at adapting to new and changing environments. Comfortable in many
            programming languages, as well as natural ones. Fully fluent in Japanese, conversationally fluent in Korean.
          </p>

          <section>
            <h3>Education</h3>
            <ul>
              <li>
                <h4>Nagoya University</h4>
                <h5>Spring 2013 — Spring 2017</h5>
                <ul className='resume-body-list'>
                  <li>Bachelor of Arts in Linguistics</li>
                  <li>Full-ride scholarship student</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h3>Career</h3>
            <ul>
              <li>
                <h4>Retail Manager</h4>
                <h5>Spring 2017 — Present</h5>
                <ul className='resume-body-list'>
                  <li>Foreign grocery store in South Korea</li>
                  <li>Developed and maintained applications to assist with daily duties</li>
                </ul>
              </li>
              <li>
                <h4>Cashier</h4>
                <h5>Fall 2016 — Spring 2017</h5>
                <ul className='resume-body-list'>
                  <li>Part-time job at a convenience store in Nagoya, Japan</li>
                </ul>
              </li>
              <li>
                <h4>Brake Press Operator</h4>
                <h5>Summer 2010 — Spring 2012</h5>
                <ul className='resume-body-list'>
                  <li>Sunlight Supply Inc. in Woodland WA, USA</li>
                  <li>Quality Control and Shift Second</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h3>Skills</h3>
            <ul>
              <li>
                <h4>Full Stack Web Development</h4>
                <ul className='resume-body-list'>
                  <li>4+ years experience creating applications for my own and other businesses</li>
                  <li>Front: HTML5 - CSS - JavaScript - TypeScript - Node - React</li>
                  <li>Back: C# / ASP.NET - Java / Spring - Ruby / Rails - Postgres / MySql / SQLite</li>
                  <li>Comfortable with many technologies: Linux - Bash - Git - Docker</li>
                </ul>
              </li>
              <li>
                <h4>Game Development</h4>
                <ul className='resume-body-list'>
                  <li>5+ years experience with Unity and Unreal Engine 4</li>
                  <li>Built peer-to-peer as well as dedicated-server multiplayer games</li>
                </ul>
              </li>
              <li>
                <h4>Human Languages</h4>
                <ul className='resume-body-list'>
                  <li>English: Native</li>
                  <li>Japanese: Fully fluent; 10+ years</li>
                  <li>Korean: Conversationally fluent; 5+ years</li>
                </ul>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
    
  );
}

export default ResumePage;