import * as React from 'react';
import { IContactIcon } from '../ContactWidget';
import './ContactIcon.css';


interface IContactIconProps {
  icon: IContactIcon
}
function ContactIcon(props: IContactIconProps): JSX.Element {
  return (
    <a className='icon-link' draggable='false' href={props.icon.url} target='_blank' rel='noreferrer'><img alt={props.icon.alt} draggable='false' src={props.icon.src}></img></a>
  );
}

export default ContactIcon;