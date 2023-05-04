import type { ProjectInfo } from '../class/project';
import type { Auth, Id } from './msg'

interface ClientMsgLogin {
    query: 'login';
    content: {
        id: Id;
        pw: string;
    };
    auth: Auth;
}

interface ClientMsgGetProjectList {
    query: 'getProjectList';
    content: null;
    auth: Auth;
}

interface ClientMsgCreateProject {
    query: 'createProject';
    content: {
        projectName: string;
        projectInfo: ProjectInfo;
    };
    auth: Auth;
}

interface ClientMsgDeleteProject {
    query: 'deleteProject';
    content: {
        projectName: string;
    };
    auth: Auth;
}

interface ClientMsgOpenProject {
    query: 'openProject';
    content: {
        projectName: string;
    };
    auth: Auth;
}

interface ClientMsgSaveProjectInfo {
    query: 'saveProjectInfo';
    content: {
        projectName: string;
        projectInfo: ProjectInfo;
    };
    auth: Auth;
}

interface ClientMsgSaveProjectFiles {
    query: 'saveProjectFiles';
    content: {
        projectName: string;
        changedFiles: object;
    };
    auth: Auth;
}

type ClientMsg = ClientMsgLogin
    | ClientMsgGetProjectList
    | ClientMsgCreateProject
    | ClientMsgDeleteProject
    | ClientMsgOpenProject
    | ClientMsgSaveProjectInfo
    | ClientMsgSaveProjectFiles

export type {
    ClientMsgLogin, 
    ClientMsgGetProjectList, 
    ClientMsgCreateProject, 
    ClientMsgDeleteProject, 
    ClientMsgOpenProject, 
    ClientMsgSaveProjectInfo, 
    ClientMsgSaveProjectFiles,

    ClientMsg
}