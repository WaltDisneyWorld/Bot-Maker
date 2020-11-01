import { readJSON, readFileSync, writeFileSync } from 'fs-extra'

import DBCProject from '../../interfaces/DBCProject'
import DBCBotStorage from '../../interfaces/DBCBotStorage'
import DBCBotConfig from '../../interfaces/DBCBotConfig'

import { Projects } from './'

export default class Bot {
  projectName: string

  constructor (projectName: string) {
    this.projectName = projectName
  }

  async getProject (): Promise<DBCProject> {
    return (await Projects.get()).find(async (p) => p.name === this.projectName)
  }

  async getStorage (): Promise<DBCBotStorage> {
    return await readJSON((await this.getProject()).path + '/storage.json')
  }

  editConfig (options: DBCBotConfig): Promise<void> {
    return new Promise(async (resolve) => {
      const storage = await this.getStorage()
      storage.config.avatar = options.avatar || storage.config.avatar
      storage.config.description =
        options.description || storage.config.description
      storage.config.owners = options.owners || storage.config.owners
      storage.config.token = options.token || storage.config.token
      storage.config.prefix = options.prefix || storage.config.prefix
      storage.config.caseSensitive =
        options.caseSensitive || storage.config.caseSensitive
      writeFileSync(
        (await this.getProject()).path + '/storage.json',
        JSON.stringify(storage, null, 2)
      )
      resolve()
    })
  }
}
