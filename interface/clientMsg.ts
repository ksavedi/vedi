import type { ProjectInfo } from '../class/project';
import type { Auth, Id } from './msg'

interface Msg {
    query: string;
    content: object | null;
    auth: Auth;
}

interface ClientMsgLogin extends Msg {
    query: 'login';
    content: {
        id: Id;
        pw: string;
    };
}

interface ClientMsgGetAuthorized extends Msg {
    query: 'getAuthorized';
    content: null;
}

interface ClientMsgGetProjectList extends Msg {
    query: 'getProjectList';
    content: null;
}

interface ClientMsgCreateProject extends Msg {
    query: 'createProject';
    content: {
        projectName: string;
        projectInfo: ProjectInfo;
    };
}

interface ClientMsgDeleteProject extends Msg {
    query: 'deleteProject';
    content: {
        projectName: string;
    };
}

interface ClientMsgOpenProject extends Msg {
    query: 'openProject';
    content: {
        projectName: string;
    };
}

interface ClientMsgSaveProjectInfo extends Msg {
    query: 'saveProjectInfo';
    content: {
        projectName: string;
        projectInfo: ProjectInfo;
    };
}

interface ClientMsgSaveProjectFiles extends Msg {
    query: 'saveProjectFiles';
    content: {
        projectName: string;
        changedFiles: object;
    };
}

type ClientMsg = ClientMsgLogin
    | ClientMsgGetAuthorized
    | ClientMsgGetProjectList
    | ClientMsgCreateProject
    | ClientMsgDeleteProject
    | ClientMsgOpenProject
    | ClientMsgSaveProjectInfo
    | ClientMsgSaveProjectFiles

export type {
    ClientMsgLogin,
    ClientMsgGetAuthorized,
    ClientMsgGetProjectList,
    ClientMsgCreateProject,
    ClientMsgDeleteProject,
    ClientMsgOpenProject,
    ClientMsgSaveProjectInfo,
    ClientMsgSaveProjectFiles,

    ClientMsg
}