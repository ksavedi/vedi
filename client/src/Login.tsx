import { css } from '@emotion/react'
import { useState } from 'react'
import { auth, send } from './socket'
import { Id } from '../../interface'

const requestLogin = (id: Id, pw: string) => {
    send({
        query: 'login',
        content: { id, pw },
        auth
    })
}

const Login = () => {
    const [id, setId] = useState<Id>('23-000')
    const [pw, setPw] = useState<string>('')

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
        `}>
            <p>로그인</p>
            <label>
                ID:
                <input
                    defaultValue=''
                    onChange={
                        (e) => {
                            const value = e.target.value as Id
                            setId(value)
                        }
                    }
                />
            </label>
            <label>
                PW:
                <input
                    type='password'
                    defaultValue=''
                    onChange={
                        (e) => {
                            const value = e.target.value || ''
                            setPw(value)
                        }
                    }
                />
            </label>
            <button onClick={() => requestLogin(id, pw)}>Login</button>
        </div>
    )
}
//TODO: Use the API of Gaonnuri

export default Login;