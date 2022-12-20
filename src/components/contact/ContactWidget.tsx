import * as React from 'react';
import './ContactWidget.css';
import CopyIcon from './copyIcon/CopyIcon';
import MailIcon from './mailIcon/MailIcon';
import { animated, useSpring } from 'react-spring';
import ContactIcons from './ContactIcons';

export interface IContactIcon {
  icon: JSX.Element,
  url: string,
  key: number
}

interface IContactWidgetProps {
  
}

function ContactWidget(props: IContactWidgetProps): JSX.Element {
  return (
    <div className='contact-widget-wrapper'>
      <h2>Contact Me</h2>
      <ContactIcons />
      <div className='contact-widget-mail-wrapper'>
        <span>birkheadc@gmail.com</span>
        <div className='contact-widget-mail-copy-wrapper'><MailIcon address='birkheadc@gmail.com'/><CopyIcon text='birkheadc@gmail.com'/></div>
      </div>
    </div>
  );
}

export default ContactWidget;