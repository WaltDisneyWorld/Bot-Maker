import { Projects } from './Projects';

const { readFileSync, writeFileSync } = window.require('fs');

export interface BotStorage {
  commands: Array<BotCommand>;
  events: Array<BotEvent>;
  config: BotConfig;
}

export interface BotCommand {
  name: string;
  description?: string;
  aliases?: Array<string>;
  actions: Array<{
    name: string;
    fields: Array<{
      id: string;
      value: string;
    }>;
  }>;
}

export interface BotEvent {
  name: string;
  type: string;
  outputs?: Array<string>;
  actions: Array<{
    name: string;
    fields: Array<{
      id: string;
      value: string;
    }>;
  }>;
}

export interface BotPackage {
  avatar: string;
  description: string;
}

export interface BotConfig {
  owners: Array<string>;
  token: string;
  prefix: string;
  useLowerCase: boolean;
}

export class Bot {
  static get project() {
    return Projects.working;
  }

  static get package(): BotPackage {
    return JSON.parse(
      readFileSync(
        this.project.path + '/package.json', 
        'utf-8'
      )
    );
  }

  // eslint-disable-next-line getter-return
  static get storage(): BotStorage {
    if (this.project) {
      const storage = JSON.parse(
        readFileSync(
          this.project.path + '/storage.json', 
          'utf-8'
        )
      );
      return storage;
    }
  }
  
  static editConfig(options: {
    owners?: Array<string>;
    token?: string;
    prefix?: string;
    useLowerCase?: boolean;
  }): Promise<void> {
    return new Promise(resolve => {
      const storage = this.storage;
      const config = storage.config;
      
      config.owners = options.owners || config.owners;
      config.token = options.token || config.token;
      config.prefix = options.prefix || config.prefix;
      config.useLowerCase = options.useLowerCase || config.useLowerCase;
  
      storage.config = config;
  
      writeFileSync(
        this.project.path + '/storage.json',
        JSON.stringify(storage, null, 2)
      );

      resolve();
    });
  }

  static editPackage(options: {
    avatar?: string;
    description?: string;
  }): Promise<void> {
    return new Promise(resolve => {
      const _package = this.package;

      _package.avatar = options.avatar || _package.avatar;
      _package.description = options.description || _package.description;

      writeFileSync(
        this.project.path + '/package.json',
        JSON.stringify(_package, null, 2)
      );

      resolve();
    });
  }
}
