import { Project, type ProjectInfo } from './class/project'
import type { ClientRes } from './interface/clientRes'
import { type Id, directory } from './interface/basic'
import type { ServerRes } from './interface/serverRes'

const getProjectInfoError = (info: ProjectInfo): ServerRes => {
    if (info.owner === null) {
        return {
            query: 'error',
            content: {
                message: '프로젝트 리더가 없습니다.'
            }
        }
    }
    if (!(info.members.includes(info.owner))) {
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

    for (const req of info.requests) {
        if (info.members.includes(req)) {
            return {
                query: 'error',
                content: {
                    message: '이미 멤버인 사람은 프로젝트 신청을 보낼 수 없습니다.'
                }
            }
        }
    }

    for (const mem of info.members) {
        if (info.members.filter(val => val === mem).length > 1) {
            return {
                query: 'error',
                content: {
                    message: '같은 멤버가 중복해서 있습니다.'
                }
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
    return getProjectInfoError(info).query !== 'alert'
}

const isOwner = (id: Id, info: ProjectInfo) => {
    return id !== null && info.owner === id
}

const reply = (id: Id, clientRes: ClientRes): ServerRes => {
    const { query, content } = clientRes

    if (id === null) {
        return {
            query: 'error',
            content: {
                message: '올바르지 않은 접근입니다.'
            }
        }
    }

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
            info.files,
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

        return {
            query: 'alert',
            content: {
                message: `${name}이 삭제되었습니다.`
            }
        }
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
        if (project.requests.includes(id)) {
            return {
                query: 'error',
                content: {
                    message: '이미 신청했습니다.'
                }
            }
        }
        else if (project.members.includes(id)) {
            return {
                query: 'error',
                content: {
                    message: '이미 해당 프로젝트의 멤버입니다.'
                }
            }
        }
        else {
            project.requests.push(id)
            Project.save()
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
                    message: '팀 리더만 프로젝트 정보를 수정할 수 있습니다.'
                }
            }
        }

        info.files = project.info.files //files는 수정할 수 없음
        project.info = info

        return {
            query: 'alert',
            content: {
                message: `${name}의 정보가 수정되었습니다.`
            }
        }
    }

    if (query === 'saveProjectFiles') {
        const name = content.projectName
        const {changedFiles} = content
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
                    message: '프로젝트 파일을 수정할 권한이 없습니다.'
                }
            }
        }
        for (const dir in changedFiles) {
            if (!dir.match(directory)) {
                return {
                    query: 'error',
                    content: {
                        message: '프로젝트 파일 경로가 형식에 맞지 않습니다.'
                    }
                }
            }
        }

        for (const dir in changedFiles) {
            if (changedFiles[dir] !== null) project.files[dir] = changedFiles[dir]!
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            else if (dir in project.files) delete project.files[dir]
            Project.save()
        }

        return {
            query: 'alert',
            content: {
                message: `${name}의 파일이 저장되었습니다.`
            }
        }
    }

    return {
        query: 'error',
        content: {
            message: `clientRes '${query}' does not exist.`
        }
    }

}

export { reply }