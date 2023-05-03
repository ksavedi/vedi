# ClientMsg client -> server

auth는 생략

## login

```ts
type: 'login';
content: {}
```

-> [token]

# ServerMsg server -> client

## error

```ts
type: 'error';
content: {
    message: string;
}
```

## token

```ts
type: 'token';
content: {
    token: string;
}
```

-> client auth에 token 저장

<!--ClientMsg-->
[login]: #login

<!--ServerMsg-->
[error]: #error
[token]: #token