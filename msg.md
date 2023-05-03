# ClientMsg client -> server

auth와 error는 생략

# 로그인

## login

```ts
query: 'login';
content: {
    id: Id;
    pw: string;
};
```

-> [token]

# 프로젝트 목록

## getProjectList

```ts
query: 'getProjectList';
content: {};
```

-> [projectList]

# 프로젝트 관리

## openProject

```ts
query: 'openProject';
content: {
    projectName: string;
    //or projectId: ;
};
```

-> [project]

## saveProject

```ts
query: 'saveProject';
content: {
    projectName: string;
    //or projectId: ;
    changedFiles: {
        [file: Path]: string;
    };
};
```

-> [project]

# 설정

---
---

# ServerMsg server -> client

# global

## error

```ts
query: 'error';
content: {
    message: string;
};
```

# 로그인

## token

```ts
query: 'token';
content: {
    token: string;
};
```

-> client auth에 token 저장

# 프로젝트 목록

## projectList

```ts
query: 'projectList';
content: {
    projectList: Project[];
};
```

-> client project 보는 창에 띄움 (분기별, 공개 프로젝트 등)

# 프로젝트 관리

## project

```ts
query: 'project';
content: {
    project: Project;
};
```

-> client 프로젝트 관리 페이지 업데이트

# 설정

<!--ClientMsg-->
[login]: #login
[getProjectList]: #getprojectList
[openProject]: #openproject
[saveProject]: #saveproject

<!--ServerMsg-->
[error]: #error
[token]: #token
[projectList]: #projectlist
[project]: #project