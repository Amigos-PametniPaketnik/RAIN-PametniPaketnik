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
import EditParcelLocker from "./components/EditParcelLocker";
import ParcelLockers from "./components/ParcelLockers";
import AccessPermissions from "./components/AccessPermissions";
import AddAccessPermissions from "./components/AddAccessPermissions";
import Weathers from "./components/Weathers";
import Unlocks from './components/Unlocks';
import AddUnlock from './components/AddUnlock';
import EditAccessPermission from "./components/EditAccessPermissions";
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
                        <Route path={"/ParcelLocker/:id"} exact element={<EditParcelLocker/>}></Route>
                        <Route path={"/accessPermissions/:id"} exact element={<AccessPermissions/>}></Route>
                        <Route path={"/addAccessPermission/:id"} exact element={<AddAccessPermissions/>}></Route>
                        <Route path={"/EditAccessPermission/:id"} exact element={<EditAccessPermission/>}></Route>
                        <Route path={"/unlocks/:id"} exact element={<Unlocks />}></Route>
                        <Route path={"/addUnlock/:id"} exact element={<AddUnlock />}></Route>
                        <Route path={"/weather/:id"} exact element={<Weathers/>}></Route>
                        <Route path={"/weather/:id"} exact element={<Weathers/>}></Route>

                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        );             
    


}

export default App;
