import { Project, type ProjectInfo } from './class/project'
import type { ClientMsg } from './interface/clientMsg'
import type { ServerMsg } from './interface/serverMsg'

const getProjectInfoError = (info: ProjectInfo): ServerMsg => {
    if (info.owner === null) {
        return {
            query: 'error',
            content: {
                message: 'project owner is null'
            }
        }
    }
    if (!(info.owner in info.members)) {
        return {
            query: 'error',
            content: {
                message: 'project owner is not in members'
            }
        }
    }
    if (!info.isPublic && info.requests.length !== 0) {
        return {
            query: 'error',
            content: {
                message: 'private project does not get requests'
            }
        }
    }
    return {
        query: 'alert',
        content: {
            message: 'there is no error. if you see this, then it is an error. talk to developer'
        }
    }
}

const hasProjectInfoError = (info: ProjectInfo): boolean => {
    if (getProjectInfoError(info).query !== 'alert') return false
    return true
}

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

    if (query === 'createProject') {
        const name = content.projectName
        const info = content.projectInfo
        if (hasProjectInfoError(info)) {
            return getProjectInfoError(info)
        }
        //사실 user.id가 null 인 경우는 없지만 ts error 땜에 넣은 조건문
        if (user.id === null) {
            return {
                query: 'error',
                content: {
                    message: 'login plz'
                }
            }
        }
        if (info.owner !== user.id) {
            return {
                query: 'error',
                content: {
                    message: `The project '${name}' 's owner is not you`
                }
            }
        }
        if (Project.has(name)) {
            return {
                query: 'error',
                content: {
                    message: 'The project already exist'
                }
            }
        }

        const project = new Project(
            name,
            info.owner,
            info.description,
            info.members,
            info.requests,
            info.isPublic
        )

        return {
            query: 'project',
            content: {
                project
            }
        }
    }

    if (query === 'deleteProject') {
        const name = content.projectName
        if (! Project.has(name)) {
            return {
                query: 'error',
                content: {
                    message: 'project does not exist'
                }
            }
        }

        const project = Project.get(name)
        const {info} = project
        if (hasProjectInfoError(info)) {
            return getProjectInfoError(info)
        }
        //사실 user.id가 null 인 경우는 없지만 ts error 땜에 넣은 조건문
        if (user.id === null) {
            return {
                query: 'error',
                content: {
                    message: 'login plz'
                }
            }
        }
        if (info.owner !== user.id) {
            return {
                query: 'error',
                content: {
                    message: `The project '${name}' 's owner is not you`
                }
            }
        }

        Project.pop(project)
    }

    if (query === 'openProject') {
        const name = content.projectName
        if (! Project.has(name)) {
            return {
                query: 'error',
                content: {
                    message: 'project does not exist'
                }
            }
        }

        const project = Project.get(name)
        if (project.hasMember(user.id)) {
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