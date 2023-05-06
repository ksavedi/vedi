import type { ProjectInfo } from '../class/project';
import type { Id } from './msg'

interface TemplateClientMsg {
    query: string;
    content: object | null;
    sessionKey: string;
}

interface ClientMsgLogin extends TemplateClientMsg {
    query: 'login';
    content: {
        id: Id;
        pw: string;
        remember: boolean;
    };
}

interface ClientMsgGetProjectList extends TemplateClientMsg {
    query: 'getProjectList';
    content: null;
}

interface ClientMsgCreateProject extends TemplateClientMsg {
    query: 'createProject';
    content: {
        projectName: string;
        projectInfo: ProjectInfo;
    };
}

interface ClientMsgDeleteProject extends TemplateClientMsg {
    query: 'deleteProject';
    content: {
        projectName: string;
    };
}

interface ClientMsgRequestProject extends TemplateClientMsg {
    query: 'requestProject';
    content: {
        projectName: string;
    };
}

interface ClientMsgOpenProject extends TemplateClientMsg {
    query: 'openProject';
    content: {
        projectName: string;
    };
}

interface ClientMsgSaveProjectInfo extends TemplateClientMsg {
    query: 'saveProjectInfo';
    content: {
        projectName: string;
        projectInfo: ProjectInfo;
    };
}

interface ClientMsgSaveProjectFiles extends TemplateClientMsg {
    query: 'saveProjectFiles';
    content: {
        projectName: string;
        changedFiles: object;
    };
}

type ClientMsg = ClientMsgLogin
    | ClientMsgGetProjectList
    | ClientMsgCreateProject
    | ClientMsgDeleteProject
    | ClientMsgRequestProject
    | ClientMsgOpenProject
    | ClientMsgSaveProjectInfo
    | ClientMsgSaveProjectFiles

export type {
    ClientMsgLogin,
    ClientMsgGetProjectList,
    ClientMsgCreateProject,
    ClientMsgDeleteProject,
    ClientMsgRequestProject,
    ClientMsgOpenProject,
    ClientMsgSaveProjectInfo,
    ClientMsgSaveProjectFiles,

    ClientMsg
}