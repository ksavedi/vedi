import { css } from '@emotion/react';
import { useState } from 'react';
import { auth, send } from './socket';

const requestLogin = (id: string, pw: string) => {
    send({
        type: "login",
        content: { id, pw },
        auth
    })
}

const Login = () => {
    const [id, setId] = useState<string>("")
    const [pw, setPw] = useState<string>("")

    return (<div css={css`
        display: flex;
        flex-direction: column;
    `}>
        <p>로그인</p>
        <label>
            ID:
            <input
                defaultValue=""
                onChange={
                    (e) => {
                        const value = e.target.value || "";
                        setId(value);
                    }
                }
            />
        </label>
        <label>
            PW:
            <input
                type="password"
                defaultValue=""
                onChange={
                    (e) => {
                        const value = e.target.value || "";
                        setPw(value);
                    }
                }
            />
        </label>
        <button onClick={() => requestLogin(id, pw)}>Login</button>
    </div>)
}
//TODO: Use the API of Gaonnuri

export default Login;