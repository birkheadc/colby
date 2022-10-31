import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import './fonts.css';
import './vars.css';

import App from './src/App';
import FontAwesomeInit from './src/fontAwesome/FontAwesomeInit';

FontAwesomeInit();
const container = document.getElementById('root');
if (container != null) {
  const root = createRoot(container);
  root.render(<App />);
}