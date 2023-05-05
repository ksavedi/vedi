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
    | ServerMsgProjectList
    | ServerMsgProject

export type {
    ServerMsgError,
    ServerMsgAlert,
    ServerMsgProjectList,
    ServerMsgProject,

    ServerMsg
}