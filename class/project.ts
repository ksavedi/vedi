type Batch = 19 | 20 | 21 | 22 | 23 | 24
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Id = `${Batch}-${Digit}${Digit}${Digit}`

import fs from 'fs'

const printError = (message: string) => {
    if (message) console.error(message)
}

export class Project {
    name: string
    owner: Id
    description: string
    members: Id[]
    isPublic: boolean

    constructor(name: string, owner: Id, description: string, members: Id[] = [], isPublic = false) {
        this.name = name
        this.owner = owner
        this.description = description
        this.members = members
        this.isPublic = isPublic

        Project.push(this)
    }

    static list: any[] = JSON.parse(fs.readFileSync(
        __dirname + '/../data/projectList.json',
        'utf-8'
    ))

    static log(message: string) {
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

    static push(project: Project) {
        Project.list.push(project)
        Project.save()
        Project.log(`generate ${project.name} by ${project.owner}`)
    }

    static pop(project: Project) {
        const index = Project.list.indexOf(project)
        if (index == -1) throw new Error('project does not exist')
        Project.list.splice(index, 1)
        Project.save()
        Project.log(`delete ${project.name} by ${project.owner}`)
    }
}