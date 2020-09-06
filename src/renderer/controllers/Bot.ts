import { readFileSync, writeFileSync } from 'fs';

import { Projects } from './';

import DBCProject from '../../interfaces/DBCProject';
import DBCBotStorage from '../../interfaces/DBCBotStorage';
import DBCBotConfig from '../../interfaces/DBCBotConfig';

export default class Bot {
  private _project: DBCProject;

  constructor(projectName: string) {
    this._project = new Projects().projects
      .find(p => p.name === projectName);
  }

  get project() {
    return this._project;
  }

  get storage(): DBCBotStorage {
    return JSON.parse(
      readFileSync(
        this.project.path + '/storage.json', 
        'utf-8'
      )
    );
  }

  editConfig(options: DBCBotConfig): Promise<void> {
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
