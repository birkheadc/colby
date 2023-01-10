export interface IDescription {
  language: string,
  content: string
}

export interface IProject {
  id: string,
  name: string,
  shortDescriptions: IDescription[],
  longDescriptions: IDescription[],
  technologies: string[],
  site: string,
  source: string,
  favoriteLive: number
}

export interface IBlurb {
id: number,
title: string,
sub_title: string,
created: Date
}

export interface IActivity {
  date: Date,
  content: IDescription[];
}

export class AppData {
  private _projects: IProject[] = [];
  private _activities: IActivity[] = [];
  private _blurbs: IBlurb[] =[];

  addProject(project: IProject): void {
      this._projects.push(project);
  }

  addProjects(projects: IProject[]): void {
      projects.forEach(project => {
          this.addProject(project)
      });
  }

  addActivity(activity: IActivity): void {
      this._activities.push(activity);
  }

  addActivities(activities: IActivity[]): void {
      activities.forEach(activity => {
          this.addActivity(activity);
      });
  }

  addBlurb(blurb: IBlurb): void {
    this._blurbs.push(blurb);
  }

  addBlurbs(blurbs: IBlurb[]): void {
    blurbs.forEach(blurb => {
      this.addBlurb(blurb);
    });
  }

  get projects(): IProject[] {
      return this._projects;
  }

  get activities(): IActivity[] {
      return this._activities;
  }

  get blurbs(): IBlurb[] {
    return this._blurbs;
  }
}