import type { ClientMsg, ServerMsg } from './interface'
import { Project, type ProjectInfo } from './class/project'

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
        //사실 user.id가 null 인 경우는 없지만 ts error 땜에 넣은 조건문
        if (hasProjectInfoError(info)) {
            return getProjectInfoError(info)
        }
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