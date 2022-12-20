import * as React from 'react';
import ContactIcon from './contactIcon/ContactIcon';
import { IContactIcon } from './ContactWidget';
import fb_icon from '../../assets/images/social-icons/facebook.png';
import gh_icon from '../../assets/images/social-icons/github.png';
import li_icon from '../../assets/images/social-icons/linkedin.png';

interface IContactIconsProps {

}

function ContactIcons(props: IContactIconsProps): JSX.Element {

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
  
  return (
    <ul>
      {ICONS.map(
        icon =>
        <li key={'contact-icon_' + icon.key}><ContactIcon icon={icon} /></li>
      )}
    </ul>
  );
}

export default ContactIcons;