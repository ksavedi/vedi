type Batch = 19 | 20 | 21 | 22 | 23 | 24
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Id = `${Batch}-${0 | 1 | 2}${Digit}${Digit}`

interface Auth {
    token?: string;
    id?: Id;
    pw?: string;
}

type ServerMsg = {
    type: 'error';
    content: {
        'message': string;
    };
} | {
    type: 'token';
    content: {
        'token': string;
    };
}

interface ClientMsg {
    type: string;
    content: object;
    auth: Auth;
}

export type { Id, Auth, ServerMsg, ClientMsg }
