import type {Id} from './../interface'

import fs from 'fs'
import { resolve } from 'path'

export class Project {
    public name: string
    public owner: Id
    public description: string
    public members: Id[]
    public isPublic: boolean

    public constructor(name: string, owner: Id, description: string, members: Id[] = [], isPublic = false) {
        this.name = name
        this.owner = owner
        this.description = description
        this.members = members
        this.isPublic = isPublic

        Project.push(this)
    }

    private static readonly list: Project[] = JSON.parse(
        fs.readFileSync(
            resolve(__dirname, '/../data/projectList.json'),
            'utf-8'
        )
    )

    private static log(message: string) {
        const now = new Date()
        fs.appendFileSync(
            resolve(__dirname, '/../log/project.log'),
            `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${message}`,
            'utf-8'
        )
    }

    public static save() {
        fs.writeFileSync(
            resolve(__dirname, '/../data/projectList.json'),
            JSON.stringify(Project.list, null, 4),
            'utf-8'
        )
    }

    public static push(project: Project) {
        Project.list.push(project)
        Project.save()
        Project.log(`generate ${project.name} by ${project.owner}`)
    }

    public static pop(project: Project) {
        const index = Project.list.indexOf(project)
        if (index === -1) throw new Error('project does not exist')
        Project.list.splice(index, 1)
        Project.save()
        Project.log(`delete ${project.name} by ${project.owner}`)
    }
}