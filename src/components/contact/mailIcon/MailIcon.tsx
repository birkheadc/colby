import * as React from 'react';
import './MailIcon.css';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

interface IMailIconProps {
  address: string
}
function MailIcon(props: IMailIconProps): JSX.Element {
  return (
    <span className='mail-copy-link'><a draggable='false' href={'mailto:' + props.address}><EnvelopeIcon /></a></span>
  );
}

export default MailIcon;