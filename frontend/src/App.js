import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from "react";
import {UserContext} from "./userContext";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import AddParcelLocker from "./components/AddParcelLocker";
import ParcelLockers from "./components/ParcelLockers";



function App() {

    const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
    const updateUserData = (userInfo) => {
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
    }
  
        return (
            <BrowserRouter>
                <UserContext.Provider value={{user: user, setUserContext: updateUserData}}>
                    <Header />
                    <Routes>  
                        <Route path={"/"} exact element={<ParcelLockers/>}></Route>
                        <Route path={"/login"} exact element={<Login/>}></Route>
                        <Route path={"/register"} exact element={<Register/>}></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="/logout" element={<Logout />}></Route>
                        <Route path={"/addParcelLocker"} exact element={<AddParcelLocker/>}></Route>
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        );             
    


}

export default App;
