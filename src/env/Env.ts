export interface IEnv {
  PROJECTS_URL: string,
  BLOG_URL: string
}

export const Env: IEnv = {
  PROJECTS_URL: process.env.REACT_APP_PROJECTS_URL || '',
  BLOG_URL: process.env.REACT_APP_BLOG_URL || ''
}