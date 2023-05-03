# msg

## template

```ts
type: string,
content: object
```

-> server에서 응답하는 msg 타입

# client -> server

auth는 생략

## login

```ts
type: 'login',
content: {
    auth: {
        token: string,
        id: Id,
        pw: string
    }
}
```

-> [token] (## token)