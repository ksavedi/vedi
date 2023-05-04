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
        query: 'login',
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
            width: 300px;
            border: 1px solid rgb(238, 238, 238);
            background: 1px solid rgb(254, 254, 254);
            padding: 20px;
            gap: 20px;
        `}>
            <div css={css`
                display: flex;
                justify-content: center;
                font-weight: 400;
                font-size: 30px;
                color: rgb(88, 95, 105);
                border-bottom: 1px solid rgb(238, 238, 238);
                padding-bottom: 20px;
            `}>로그인</div>
            <div css={css`
                display: grid;
                grid-template-columns: 1fr 11fr;
                grid-template-rows: 1fr 1fr;
                gap: 10px;
            `}>

                <div css={css`
                    display: flex;
                    align-items: center;
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
                        border: 1px solid rgb(204, 204, 204);
                        font-size: 15px;
                        padding-left: 7px;
                        display: flex;
                        align-items: center;
                    `}
                    placeholder='아이디'
                    defaultValue=''
                    onChange={
                        (e) => setId(e.target.value || '')
                    }
                />
                <div css={css`
                    display: flex;  
                    align-items: center;
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
                        border: 1px solid rgb(204, 204, 204);
                        font-size: 15px;
                        padding-left: 7px;
                        display: flex;
                        align-items: center;
                    `}
                    type='password'
                    placeholder='비밀번호'
                    defaultValue=''
                    onChange={
                        (e) => setPw(e.target.value || '')
                    }
                />
            </div>
            <button
                css={css`
                    height: 40px;
                    font-size: 20px;
                    color: white;
                    background: rgb(0, 118, 192);
                    border: none;
                `}
                onClick={() => requestLogin(id, pw)}>Login</button>
        </div>
    )
}

export default Login;