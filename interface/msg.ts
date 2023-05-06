type Batch = 19 | 20 | 21 | 22 | 23 | 24 | 25
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Id = `${Batch}-${0 | 1 | 2}${Digit}${Digit}`

interface User {
    id: Id;
    pw: null | string;
}

export type { Id, User }