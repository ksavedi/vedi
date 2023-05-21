import fs from 'fs'
import { resolve } from 'path'
import { type Id, directory } from '../interface/basic';

interface ProjectInfo {
    owner: Id;
    description: string;
    members: Id[];
    files: Record<string, string>;
    requests: Id[];
    isPublic: boolean;
}

class Project {
    public name: string
    public owner: Id
    public description: string
    public members: Id[]
    public files: Record<string, string>
    public requests: Id[]
    public isPublic: boolean
    public isFinished: boolean

    public constructor(name: string, owner: Id, description: string, members: Id[] = [], files: Record<string, string> = {}, requests: Id[] = [], isPublic = false, isNew = true) {
        for (const dir in files) {
            if (!dir.match(directory)) throw new Error('project files invalid directory')
        }
        
        this.name = name
        this.owner = owner
        this.description = description
        this.members = members
        this.files = files
        this.requests = requests
        this.isPublic = isPublic
        this.isFinished = false

        if (isNew) Project.push(this)
    }

    public static readonly list: Project[] = (JSON.parse(
            fs.readFileSync(
                resolve(__dirname, '../data/projectList.json'),
                'utf-8'
            )
        ) as Project[])
        .map((project) => new Project(
            project.name,
            project.owner,
            project.description,
            project.members,
            project.files,
            project.requests,
            project.isPublic,
            false
        ))

    private static log(message: string) {
        const now = new Date()
        fs.appendFileSync(
            resolve(__dirname, '../log/project.log'),
            `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${message}`,
            'utf-8'
        )
    }

    public static save() {
        fs.writeFileSync(
            resolve(__dirname, '../data/projectList.json'),
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
        if (!Project.has(name)) throw new Error('project does not exist. prevent it by using Project.has()')
        return Project.list[Project.indexOf(name)]
    }

    public static push(project: Project) {
        if (Project.has(project.name)) throw new Error('project already exists')
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
        return this.members.includes(id)
    }

    public get info(): ProjectInfo {
        return {
            owner: this.owner,
            description: this.description,
            members: this.members,
            files: this.files,
            requests: this.requests,
            isPublic: this.isPublic
        }
    }

    public set info(newInfo: ProjectInfo) {
        for (const dir in newInfo.files) {
            if (!dir.match(directory)) throw new Error('project files invalid directory')
        }
        this.owner = newInfo.owner
        this.description = newInfo.description
        this.members = newInfo.members
        this.files = newInfo.files
        this.requests = newInfo.requests
        this.isPublic = newInfo.isPublic
        Project.save()
        Project.log(`info changed at ${this.name} by ${this.owner}`)
    }
}

export { type ProjectInfo, Project }