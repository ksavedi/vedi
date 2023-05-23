# ClientRes client -> server

sessionKey와 error는 생략

# 로그인

## login

```ts
query: "login";
content: {
  id: Id;
  pw: string;
}
```

-> [loginResult]

# 프로젝트 목록

## getProjectList

```ts
query: "getProjectList";
content: null;
```

-> [projectList]

## openReadme

```ts
query: "openReadme";
content: {
  projectName: string;
}
```

-> [readme]

# 프로젝트 관리

## createProject

```ts
query: "createProject";
content: {
  projectName: string;
  projectInfo: ProjectInfo;
}
```

-> [project]

## deleteProject

```ts
query: "deleteProject";
content: {
  projectName: string;
}
```

## requestProject

```ts
query: "requestProject";
content: {
  projectName: string;
}
```

## openProject

```ts
query: "openProject";
content: {
  projectName: string;
}
```

-> [project]

## saveProjectInfo

```ts
query: "saveProjectInfo";
content: {
  projectName: string;
  projectInfo: ProjectInfo;
}
```

-> [project]

## saveProjectFiles

```ts
query: 'saveProjectFiles';
content: {
    projectName: string;
    changedFiles: {
        [file: Path]: string;
    };
};
```

-> [project]

# 설정

---

---

# ServerRes server -> client

# global

## error

```ts
query: "error";
content: {
  message: string;
}
```

-> client alert message

## alert

```ts
query: "alert";
content: {
  message: string;
}
```

-> client alert message

# 로그인

## loginResult

```ts
query: "loginResult";
content: {
  result: boolean;
  sessionKey: string;
}
```

# 프로젝트 목록

## projectList

```ts
query: 'projectList';
content: {
    projectList: Project[];
};
```

-> client project 보는 창에 띄움 (분기별, 공개 프로젝트 등)

## readme

```ts
query: "readme";
content: {
  document: string;
}
```

-> 공개 프로젝트를 클릭했을 때 나오는 정보 창에 띄움

# 프로젝트 관리

## project

```ts
query: "project";
content: {
  project: Project;
}
```

-> client 프로젝트 관리 페이지 업데이트

# 설정

<!--ServerRes-->

[error]: #error
[alert]: #alert
[loginResult]: #loginresult
[projectList]: #projectlist
[project]: #project
