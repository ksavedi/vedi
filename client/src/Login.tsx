import { useState } from 'react'
import { requestMsg } from './post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import "./Login.css"
import { Id } from '../../interface/basic'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [id, setId] = useState<string>('')
    const [pw, setPw] = useState<string>('')
    const [remember, setRemember] = useState<boolean>(false)

    const navigate = useNavigate()

    const requestLogin = async (id: string, pw: string) => {
        if (!/^(19|20|21|22|23|24|25)-\d{3}$/.test(id)) {
            window.alert('형식에 맞지 않는 학번입니다.')
            return
        }
        const res = await requestMsg({
            query: 'login',
            content: { id: id as Id, pw, remember },
            sessionKey: localStorage['sessionKey']
        })
        if (res.query === 'loginResult') {
            localStorage['sessionKey'] = res.content.sessionKey
            localStorage['id'] = id
            navigate('/project', { replace: true })
        }
    }

    return (
        <div id="login-container">
            <div id="login-header">로그인</div>
            <div id="login-content">
                <div className="info-container" id="id-container">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faUser} style={{ color: "#b3b3b3" }} />
                    </div>
                    <input
                        className="info-input"
                        placeholder="학번"
                        defaultValue=""
                        onChange={
                            (e) => setId(e.target.value || '')
                        }
                        autoFocus={true}
                    />
                </div>
                <div className="info-container" id="pw-container">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faLock} style={{ color: "#b3b3b3" }} />
                    </div>
                    <input
                        className="info-input"
                        type="password"
                        placeholder="가온누리 비밀번호"
                        defaultValue=""
                        onChange={
                            (e) => setPw(e.target.value || '')
                        }
                    />
                </div>
            </div>
            <div id="login-checkbox-container">
                <input  
                    id="login-checkbox"
                    type="checkbox"
                    onChange={
                        (e) => setRemember(e.target.checked)
                    }/>
                <label
                    id="login-checkbox-label"
                    htmlFor="login-checkbox"
                >
                    로그인 상태 유지
                </label>
            </div>
            <div id="login-button-container">
                <button id="login-button" onClick={() => requestLogin(id, pw)}>
                    로그인
                </button>
            </div>
        </div>
    )
}

export default Login;