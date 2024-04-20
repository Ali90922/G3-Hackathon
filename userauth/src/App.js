// import "./App.css";
// import React, { useEffect, useState } from "react";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
// import app from "./config/firbase-config";
// import ListOfTodo from "./components/ListOfTodo";
// import { getDatabase, ref, set } from "firebase/database";

// const auth = getAuth(app);

// function App() {
//   const [token, setToken] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isAuthenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         startSessionForUser(user.uid); // Trigger session start with IP address storage
//         setAuthenticated(true);
//         window.localStorage.setItem("auth", "true");
//         user.getIdToken().then((token) => {
//           setToken(token);
//         });
//       } else {
//         setAuthenticated(false);
//         window.localStorage.setItem("auth", "false");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Placeholder for fetching the user's IP address
//   // Replace this function with your actual implementation
//   async function fetchIPAddress() {
//     // Example API call (you should use a real API or your backend)
//     const response = await fetch("https://api.ipify.org?format=json");
//     const data = await response.json();
//     return data.ip;
//   }

//   const startSessionForUser = async (userId) => {
//     const db = getDatabase(app);
//     const now = new Date().toISOString();
//     const ipAddress = await fetchIPAddress(); // Fetch the user's IP address
//     const sessionInfo = {
//       sessionStart: now,
//       lastActive: now,
//       ipAddress: ipAddress, // Store the IP address in the session info
//     };

//     const sessionRef = ref(db, "sessions/" + userId);
//     set(sessionRef, sessionInfo)
//       .then(() => console.log("Session started for user:", userId))
//       .catch((error) =>
//         console.error("Error starting session for user:", error)
//       );
//   };

//   const loginWithEmail = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         setAuthenticated(true);
//         window.localStorage.setItem("auth", "true");
//         user.getIdToken().then((token) => {
//           setToken(token);
//         });
//         console.log("Logged in with email");
//       })
//       .catch((error) => {
//         console.error("Error logging in with email:", error);
//       });
//   };

//   const handleEmailChange = (event) => setEmail(event.target.value);
//   const handlePasswordChange = (event) => setPassword(event.target.value);

//   return (
//     <div className="App">
//       {isAuthenticated ? (
//         <ListOfTodo token={token} />
//       ) : (
//         <div>
//           <input
//             type="email"
//             value={email}
//             onChange={handleEmailChange}
//             placeholder="Email"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={handlePasswordChange}
//             placeholder="Password"
//           />
//           <button onClick={loginWithEmail}>Login with Email</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import "./App.css";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import app from "./config/firbase-config";
import ListOfTodo from "./components/ListOfTodo";
import { getDatabase, ref, set } from "firebase/database";

const auth = getAuth(app);

function App() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        startSessionForUser(user.uid);
        setAuthenticated(true);
        window.localStorage.setItem("auth", "true");
        user.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        setAuthenticated(false);
        window.localStorage.setItem("auth", "false");
      }
    });

    return () => unsubscribe();
  }, []);

  async function fetchIPAddress() {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  }

  const startSessionForUser = async (userId) => {
    const db = getDatabase(app);
    const now = new Date().toISOString();
    const ipAddress = await fetchIPAddress();
    const sessionInfo = {
      sessionStart: now,
      lastActive: now,
      ipAddress: ipAddress,
    };

    const sessionRef = ref(db, "sessions/" + userId);
    set(sessionRef, sessionInfo)
      .then(() => console.log("Session started for user:", userId))
      .catch((error) =>
        console.error("Error starting session for user:", error)
      );
  };

  const loginWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setAuthenticated(true);
        window.localStorage.setItem("auth", "true");
        user.getIdToken().then((token) => {
          setToken(token);
        });
        console.log("Logged in with email");
      })
      .catch((error) => {
        console.error("Error logging in with email:", error);
      });
  };

  const signupWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setAuthenticated(true);
        window.localStorage.setItem("auth", "true");
        user.getIdToken().then((token) => {
          setToken(token);
        });
        console.log("Signed up with email");
      })
      .catch((error) => {
        console.error("Error signing up with email:", error);
        alert("User already exists");
      });
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  return (
    <div className="App">
      {isAuthenticated ? (
        <ListOfTodo token={token} />
      ) : (
        <div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <button onClick={loginWithEmail}>Login with Email</button>
          <button onClick={signupWithEmail}>Sign Up</button>{" "}
          {/* Sign-up button */}
        </div>
      )}
    </div>
  );
}

export default App;
