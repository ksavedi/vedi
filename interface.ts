type Batch = 19 | 20 | 21 | 22 | 23 | 24
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Id = `${Batch}-${0 | 1 | 2}${Digit}${Digit}`

interface Auth {
    token: null | string;
    id?: Id;
    pw?: string;
}

interface Msg {
    type: string;
    content: object;
}

interface ClientMsg extends Msg {
    auth: Auth
}

export { Id, Auth, Msg, ClientMsg }