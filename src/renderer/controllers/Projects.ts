import {
  existsSync, 
  mkdirSync,
  copyFileSync
} from 'fs';
import { exec } from 'child_process';

import DBCProject from '../../interfaces/DBCProject';

export default class Projects {
  private _projects: Array<DBCProject>;
  private _working: DBCProject;

  constructor() {
    this._projects = window
      .store
      .get<any, Array<DBCProject>>('projects') || [];
    this._working = this.projects
      .find(p => p.working === true);
  }

  get projects() {
    return this._projects;
  }

  get working() {
    return this._working;
  }

  set working(project: DBCProject) {
    this._working = project;
  }

  create(name: string, path: string): Promise<void | string> {
    return new Promise((resolve, reject) => {
      path = path.replace(/\\/g, '/');

      if (!existsSync(path)) return reject(
        'INVALID_PATH'
      );
  
      const realPath = path + '/' + name;
  
      if (existsSync(realPath)) return reject(
        'PATH_ALREADY_IN_USE'
      );
      if (this.projects.find(p => p.name === name)) {
        const project = this.projects.find(p => p.name === name);
        if (existsSync(project.path)) return reject(
          'PROJECT_ALREADY_EXISTS'
        );
        else this.remove(project.name);
      }
  
      mkdirSync(realPath);
      copyFileSync(
        './node_modules/@discord-bot-creator/bot/bot.js',
        realPath + '/bot.js'
      );
      copyFileSync( 
        './node_modules/@discord-bot-creator/bot/storage.json',
        realPath + '/storage.json'
      );
      copyFileSync(
        './node_modules/@discord-bot-creator/bot/package.json',
        realPath + '/package.json'
      );
      
      exec(
        `"${window.env.DBC_NPM_PATH}" install`,
        {
          cwd: realPath
        },
        (err) => {
          if (
            err || 
            !existsSync(realPath + '/node_modules')
          ) return reject(
            'FAILED_TO_INSTALL_PROJECT_DEPENDENCIES'
          );

          if (this.working) {
            this.edit(
              this.working.name, 
              {
                working: false
              }
            );
          }

          const newProject = {
            name,
            path: realPath,
            working: true
          };

          this.projects.push(newProject);
          this.working = newProject;
          
          window.store.set(
            'projects',
            this.projects
          );

          resolve();
        }
      );
    });
  }

  edit(name: string, options: {
    name?: string;
    path?: string;
    working?: boolean;
  }): void | string {
    const project = this.projects.find(p => p.name === name);
    if (!project) return 'NON_EXISTENT_PROJECT';

    this.projects[this.projects.indexOf(project)] = {
      name: options.name !== undefined ? 
        options.name : 
        project.name,
      path: options.path !== undefined ? 
        options.path : 
        project.path,
      working: options.working !== undefined ? 
        options.working : 
        project.working
    };

    window.store.set(
      'projects',
      this.projects
    );
  }

  remove(name: string): void | string {
    const project = this.projects.find(p => p.name === name);
    if (!project) return 'NON_EXISTENT_PROJECT';

    this.projects.splice(
      this.projects.indexOf(project)
    );

    window.store.set(
      'projects',
      this.projects
    );
  }
}
