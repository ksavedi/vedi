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

interface ServerMsgToken {
    query: 'token';
    content: {
        'token': string;
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
    | ServerMsgToken
    | ServerMsgProjectList
    | ServerMsgProject

export type {
    ServerMsgError,
    ServerMsgAlert,
    ServerMsgToken,
    ServerMsgProjectList,
    ServerMsgProject,

    ServerMsg
}