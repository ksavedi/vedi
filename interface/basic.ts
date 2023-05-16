type Batch = 19 | 20 | 21 | 22 | 23 | 24 | 25
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Id = `${Batch}-${0 | 1 | 2}${Digit}${Digit}`

interface User {
    id: Id;
    pw: null | string;
}

// eslint-disable-next-line prefer-named-capture-group
const directory = /\\([ㄱ-ㅎ|ㅏ-ㅣ|가-힣]\w\s\.+\\)*([ㄱ-ㅎ|ㅏ-ㅣ|가-힣]\w\s\.*\.)+([ㄱ-ㅎ|ㅏ-ㅣ|가-힣]\w\s\.*)$/gim

export { type Id, type User, directory }