import React from "react";
import Logo from "../../img/logo.png";
import Trash from "../../img/trash.svg";
import "../../App.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Register() {
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const baseUrl = "https://localhost:3001";

  const getUsers = async () => {
    const { data } = await axios.get(`${baseUrl}/users`);
    setUsers(data);
  };

  const addNewUser = async () => {
    if (!password || !email) {
      return alert("Preencha os campos !");
    }
    const data = { password, email };

    const { data: newUser } = await axios.post(`${baseUrl}/users`, data);

    setUsers([...users, newUser]);
    setPassword("");
    setEmail("");
  };

  const removeUser = async (id) => {
    await axios.delete(`${baseUrl}/users/${id}`);

    setUsers(users.filter((user) => user.id !== id));
  };

  useEffect(() => {
    getUsers();
  }, []);
  
  return (
    <div className='app'>
      <div className='screen'>
        <img className = 'logo' src={Logo} alt='logo' />
        <h1>Register</h1>

        <label>
          Email
          <input
            placeholder='Digite seu email (email@email.com)'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            placeholder='Digite sua senha'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        

        <button onClick={addNewUser}>Register new user</button>

        <ul>
          {users.map((user) => (
            <li>
              <div>
                <p>{user?.password}</p>
                <p>{user?.email}</p>
              </div>
              <button
                className='btn-trash'
                onClick={() => removeUser(user?.id)}
              >
                <img src={Trash} alt='trash' />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
