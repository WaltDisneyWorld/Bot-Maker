import { pathExists, mkdir, copy } from 'fs-extra'
import { exec } from 'child_process'

import DBCProject from '../../interfaces/DBCProject'

import { Bot } from './'

export default class Projects {
  static async get (): Promise<Array<DBCProject>> {
    return await window.DBC.store.get('projects') || []
  }

  static async getWorking (): Promise<DBCProject> {
    const projects = await this.get()
    if (projects.find((p) => p.working === true)) {
      const workingProject = projects.find((p) => p.working === true)
      if (await pathExists(workingProject.path)) return workingProject
      else await this.remove(workingProject.name)
    }
  }

  static create (avatarURL: string, name: string, description: string, path: string, progess?: any): Promise<void | string> {
    return new Promise(async (resolve, reject) => {
      if (!await pathExists(path)) return reject('INVALID_PATH')

      const projects = await this.get()
      const realPath = path + '/' + name

      if (await pathExists(realPath)) return reject('PATH_ALREADY_IN_USE')
      if (projects.find((p) => p.name === name)) {
        const project = projects.find((p) => p.name === name)
        if (await pathExists(project.path)) return reject('PROJECT_ALREADY_EXISTS')
        else await this.remove(project.name)
      }

      progess('Copying project files... (50%)')

      await mkdir(realPath)
      await copy(
        window.DBC.env.DBC_APP_PATH +
          '/node_modules/@discord-bot-creator/bot/bot.js',
        realPath + '/bot.js'
      )
      await copy(
        window.DBC.env.DBC_APP_PATH +
          '/node_modules/@discord-bot-creator/bot/storage.json',
        realPath + '/storage.json'
      )
      await copy(
        window.DBC.env.DBC_APP_PATH +
          '/node_modules/@discord-bot-creator/bot/package.json',
        realPath + '/package.json'
      )

      progess('Downloading dependencies... (90%)')
      
      exec(
        `"${window.DBC.env.DBC_NPM_PATH}" install`,
        {
          cwd: realPath
        },
        async (err) => {
          if (err || !await pathExists(realPath + '/node_modules'))
            return reject('FAILED_TO_INSTALL_PROJECT_DEPENDENCIES')

          const workingProject = await this.getWorking()
          if (workingProject) {
            await this.edit(workingProject.name, {
              working: false
            })
          }

          projects.push({
            name,
            path: realPath,
            working: true
          })
          window.DBC.store.set('projects', projects)

          await new Bot(name).editConfig({
            avatar: avatarURL,
            description: description
          })

          progess('All finished! (100%)')
          setTimeout(() => resolve(), 1000)
        }
      )
    })
  }

  static async edit (name: string, options: DBCProject): Promise<void | string> {
    const projects = await this.get()
    const project = projects.find((p) => p.name === name)
    if (!project) return 'NON_EXISTENT_PROJECT'
    projects[projects.indexOf(project)] = {
      name: options.name || project.name,
      path: options.path || project.path,
      working: options.working || project.working
    }
    window.DBC.store.set('projects', projects)
  }

  static async remove (name: string): Promise<void | string> {
    const projects = await this.get()
    const project = projects.find((p) => p.name === name)
    if (!project) return 'NON_EXISTENT_PROJECT'
    projects.splice(projects.indexOf(project))
    window.DBC.store.set('projects', projects)
  }
}
