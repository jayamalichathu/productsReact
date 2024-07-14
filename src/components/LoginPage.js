import React, { useCallback, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux';
import {selectLoginErrors} from "../selectors/LoginSelectors";
import {useLogin} from '../hooks/useAuth';
import {InputPair} from "./InputPair";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUserName = useCallback((event) => {
        setUsername(event.target.value);
    }, [setUsername]);

    const onChangePassword = useCallback((event) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const login = useLogin();
    const navigate = useNavigate();
    const handleSubmit = useCallback((e) => {
        login(username, password).then((result) => {
            if(result) {
                navigate('/');
            }
        });
    }, [navigate, username, password, login]);

    const onKeyPressCallBack = useCallback((event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    },[handleSubmit])


    const errors = useSelector(state => selectLoginErrors(state));
    console.log("errors", errors)

    return(
        <div className="LoginPage" >
            <div className="login" onKeyPress={onKeyPressCallBack}>
                <InputPair label="UserName">
                    <input
                        type="text"
                        value={username}
                        onChange={onChangeUserName}
                    />
                </InputPair>
                <InputPair label="Password">
                    <input
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                </InputPair>
                <div className="login_button">
                    <button
                        type="button"
                        onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
            <div className="login_error">
                {errors &&
                    errors
                }
            </div>

        </div>
    )
}