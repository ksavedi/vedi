# ClientMsg client -> server

auth는 생략

## login

```ts
type: 'login';
content: {
    auth: Auth
}
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
<!--ClientMsg-->
[login]: #login

<!--ServerMsg-->
[error]: #error
[token]: #token