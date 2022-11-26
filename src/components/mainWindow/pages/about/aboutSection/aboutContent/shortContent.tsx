import * as React from 'react';
import image01 from '../../../../../../assets/images/me/me02.png';
import image02 from '../../../../../../assets/images/about/h.jpg';
import image03 from '../../../../../../assets/images/about/d.jpg';
import image04 from '../../../../../../assets/images/about/i.jpg';
import image05 from '../../../../../../assets/images/about/j.jpg';
import { IAboutSectionData } from "./AboutPageContent";

const SHORT_CONTENT: IAboutSectionData[] = [
  {
    image: <img src={image01}></img>,
    text: [
      "Welcome. My name is Colby Birkhead. I'm an American expat, currently lost somewhere far from home, but looking for a chance to return.",
      "I study languages and write code. Lately I've been focusing on web development. This site's main purpose is to feature some of what I do."
    ]
  },
  {
    image: <img src={image02}></img>,
    text: [
      "After high school, I somehow got into studying Japanese.",
      "Eventually that led me to receiving a scholarship from the Japanese government; to move to Japan and attend university there.",
      "By the end of my stay, I'd earned a Bachelor of Arts in Linguistics from Nagoya University."
    ]
  },
  {
    image: <img src={image03}></img>,
    text: [
      "After graduating, I moved to South Korea to live with my fiance.",
      "We got married, opened a small business together, and started a family.",
      "We work with other international residents, which gives me a chance to practice speaking multiple languages."
    ]
  },
  {
    image: <img src={image04}></img>,
    text: [
      "In the meantime, I've gotten back into programming. It's something I've done in one form or another most of my life, but had fallen out of habit recently.",
      "My current lifestyle gives me a lot of downtime, which I spend learning computer science and writing code.",
      "My goal is to head back home to the States and find work as a junior developer sometime soon."
    ]
  },
  {
    image: <img src={image05}></img>,
    text: [
      "So please, check out the rest of my site, browse my listed projects. ",
      "If you want to contact me, feel free to connect with me at one of my socials, or send me an email.",
      "Thanks for reading."
    ]
  },
];

export default SHORT_CONTENT;