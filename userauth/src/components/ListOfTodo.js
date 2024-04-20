
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database"; // Import required functions for database operations

export default function ListOfTodo({ token }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const fetchData = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTodos(res.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const logout = () => {
    const auth = getAuth(); // Get the Firebase auth instance
    const database = getDatabase(); // Get the Firebase Realtime Database instance
    const user = auth.currentUser; // Get the current user

    if (user) {
      const sessionEndRef = ref(database, 'sessions/' + user.uid + '/sessionEnd'); // Reference to the session end time in the database
      set(sessionEndRef, new Date().toISOString()) // Set the session end time
        .then(() => {
          console.log("Session end time saved.");
        })
        .catch((error) => {
          console.error("Error saving session end time:", error);
        });
    }

    signOut(auth)
      .then(() => {
        window.localStorage.setItem("auth", "false");
        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div>
      <h1>List of Todos</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.title}</li>
        ))}
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
