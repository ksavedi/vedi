/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { auth, send } from './socket'
import { Id } from '../../interface'

const requestLogin = (id: string, pw: string) => {
    if (!/^(19|20|21|22|23|24)-\d{3}$/.test(id)) {
        window.alert("형식에 맞지 않는 아이디입니다.")
        return
    }
    send({
        type: 'login',
        content: { id: id as Id, pw },
        auth
    })
}

const Login = () => {
    const [id, setId] = useState<string>('')
    const [pw, setPw] = useState<string>('')

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            width: 500px;
            border-radius: 10px;
            border: 2px solid black;
            padding: 20px;
            gap: 20px;
        `}>
            <div css={css`
                display: flex;
                justify-content: center;
            `}>로그인</div>
            <div css={css`
                display: grid;
                grid-template-columns: 1fr 9fr;
                grid-template-rows: 1fr 1fr;
                gap: 10px;
            `}>

                <div css={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    grid-column: 1 / 2;
                    grid-row: 1 / 2;
                `}>
                    ID:
                </div>
                <input
                    css={css`
                        grid-column: 2 / 3;
                        grid-row: 1 / 2;
                        height: 30px;
                    `}
                    defaultValue=''
                    onChange={
                        (e) => setId(e.target.value || '')
                    }
                />
                <div css={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    grid-column: 1 / 2;
                    grid-row: 2 / 3;
                `}>
                    PW:
                </div>
                <input
                    css={css`
                        grid-column: 2 / 3;
                        grid-row: 2 / 3;
                        height: 30px;
                    `}
                    type='password'
                    defaultValue=''
                    onChange={
                        (e) => setPw(e.target.value || '')
                    }
                />
            </div>
            <button
                css={css`
                    height: 40px;
                    font-size: 25px;
                `}
                onClick={() => requestLogin(id, pw)}>Login</button>
        </div>
    )
}
//TODO: Use the API of Gaonnuri

export default Login;