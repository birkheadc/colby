import * as React from 'react';
import { IBlurb } from '../../../../api/AppData';
import { Env } from '../../../../env/Env';
import Loading from '../../../loading/Loading';
import Slider from '../../../slider/Slider';
import './BlogPage.css'
import BlogSection from './blogSection/BlogSection';

interface IBlogPageProps {
  blurbs: IBlurb[] | undefined
}

function BlogPage(props: IBlogPageProps) {

  if (props.blurbs == null) return <Loading />;

  return (
    <div className='main-content-wrapper'>
      <div className='blogs-wrapper'>
        <h1>Blog</h1>
        <a href={Env.BLOG_URL} target='_blank' rel='noreferrer'>Visit Blog</a>
        <Slider interval={5000}>
          {props.blurbs.map(
            blurb =>
            <BlogSection key={blurb.id} blurb={blurb}/>
          )}
        </Slider>
      </div>
    </div>
  );
}

export default BlogPage;