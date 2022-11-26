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
          <a href='https://resume.birkheadc.me/resume_en_swe.pdf' target='_blank' rel='noreferrer'>View Printable PDF</a>
        </div>
        <div className='resume-body'>

          <h2>Colby Birkhead</h2>
          <p>
            American expat and small business manager looking to return home and change gears. Developed software for use
            in production and advertising. Quick and eager to learn new languages and frameworks, driven to apply best
            practices and write clean code. Skilled at adapting to new and changing environments. Comfortable in many
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
                  <li>Full-ride MEXT scholarship student</li>
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
                  <li>Managed a foreign grocery store in South Korea</li>
                  <li>Developed and maintained applications to assist with daily duties, including a book-keeping application that now automates what used to be over 100 hours of work a year</li>
                </ul>
              </li>
              <li>
                <h4>Cashier</h4>
                <h5>Fall 2016 — Spring 2017</h5>
                <ul className='resume-body-list'>
                  <li>Part-time at convenience store in Nagoya, Japan</li>
                  <li>Worked with proprietary software to make orders, manage inventory, and finalize sales</li>
                </ul>
              </li>
              <li>
                <h4>Brake Press Operator</h4>
                <h5>Summer 2010 — Spring 2012</h5>
                <ul className='resume-body-list'>
                  <li>Sunlight Supply Inc. in Woodland WA, USA</li>
                  <li>Quality Control and Shift Second</li>
                  <li>Designed operation instructions for forming prototypes and first-run products</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h3>Projects</h3>
            <ul>
              <li>
                <h4>Book-keeper</h4>
                <ul>
                  <li>Full stack web application that facilitates recording and searching daily sales totals</li>
                  <li>Greatly improves speed and accuracy of making records</li>
                  <li> Automatically generates weekly / monthly totals and averages</li>
                </ul>
              </li>
              <li>
                <h4>My Homepage Suite</h4>
                <ul>
                  <li>Calls a number of custom APIs to automatically generate content</li>
                  <li>Dynamically scales to fit mobile or desktop screens</li>
                  <li>Fully animated through react-spring and css</li>
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