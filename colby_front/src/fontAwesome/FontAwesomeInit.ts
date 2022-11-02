// This function simply builds the applications 'library' of Font Awesome icons.
// FontAwesomeInit() should be called in index.tsx before rendering the App.
// To add an icon to the libray, add the name of the icon in TWO places:
// First, in the import method.
// Second, in the call to library.add().

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHouse, 
  faAddressCard,
  faDiagramProject,
  faBars,
  faFile,
  faDiamond,
  faBlog,
  faEnvelope,
  faBoxOpen,
  // ADD ICON NAME HERE

} from '@fortawesome/free-solid-svg-icons';

function FontAwesomeInit():void {
  library.add(faHouse, faAddressCard, faDiagramProject, faBars, faFile, faDiamond, faBlog, faEnvelope, faBoxOpen /*ADD ICON NAME HERE*/ );
}

export default FontAwesomeInit;