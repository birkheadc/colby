import LONG_CONTENT from './longContent';
import SHORT_CONTENT from './shortContent';

export interface IAboutSectionData {
  image: JSX.Element,
  text: string[]
}

const ABOUT_CONTENT = {
  SHORT_CONTENT,
  LONG_CONTENT
}

export default ABOUT_CONTENT;