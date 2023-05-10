import type { ProjectInfo } from '../class/project';
import type { Id } from './res'

interface TemplateClientRes {
    query: string;
    content: object | null;
    sessionKey: string;
}

interface ClientResLogin extends TemplateClientRes {
    query: 'login';
    content: {
        id: Id;
        pw: string;
        remember: boolean;
    };
}

interface ClientResGetProjectList extends TemplateClientRes {
    query: 'getProjectList';
    content: null;
}

interface ClientResCreateProject extends TemplateClientRes {
    query: 'createProject';
    content: {
        projectName: string;
        projectInfo: ProjectInfo;
    };
}

interface ClientResDeleteProject extends TemplateClientRes {
    query: 'deleteProject';
    content: {
        projectName: string;
    };
}

interface ClientResRequestProject extends TemplateClientRes {
    query: 'requestProject';
    content: {
        projectName: string;
    };
}

interface ClientResOpenProject extends TemplateClientRes {
    query: 'openProject';
    content: {
        projectName: string;
    };
}

interface ClientResSaveProjectInfo extends TemplateClientRes {
    query: 'saveProjectInfo';
    content: {
        projectName: string;
        projectInfo: ProjectInfo;
    };
}

interface ClientResSaveProjectFiles extends TemplateClientRes {
    query: 'saveProjectFiles';
    content: {
        projectName: string;
        changedFiles: object;
    };
}

type ClientRes = ClientResLogin
    | ClientResGetProjectList
    | ClientResCreateProject
    | ClientResDeleteProject
    | ClientResRequestProject
    | ClientResOpenProject
    | ClientResSaveProjectInfo
    | ClientResSaveProjectFiles

export type {
    ClientResLogin,
    ClientResGetProjectList,
    ClientResCreateProject,
    ClientResDeleteProject,
    ClientResRequestProject,
    ClientResOpenProject,
    ClientResSaveProjectInfo,
    ClientResSaveProjectFiles,

    ClientRes
}