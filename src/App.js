import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import "./App.css";
import usersData from "./userData.json";
import TeamBuilder from "./components/TeamBuilder";

const App = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
      setUsers(usersData);
    }, []);
 
  return (
    <div className="user-management">
      <header>
        <h1 className="App-header"> User Management</h1>
      </header>
      <UserList />
      <TeamBuilder users={users} />
    </div>
  );
};

export default App;
