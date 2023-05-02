/** 
 * @typedef {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} singleNum
 * @typedef {`${singleNum}${singleNum}-${singleNum}${singleNum}${singleNum}`} id
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function printError(message) {
    if (message) console.error(message)
}

export class Project {
    /** @type {Project[]} */
    static list = JSON.parse(fs.readFileSync(
        __dirname + '/../data/projectList.json',
        'utf-8'
    ))

    /** @param {string} message */
    static log(message) {
        const now = new Date()
        fs.appendFileSync(
            __dirname + '/../log/project.log',
            `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${message}`,
            'utf-8'
        )
    }

    static save() {
        fs.writeFileSync(
            __dirname + '/../data/projectList.json',
            JSON.stringify(Project.list, null, 4),
            'utf-8'
        )
    }

    /** @param {Project} project */
    static push(project) {
        Project.list.push(project)
        Project.save()
        Project.log(`generate ${project.name} by ${project.owner}`)
    }

    /** @param {Project} project */
    static pop(project) {
        const index = Project.list.indexOf(project)
        if (index == -1) throw new Error('project does not exist')
        Project.list.pop(Project.list.indexOf(project))
        Project.save()
        Project.log(`delete ${project.name} by ${project.owner}`)
    }

    /**
     * @param {string} name 
     * @param {id} owner 
     * @param {string} description
     * @param {id[]} members 
     * @param {boolean} isPublic 
     */
    constructor(name, owner, description, members = [], isPublic = false) {
        this.name = name
        this.owner = owner
        this.description = description
        this.members = members
        this.isPublic = isPublic

        Project.push(this)
    }
}