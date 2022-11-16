import * as React from 'react';
import ContactIcon from './contactIcon/ContactIcon';
import './ContactWidget.css';
import CopyIcon from './copyIcon/CopyIcon';
import MailIcon from './mailIcon/MailIcon';
import fb_icon from '../../assets/images/social-icons/facebook.png';
import gh_icon from '../../assets/images/social-icons/github.png';
import li_icon from '../../assets/images/social-icons/linkedin.png';
import { animated, useSpring } from 'react-spring';

export interface IContactIcon {
  icon: JSX.Element,
  url: string,
  key: number
}

interface IContactWidgetProps {

}

function ContactWidget(props: IContactWidgetProps): JSX.Element {

  const ICONS: IContactIcon[] = [
    {
      icon: <img alt='My Facebook' draggable='false' src={fb_icon}></img>,
      url: 'https://www.facebook.com/#!/profile.php?id=100000139877934',
      key: 0
    },
    {
      icon: <img alt='My Github' draggable='false' src={gh_icon}></img>,
      url: 'https://github.com/birkheadc',
      key: 1
    },{
      icon: <img alt='My LinkedIn' draggable='false' src={li_icon}></img>,
      url: 'https://www.linkedin.com/in/colby-birkhead',
      key: 2
    }
  ];

  const [navButtonSpring, navButtonSpringApi] = useSpring(() => ({
    from: { opacity: 0 }
  }));

  React.useEffect(() => {
    console.log('test');
    navButtonSpringApi.start({
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      },
      config: {
        duration: 300
      }
    })
  });

  return (
    <animated.div className='contact-widget-wrapper' style={navButtonSpring}>
      <h2>Contact Me</h2>
      <ul>
      {ICONS.map(
        icon =>
        <li key={'contact-icon_' + icon.key}><ContactIcon icon={icon} /></li>
      )}
      </ul>
      <div className='contact-widget-mail-wrapper'>
        <span>birkheadc@gmail.com</span>
        <div className='contact-widget-mail-copy-wrapper'><MailIcon address='birkheadc@gmail.com'/><CopyIcon text='birkheadc@gmail.com'/></div>
      </div>
    </animated.div>
  );
}

export default ContactWidget;