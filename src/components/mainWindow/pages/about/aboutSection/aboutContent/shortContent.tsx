import * as React from 'react';
import image01 from '../../../../../../assets/images/me/me02.png';
import { IAboutSectionData } from "./AboutPageContent";

const SHORT_CONTENT: IAboutSectionData[] = [
  {
    image: <img src={image01}></img>,
    text: [
      "That's me, Colby Birkhead. Or at least, it was me almost 10 years ago. I really need to find some more recent photos. Also something with a few more pixels.",
      "Thanks for visiting my site. I hope you enjoy your stay. Use the hamburger icon up above to open the nav, or continue scrolling to learn who I am and what I do."
    ]
  },
  {
    image: <img src={image01}></img>,
    text: [
      "I'm an American expat currently living abroad, but looking to return sometime soon.",
      "I taught myself Japanese after high school, which eventually led to me earning a scholarship to live and study in Japan.",
      "My stay there ended with me receiving a Bachelor of Arts in linguistics from Nagoya University."
    ]
  },
  {
    image: <img src={image01}></img>,
    text: [
      "After graduating, I moved to South Korea to live with my fiance.",
      "We got married, opened a small business together, and started a family.",
    ]
  },
  {
    image: <img src={image01}></img>,
    text: [
      "In the meantime, I've gotten back into programming. It's something I've done in one form or another most of my life, but had fallen out of habit recently.",
      "My goal is to head back home and start work as a junior developer sometime soon."
    ]
  },
  {
    image: <img src={image01}></img>,
    text: [
      "So please, check out the rest of my site, browse my listed projects.",
      "If you want to contact me, feel free to connect with me at one of my socials, or send me an email.",
      "Thanks for reading."
    ]
  },
];

export default SHORT_CONTENT;