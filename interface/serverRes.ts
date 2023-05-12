import type { Project } from '../class/project'

interface ServerResError {
    query: 'error';
    content: {
        message: string;
    };
}

interface ServerResAlert {
    query: 'alert';
    content: {
        message: string;
    };
}

interface ServerResLoginResult {
    query: 'loginResult';
    content: {
        result: boolean;
        sessionKey: string;
    };
}

interface ServerResProjectList {
    query: 'projectList';
    content: {
        projectList: Project[];
    };
}

interface ServerResProject {
    query: 'project';
    content: {
        project: Project;
    };
}

type ServerRes = ServerResError
    | ServerResAlert
    | ServerResLoginResult
    | ServerResProjectList
    | ServerResProject

export type {
    ServerResError,
    ServerResAlert,
    ServerResLoginResult,
    ServerResProjectList,
    ServerResProject,

    ServerRes
}