# client -> server

auth는 생략

## login

```ts
type: 'login';
content: {
    auth: {
        token: string;
        id: Id;
        pw: string;
    }
}
```

-> [token](##token)

# server -> client

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