import * as React from 'react';
import { IContactIcon } from '../ContactWidget';
import './ContactIcon.css';


interface IContactIconProps {
  icon: IContactIcon
}
function ContactIcon(props: IContactIconProps): JSX.Element {
  return (
    <a className='icon-link' draggable='false' href={props.icon.url} target='_blank' rel='noreferrer'>{props.icon.icon}</a>
  );
}

export default ContactIcon;