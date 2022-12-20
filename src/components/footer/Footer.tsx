import * as React from 'react';
import ContactIcons from '../contact/ContactIcons';
import MailIcon from '../contact/mailIcon/MailIcon';
import './Footer.css'

interface IFooterProps {
}

function Footer(props: IFooterProps): JSX.Element | null {
  return (
    <footer>
      <ContactIcons />
      <div>
        <MailIcon address='birkheadc@gmail.com'/>
      </div>
    </footer>
  );
}

export default Footer;