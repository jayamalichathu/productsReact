import {useDispatch} from "react-redux";
import {loginFailure, loginStart, loginSuccess} from "../stores/loginSlice";

export const useLogin = () => {
    const dispatch = useDispatch();
    return async (username, password) => {
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
                if (data.length <= 0) {
                    console.log("no user", data)

                    dispatch(loginFailure(data));
                }
                else {
                   const user =  data[0];
                   dispatch(loginSuccess(user));
                   return user;
                }

            } else {
                const error = await response.json();
                console.log("error", error)
                dispatch(loginFailure(error.message));
            }
        } catch (error) {
            dispatch(loginFailure('An error occurred'));
            console.error('Error:', error);
        }

    };
}
