
import './css/App.scss';

import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useSelector} from 'react-redux'

import {LanguageContext} from "./locale/LanguageContext";
import {Home} from "./components/Home";
import Login from "./components/LoginPage";
import {selectUser} from "./selectors/LoginSelectors";
import {AuthContext} from "./auth/AuthContext";
import {ProductPage} from "./components/ProductPage";


function App() {
    const user = useSelector(state => selectUser(state) );
    const isAuthenticated = !!user;
    console.log("user", isAuthenticated)

    return (
        <LanguageContext.Provider value={navigator.language}>
            <AuthContext.Provider value={user}>
                <div className="App">
                    <Router>
                        <Routes>
                            <Route path="/" element={!isAuthenticated ?<Login/>  : <Home/>}/>
                            <Route path="/products" element=<ProductPage/> />
                        </Routes>
                    </Router>
                </div>
            </AuthContext.Provider>
        </LanguageContext.Provider>
    );
}
export default App;
