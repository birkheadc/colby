# Colby's Homepage

The latest iteration of my homepage, I've decided to go back to the drawing board and come up with an entirely new design and direction, so I'm rebuilding from scratch.

# Focus

My main focus with this project is to create a visually impressive webpage. With my latest projects, I've mostly been focused on writing solid source code; code that another developer might be able to appreciate (hopefully). But nothing I've made so far would impress a random visitor to my site. That is what I hope to change with this version of my homepage.

Tangent to this goal, I'll also be focusing on animation, which is also something I've mostly glazed over until now.

# The Code

## Getting away form `create-react-app`

This app was *not* created with `create-react-app`. Lately I've been focused on building my own React applications "by hand", and I've found doing so to be far easier, as well as far more rewarding, than I expected.

The basic steps I use go as follows:

  - Create `package.json` via `npm --init`. Follow the prompt.
  - Create the following entry files and directories:
    - `index.html` inside `public`
    - `App.tsx` inside `src` (as well as `App.css` if wanted)
    - `index.tsx` (as well as `index.css` and `vars.css` if wanted)
    - `README.md` and `TODO.md` if wanted
  - Install necessary node packages.
    - Dev Dependencies: `npm install --save-dev package-a package-b ...`
    - Otherwise: `npm install package-y package-z ...`
  - Create `webpack.config.js`
    - Some of the settings in this config file were found via trial and error and I've mostly forgotten what they do!
    - In the `module` section, make sure to add rules for .ts / .tsx files if using typescript. Also add rules for .css or stylesheets will not load properly.
  - Create `.babelrc` and add babel presets as shown.
  - Add a few scripts to package.json:
  ```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server .",
    "build": "webpack ."
  },
  ```
  - Create and render root in `index.tsx`:
  ```
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import './vars.css';

import App from './src/App';


const container = document.getElementById('root');
if (container != null) {
  const root = createRoot(container);
  root.render(<App />);
}
  ```

 - Run `npm run start` and the dev server should come up!

# Asset Credits

- Background Photo by Aleksandar Pasaric: https://www.pexels.com/photo/dark-starry-sky-1694000/