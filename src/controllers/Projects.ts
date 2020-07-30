const { 
  existsSync, 
  mkdirSync,
  copyFileSync
} = window.require('fs');
const { exec } = window.require('child_process');

export interface Project {
  name: string;
  path: string;
  working: boolean;
}

export class Projects {
  static get(): Array<Project> {
    return window.store.get('projects') || [];
  }
  
  static async create(name: string, path: string): Promise<void | string> {
    return new Promise((resolve, reject) => {
      path = path.replace(/\\/g, '/');

      if (!existsSync(path)) reject(
        'INVALID_PATH'
      );
  
      const realPath = path + '/' + name;
  
      if (existsSync(realPath)) reject(
        'PATH_ALREADY_IN_USE'
      );
      if (
        this.get().find(p => p.name === name)
      ) {
        if (existsSync(realPath)) reject(
          'PROJECT_ALREADY_EXISTS'
        );
        this.remove(name);
      }
  
      mkdirSync(realPath);
      copyFileSync(
        window.env.DBC_PUBLIC_PATH + '/assets/bot/bot.js',
        realPath + '/bot.js'
      );
      copyFileSync( 
        window.env.DBC_PUBLIC_PATH + '/assets/bot/storage.json',
        realPath + '/storage.json'
      );
      copyFileSync(
        window.env.DBC_PUBLIC_PATH + '/assets/bot/package.json',
        realPath + '/package.json'
      );
      
      exec(
        `"${window.env.DBC_NPM_PATH}" install`,
        {
          cwd: realPath
        },
        (err: string) => {
          if (
            err || 
            !existsSync(realPath + '/node_modules')
          ) reject('FAILED_TO_INSTALL_PROJECT_DEPENDENCIES');
          
          if (this.working) {
            this.edit(
              this.working.name, 
              { working: false }
            );
          }
          
          const projects = this.get();
          projects.push({
            name,
            path: realPath,
            working: true
          });
        
          window.store.set(
            'projects',
            projects
          );

          resolve();
        }
      );
    });
  }

  static edit(name: string, options: {
    name?: string;
    path?: string;
    working?: boolean;
  }) {
    const projects = this.get();
    const project = projects.find(p => p.name === name);
    if (!project) return 'NON_EXISTENT_PROJECT';

    projects[projects.indexOf(project)] = {
      name: options.name !== undefined ? options.name : project.name,
      path: options.path !== undefined ? options.path : project.path,
      working: options.working !== undefined ? options.working : project.working
    };

    window.store.set(
      'projects',
      projects
    );
  }

  static remove(name: string): void | string {
    const projects = this.get();
    const project = projects.find(p => p.name === name);
    if (!project) return 'NON_EXISTENT_PROJECT';

    projects.splice(
      projects.indexOf(project)
    );

    window.store.set(
      'projects',
      projects
    );
  }

  static get working() {
    return this.get().find(p => p.working === true);
  }
}
