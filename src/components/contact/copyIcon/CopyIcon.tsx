import * as React from 'react';
import './CopyIcon.css';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

interface ICopyIconProps {
  text: string
}
function CopyIcon(props: ICopyIconProps): JSX.Element {
  return (
    <span className='mail-copy-link' draggable='false' onClick={() => navigator.clipboard.writeText('birkheadc@gmail.com')} title={"Copy '" + props.text + "' to clipboard"}><button><ClipboardDocumentIcon /></button></span>
  );
}

export default CopyIcon;