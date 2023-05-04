/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { auth, send } from './socket'
import { Id } from '../../interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

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
            padding: 30px;
            box-shadow: rgb(238, 238, 238) 0px 0px 3px 0px;
        `}>
            <div css={css`
                display: flex;
                justify-content: center;
                font-weight: 400;
                font-size: 25px;
                color: rgb(88, 95, 105);
                border-bottom: 1px solid rgb(238, 238, 238);
                padding-bottom: 15px;
            `}>로그인</div>
            <div css={css`
                display: flex;
                flex-direction: column;
            `}>
                <div css={css`
                    display: flex;
                    padding-top: 30px;
                    height: 35px;
                `}>
                    <div css={css`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid rgb(204, 204, 204);
                        box-sizing: border-box;
                        width: 35px;
                        padding: 5px;
                    `}>
                        <FontAwesomeIcon icon={faUser} style={{ color: "#b3b3b3", }} />
                    </div>
                    <input
                        css={css`
                            height: 35px;
                            border: 1px solid rgb(204, 204, 204);
                            border-left: none;
                            font-size: 14px;
                            padding: 6px 12px;
                            flex-grow: 1;
                            line-height: 35px;
                            box-sizing: border-box;
                        `}
                        placeholder='아이디'
                        defaultValue=''
                        onChange={
                            (e) => setId(e.target.value || '')
                        }
                    />
                </div>
                <div css={css`
                    display: flex;
                    padding-top: 20px;
                `}>
                    <div css={css`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid rgb(204, 204, 204);
                        box-sizing: border-box;
                        height: 100%;
                        width: 35px;
                        padding: 5px;
                    `}>
                        <FontAwesomeIcon icon={faLock} style={{ color: "#b3b3b3", }} />
                    </div>
                    <input
                        css={css`
                            height: 35px;
                            border: 1px solid rgb(204, 204, 204);
                            border-left: none;
                            font-size: 14px;
                            padding: 6px 12px;
                            flex-grow: 1;
                            line-height: 35px;
                            box-sizing: border-box;
                        `}
                        type='password'
                        placeholder='비밀번호'
                        defaultValue=''
                        onChange={
                            (e) => setPw(e.target.value || '')
                        }
                    />
                </div>
            </div>
            <button
                css={css`
                    height: 35px;
                    font-size: 20px;
                    color: white;
                    background: rgb(0, 118, 192);
                    border: none;
                    margin-top: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `}
                onClick={() => requestLogin(id, pw)}>Login</button>
        </div>
    )
}

export default Login;