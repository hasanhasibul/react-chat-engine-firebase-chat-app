import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Chats from './Components/Chats/Chats';
import Policy from './Components/Policy/Policy ';

export const userContextProvider = createContext();
function App() {
  const [user, setUser] = useState({});
  console.log(user);
  return (
    <userContextProvider.Provider value={[user, setUser]} >
      <div className="App">
        <Router>
          <Switch>
            <Route path="/chats">
              <Chats></Chats>
            </Route>
            <Route path="/policy">
              <Policy></Policy>
            </Route>
            <Route path="/">
              <Login></Login>
            </Route>
          </Switch>
        </Router>
      </div>
    </userContextProvider.Provider>
  );
}

export default App;
