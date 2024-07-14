
import {loginFailure, loginStart, loginSuccess} from "../stores/loginSlice";

export function login(username, password) {
    return async (state, dispatch) => {
        dispatch(loginStart());
        try {
            const response = await fetch('http://localhost:3090/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            console.log("response", response.ok)
            if (response.ok) {
                const data = await response.json();
                console.log("data", data)
                dispatch(loginSuccess(data));
            } else {
                const error = await response.json();
                console.log("error", error)
                dispatch(loginFailure(error.message));
            }
        } catch (error) {
            dispatch(loginFailure('An error occurred'));
            console.error('Error:', error);
        }
    }
}
