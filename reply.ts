import type { ClientMsg, ServerMsg } from './interface'
import { Project } from './class/project'

const reply = (clientMsg: ClientMsg): ServerMsg => {
    const { query, content, auth: user } = clientMsg

    if (query === 'getProjectList') {
        const resProjectList = []

        for (const project of Project.list) {
            if (project.isPublic || project.hasMember(user.id)) {
                resProjectList.push(project)
            }
        }

        return {
            query: 'projectList',
            content: {
                projectList: resProjectList
            }
        }
    }

    if (query === 'openProject') {
        const name = content.projectName
        if (!Project.has(name) || !Project.get(name).hasMember(user.id)) {
            return {
                query: 'error',
                content: {
                    message: `The project '${name}' does not exist or you do not have permission to open it.`
                }
            }
        }

        return {
            query: 'project',
            content: {
                project: Project.get(name)
            }
        }
    }

    return {
        query: 'error',
        content: {
            message: `The query '${query}' does not exist.`
        }
    }

}

export { reply }