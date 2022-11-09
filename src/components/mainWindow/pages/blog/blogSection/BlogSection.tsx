import * as React from 'react';
import { IBlurb } from '../../../../../api/AppData';
import './BlogSection.css'

interface IBlogSectionProps {
  blurb: IBlurb
}

function BlogSection(props: IBlogSectionProps): JSX.Element {

  function displaySubtitle(): JSX.Element | null {
    if (props.blurb.sub_title) {
      return <h3>{props.blurb.sub_title}</h3>
    }
    return null;
  }

  return (
    <div className='blog-section-wrapper'>
      <h2>{props.blurb.title}</h2>
      {displaySubtitle()}
      <h4>{props.blurb.created.toString().substring(0, 10)}</h4>
      <a href={'https://blog.birkheadc.me/articles/' + props.blurb.id} target='_blank' rel='noreferrer'>Read Here</a>
    </div>
  );
}

export default BlogSection;