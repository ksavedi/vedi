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

    public static readonly list: Project[] = JSON.parse(
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

    public static indexOf(name: string) {
        for (let i = 0; i < Project.list.length; i++) {
            if (Project.list[i].name === name) {
                return i
            }
        }
        return -1
    }

    public static has(name: string) {
        return Project.indexOf(name) !== -1
    }

    public static get(name: string) {
        if (!Project.has(name)) throw new Error('project does not exist')
        return Project.list[ Project.indexOf(name) ]
    }

    public static push(project: Project) {
        if (Project.indexOf(project.name)) throw new Error('project already exists')
        Project.list.push(project)
        Project.save()
        Project.log(`generate ${project.name} by ${project.owner}`)
    }

    public static pop(project: Project) {
        if (!Project.has(project.name)) throw new Error('project does not exist')
        const index = Project.indexOf(project.name)
        Project.list.splice(index, 1)
        Project.save()
        Project.log(`delete ${project.name} by ${project.owner}`)
    }

    public hasMember(id: Id) {
        return (
            id === this.owner
            || (
                id !== null
                && id in this.members
            )
        )
    }
}