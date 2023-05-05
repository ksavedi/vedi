import type { Project } from '../class/project'

interface ServerMsgError {
    query: 'error';
    content: {
        'message': string;
    };
}

interface ServerMsgAlert {
    query: 'alert';
    content: {
        'message': string;
    };
}

interface ServerMsgLoginResult {
    query: 'loginResult';
    content: {
        'result': boolean;
    };
}

interface ServerMsgAuthorized {
    query: 'authorized';
    content: {
        authorized: boolean;
    };
}

interface ServerMsgProjectList {
    query: 'projectList';
    content: {
        projectList: Project[];
    };
}

interface ServerMsgProject {
    query: 'project';
    content: {
        project: Project;
    };
}

type ServerMsg = ServerMsgError
    | ServerMsgAlert
    | ServerMsgLoginResult
    | ServerMsgAuthorized
    | ServerMsgProjectList
    | ServerMsgProject

export type {
    ServerMsgError,
    ServerMsgAlert,
    ServerMsgLoginResult,
    ServerMsgAuthorized,
    ServerMsgProjectList,
    ServerMsgProject,

    ServerMsg
}