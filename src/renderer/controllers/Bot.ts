import { readFileSync, writeFileSync } from 'fs';

import { Projects } from './';

import Project from '../../interfaces/Project';
import BotStorage from '../../interfaces/BotStorage';
import BotConfig from '../../interfaces/BotConfig';

export default class Bot {
  private _project: Project;

  constructor(projectName: string) {
    this._project = new Projects().projects
      .find(p => p.name === projectName);
  }

  get project() {
    return this._project;
  }

  get storage(): BotStorage {
    return JSON.parse(
      readFileSync(
        this.project.path + '/storage.json', 
        'utf-8'
      )
    );
  }

  editConfig(options: BotConfig): Promise<void> {
    return new Promise(resolve => {
      this.storage.config.avatar = 
        options.avatar || 
        this.storage.config.avatar;
      this.storage.config.description = 
        options.description || 
        this.storage.config.description;
      this.storage.config.owners = 
        options.owners || 
        this.storage.config.owners;
      this.storage.config.token = 
        options.token || 
        this.storage.config.token;
      this.storage.config.prefix = 
        options.prefix || 
        this.storage.config.prefix;
      this.storage.config.caseSensitive = 
        options.caseSensitive || 
        this.storage.config.caseSensitive;
  
      writeFileSync(
        this.project.path + '/storage.json',
        JSON.stringify(this.storage, null, 2)
      );

      resolve();
    });
  }
}