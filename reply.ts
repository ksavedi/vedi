import { Project, type ProjectInfo } from './class/project'
import type { ClientMsg } from './interface/clientMsg'
import type { Id } from './interface/msg'
import type { ServerMsg } from './interface/serverMsg'

const getProjectInfoError = (info: ProjectInfo): ServerMsg => {
    if (info.owner === null) {
        return {
            query: 'error',
            content: {
                message: '프로젝트 리더가 없습니다.'
            }
        }
    }
    if (!(info.owner in info.members)) {
        return {
            query: 'error',
            content: {
                message: '프로젝트 리더가 멤버에 포함되어있지 않습니다.'
            }
        }
    }
    if (!info.isPublic && info.requests.length !== 0) {
        return {
            query: 'error',
            content: {
                message: '비공개 프로젝트는 요청을 받을 수 없습니다.'
            }
        }
    }
    return {
        query: 'alert',
        content: {
            message: '에러가 없습니다.'
        }
    }
}

const hasProjectInfoError = (info: ProjectInfo) => {
    if (getProjectInfoError(info).query !== 'alert') return false
    return true
}

const isOwner = (id: Id, info: ProjectInfo) => {
    return id !== null && info.owner === id
}

const reply = (id: Id, clientMsg: ClientMsg): ServerMsg => {
    const { query, content } = clientMsg

    if (query === 'getProjectList') {
        const resProjectList = []

        for (const project of Project.list) {
            if (project.isPublic || project.hasMember(id)) {
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
        if (Project.has(name)) {
            return {
                query: 'error',
                content: {
                    message: '같은 이름을 가진 프로젝트가 이미 존재합니다. 다른 이름을 사용하세요.'
                }
            }
        }
        if (hasProjectInfoError(info)) {
            return getProjectInfoError(info)
        }
        if (!isOwner(id, info)) {
            return {
                query: 'error',
                content: {
                    message: '당신이 리더가 아닙니다.'
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
        if (!Project.has(name)) {
            return {
                query: 'error',
                content: {
                    message: '존재하지 않는 프로젝트입니다.'
                }
            }
        }

        const project = Project.get(name)
        const {info} = project
        if (hasProjectInfoError(info)) {
            return getProjectInfoError(info)
        }
        if (!isOwner(id, info)) {
            return {
                query: 'error',
                content: {
                    message: '당신은 팀리더가 아니기 때문에 삭제할 수 없습니다.'
                }
            }
        }

        Project.pop(project)
    }

    if (query === 'requestProject') {
        const name = content.projectName
        if (!Project.has(name)) {
            return {
                query: 'error',
                content: {
                    message: '프로젝트가 존재하지 않습니다.'
                }
            }
        }

        const project = Project.get(name)
        if (id in project.requests) {
            return {
                query: 'alert',
                content: {
                    message: '이미 신청했습니다.'
                }
            }
        } else {
            project.requests.push(id)
        }

        return {
            query: 'alert',
            content: {
                message: '신청했습니다.'
            }
        }
    }

    if (query === 'openProject') {
        const name = content.projectName
        if (!Project.has(name)) {
            return {
                query: 'error',
                content: {
                    message: '프로젝트가 존재하지 않습니다.'
                }
            }
        }

        const project = Project.get(name)
        if (!project.hasMember(id)) {
            return {
                query: 'error',
                content: {
                    message: '프로젝트를 열 권한이 없습니다.'
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

    if (query === 'saveProjectInfo') {
        const name = content.projectName
        const info = content.projectInfo
        if (!Project.has(name)) {
            return {
                query: 'error',
                content: {
                    message: '프로젝트가 존재하지 않습니다.'
                }
            }
        }
        if (hasProjectInfoError(info)) {
            return getProjectInfoError(info)
        }

        const project = Project.get(name)
        if (!isOwner(id, info) || !isOwner(id, project.info)) {
            return {
                query: 'error',
                content: {
                    message: '당신이 팀 리더가 아닙니다.'
                }
            }
        }

        project.info = info
    }

    return {
        query: 'error',
        content: {
            message: `clientMsg '${query}' does not exist.`
        }
    }

}

export { reply }