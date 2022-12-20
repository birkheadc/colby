import * as React from 'react';
import './ContactIcons.css';
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
      alt: 'My Facebook',
      src: fb_icon,
      url: 'https://www.facebook.com/#!/profile.php?id=100000139877934',
      key: 0
    },
    {
      alt: 'My Github',
      src: gh_icon,
      url: 'https://github.com/birkheadc',
      key: 1
    },{
      alt: 'My LinkedIn',
      src: li_icon,
      url: 'https://www.linkedin.com/in/colby-birkhead',
      key: 2
    }
  ];
  
  return (
    <ul className='contact-icons-list'>
      {ICONS.map(
        icon =>
        <li key={'contact-icon_' + icon.key}><ContactIcon icon={icon} /></li>
      )}
    </ul>
  );
}

export default ContactIcons;