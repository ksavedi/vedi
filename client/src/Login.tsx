import { css } from '@emotion/react';

const Login = () =>
    <div css={css`
        display: flex;
        flex-direction: column;
    `}>
        <p>로그인</p>
        <label>ID: <input /></label>
        <label>PW: <input type="password"/></label>
    </div>

    //TODO: Use the API of Gaonnuri

export default Login;