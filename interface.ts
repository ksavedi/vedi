import type { Project, ProjectInfo } from './class/project';

type Batch = 19 | 20 | 21 | 22 | 23 | 24
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Id = null | `${Batch}-${0 | 1 | 2}${Digit}${Digit}`

interface Auth {
    token?: string;
    id: Id;
    pw: null | string;
}

type ClientMsg = {
    query: 'login';
    content: {
        id: Id;
        pw: string; 
    };
    auth: Auth;
} | {
    query: 'getProjectList';
    content: object;
    auth: Auth;
} | {
    query: 'createProject';
    content: {
        projectName: string;
        projectInfo: ProjectInfo;
    };
    auth: Auth;
} | {
    query: 'deleteProject';
    content: {
        projectName: string;
    };
    auth: Auth;
} | {
    query: 'openProject';
    content: {
        projectName: string;
    };
    auth: Auth;
} | {
    query: 'saveProjectInfo';
    content: {
        projectName: string;
        projectInfo: ProjectInfo;
    };
    auth: Auth;
} | {
    query: 'saveProjectFiles';
    content: {
        projectName: string;
        changedFiles: object;
    };
    auth: Auth;
}

type ServerMsg = {
    query: 'error';
    content: {
        'message': string;
    };
} | {
    query: 'token';
    content: {
        'token': string;
    };
} | {
    query: 'projectList';
    content: {
        projectList: Project[];
    };
} | {
    query: 'project';
    content: {
        project: Project;
    };
}

export type { Id, Auth, ClientMsg, ServerMsg }
